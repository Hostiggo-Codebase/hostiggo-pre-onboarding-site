import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Use service role key to bypass RLS and see all records
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const [hostsResult, providersResult] = await Promise.all([
      supabase.from("hosts").select("*", { count: "exact" }),
      supabase.from("service_providers").select("*", { count: "exact" }),
    ])

    return NextResponse.json({
      hosts: hostsResult.data || [],
      providers: providersResult.data || [],
    })
  } catch (error: any) {
    console.error("[v0] Admin stats error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}