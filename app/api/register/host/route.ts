import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Use Service Role Key to bypass RLS for public registration
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert into 'listings' table matching your 14-step FormData
    const { data: listingData, error: dbError } = await supabase
      .from("listings")
      .insert({
        // 1. Owner Details
        owner_name: body.ownerName,
        owner_phone: body.ownerPhone,
        owner_city: body.ownerCity,

        // 2. Address & Location
        country: body.country,
        street_address: body.streetAddress,
        nearby_landmark: body.nearbyLandmark,
        city: body.city,
        state: body.state,
        postal_code: body.postalCode,
        latitude: body.latitude,
        longitude: body.longitude,

        // 3. Property Overview
        property_type: body.propertyType,
        property_title: body.propertyTitle,
        bedrooms: body.bedrooms, // JSONB handles the array automatically
        accommodation_type: body.accommodationType,
        amenities: body.amenities, // Text[] stores the array of strings
        photo_urls: body.photoUrls, // Array of public URLs from Supabase Storage

        // 4. Pricing & Rules
        weekday_price: body.weekdayPrice,
        weekend_price: body.weekendPrice,
        paid_addons: body.paidAddons, // JSONB handles the object
        check_in_time: body.checkInTime,
        check_out_time: body.checkOutTime,

        // 5. Boolean Flags
        smoking_allowed: body.smokingAllowed,
        pets_allowed: body.petsAllowed,
        parties_allowed: body.partiesAllowed,
        quiet_hours: body.quietHours,
        has_exterior_camera: body.hasExteriorCamera,
        has_smoke_alarm: body.hasSmokeAlarm,

        // 6. Eligibility & Meta
        is_allowed_to_host: body.isAllowedToHost,
        agreed_to_policy: body.agreedToPolicy,
        contact_preference: body.contactPreference,
        status: "pending", // Initial review status
      })
      .select();

    if (dbError) {
      console.error("[Backend] Listing insert error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful! Our team will contact you soon.",
      listingId: listingData[0].id,
    });
  } catch (error: any) {
    console.error("[Backend] Internal registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}
