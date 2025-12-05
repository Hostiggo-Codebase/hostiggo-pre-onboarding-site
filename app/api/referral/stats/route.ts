import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    })

    // Get all referrals with their stats
    const { data: referrals, error } = await supabase
      .from("referrals")
      .select(
        `
        id,
        referral_code,
        referrer_name,
        referrer_phone,
        referrer_email,
        total_approvals,
        reward_milestone_reached,
        created_at
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Referral stats error:", error)
      return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 })
    }

    // Calculate referred properties for each referral
    const referralStats = await Promise.all(
      referrals.map(async (ref: any) => {
        const { count } = await supabase
          .from("hosts")
          .select("*", { count: "exact", head: true })
          .eq("referred_by_code", ref.referral_code)
          .eq("status", "approved")

        const { count: serviceCount } = await supabase
          .from("service_providers")
          .select("*", { count: "exact", head: true })
          .eq("referred_by_code", ref.referral_code)
          .eq("status", "approved")

        const totalApproved = (count || 0) + (serviceCount || 0)
        const rewardEligible = totalApproved >= 10

        return {
          ...ref,
          total_approved: totalApproved,
          reward_eligible: rewardEligible,
        }
      }),
    )

    return NextResponse.json({
      referrals: referralStats,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching referral stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
