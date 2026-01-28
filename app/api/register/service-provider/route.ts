import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Use service role key for public registrations (bypasses RLS restrictions)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: providerData, error: providerError } = await supabase
      .from("service_providers")
      .insert({
        full_name: body.full_name,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email || null,
        service_category: body.service_category,
        experience_years: body.experience_years,
        description: body.description,
        state: body.state,
        district: body.district,
        city: body.city,
        working_area: body.working_area,
        rate_type: body.rate_type,
        rate: body.rate,
        referral_code: body.referral_code || null,
        referred_by_code: body.referred_by_code || null,
        status: "pending",
      })
      .select()

    if (providerError) {
      console.error("[v0] Provider insert error:", providerError)
      return NextResponse.json({ error: providerError.message }, { status: 400 })
    }

    const providerId = providerData[0].id

    if (body.photoUrl) {
      const { error: mediaError } = await supabase.from("service_provider_media").insert({
        provider_id: providerId,
        media_url: body.photoUrl,
        media_type: "image",
      })

      if (mediaError) {
        console.error("[v0] Media insert error:", mediaError)
        // Don't fail the entire registration if media insert fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Our team will review and contact you soon.",
      providerId: providerId,
    })
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 })
  }
}
