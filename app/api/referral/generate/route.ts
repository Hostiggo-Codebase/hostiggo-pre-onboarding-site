import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    const body = await request.json()
    const { referrer_name, referrer_phone, referrer_email } = body

    if (!referrer_name || !referrer_phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    if (referrer_email) {
      const { data: existingReferral, error: queryError } = await supabase
        .from("referrals")
        .select("referral_code")
        .eq("referrer_email", referrer_email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle()

      if (existingReferral) {
        // Email already has a referral code, return the existing one
        const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}?ref=${existingReferral.referral_code}`
        return NextResponse.json({
          referral_code: existingReferral.referral_code,
          referral_link: referralLink,
          isExisting: true,
        })
      }
    }

    // Generate unique referral code only if email doesn't have one
    const referralCode = `HST${crypto.randomBytes(4).toString("hex").toUpperCase()}`

    const { data, error } = await supabase
      .from("referrals")
      .insert({
        referral_code: referralCode,
        referrer_name,
        referrer_phone,
        referrer_email: referrer_email || null,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Referral generation error:", error)
      if (error.code === "23505") {
        return NextResponse.json({ error: "This email already has a referral code" }, { status: 409 })
      }
      return NextResponse.json({ error: "Failed to generate referral code" }, { status: 500 })
    }

    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}?ref=${referralCode}`

    return NextResponse.json({
      referral_code: referralCode,
      referral_link: referralLink,
      isExisting: false,
    })
  } catch (error: any) {
    console.error("[v0] Error in referral generation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
