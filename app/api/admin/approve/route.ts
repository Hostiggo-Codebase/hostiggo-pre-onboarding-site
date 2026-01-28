import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

// Use nodemailer on the server to send approval emails. This code runs in a
// Node server route (not Edge). Make sure you have the following env vars set:
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, type, status } = body

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const table = type === "host" ? "hosts" : "service_providers"

    const { data, error } = await supabase
      .from(table)
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) {
      console.error(`[v0] Failed to update ${table}:`, error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // If this is a host approval and status is now 'approved', attempt to send an email
    try {
      if (type === "host" && status === "approved" && data && data.length > 0) {
        const host = data[0] as any
        const email = host.email

        if (email && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: (process.env.SMTP_SECURE || "false") === "true",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          })

          const from = process.env.SMTP_FROM || process.env.SMTP_USER

          const mailOptions = {
            from,
            to: email,
            subject: "Your Listing Has Been Approved",
            html: `
              <p>Hi ${host.full_name || "Host"},</p>

              <p>We're pleased to inform you that your property 
              <strong>${host.property_name || ""}</strong> has been successfully approved on <strong>Hostiggo</strong>.</p>

              <p>This approval completes your pre-onboarding process.  
              As soon as the service goes live, we will notify you with the next steps.</p>

              <p>Best regards,<br/>
              <strong>Hostiggo Team</strong></p>

              <hr style="margin-top: 24px; opacity: 0.4;" />

              <p style="font-size: 12px; color: #777;">
                This is an automated, system-generated email. Please do not reply to this message.
              </p>
            `,
          };



          const info = await transporter.sendMail(mailOptions)
          console.log("[v0] Approval email sent:", info.response)
        } else {
          console.log("[v0] SMTP not configured or host has no email; skipping approval email")
        }
      }
    } catch (mailErr) {
      console.error("[v0] Error sending approval email:", mailErr)
      // Don't fail the request if email sending fails; we already updated DB
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("[v0] Admin approve error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
