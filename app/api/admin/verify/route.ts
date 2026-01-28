import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get("cookie") || ""

    if (cookie.includes("adminAuth=true")) {
      return NextResponse.json({ authenticated: true })
    }

    return NextResponse.json({ authenticated: false }, { status: 401 })
  } catch (err) {
    console.error("/api/admin/verify error", err)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
