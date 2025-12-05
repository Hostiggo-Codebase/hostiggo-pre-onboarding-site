import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Use service role key for public registrations (bypasses RLS restrictions)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data: hostData, error: hostError } = await supabase
      .from("hosts")
      .insert({
        full_name: body.full_name,
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email || null,
        property_name: body.property_name,
        full_address: body.full_address,
        state: body.state,
        district: body.district,
        city: body.city,
        google_maps_link: body.google_maps_link || null,
        number_of_rooms: body.number_of_rooms,
        max_guests: body.max_guests,
        description: body.description,
        amenities: body.amenities,
        base_price: body.base_price,
        weekend_price: body.weekend_price,
        referral_code: body.referral_code || null,
        referred_by_code: body.referred_by_code || null,
        status: "pending",
      })
      .select()

    if (hostError) {
      console.error("[v0] Host insert error:", hostError)
      return NextResponse.json({ error: hostError.message }, { status: 400 })
    }

    const hostId = hostData[0].id

    if (body.photoUrls && body.photoUrls.length > 0) {
      const mediaInserts = body.photoUrls.map((url: string) => ({
        host_id: hostId,
        photo_url: url,
        media_type: "image",
      }))

      const { error: mediaError } = await supabase.from("host_media").insert(mediaInserts)

      if (mediaError) {
        console.error("[v0] Media insert error:", mediaError)
        // Don't fail the entire registration if media insert fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Our team will review and contact you soon.",
      hostId: hostId,
    })
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 })
  }
}
