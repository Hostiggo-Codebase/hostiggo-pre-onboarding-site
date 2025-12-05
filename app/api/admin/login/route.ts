import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body || {}

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Server misconfiguration" }, { status: 500 })
    }

    if (password === ADMIN_PASSWORD) {
      // Set HttpOnly cookie for admin session
      const res = NextResponse.json({ ok: true })
      res.headers.set(
        "Set-Cookie",
        `adminAuth=true; Path=/; HttpOnly; Max-Age=86400; SameSite=Strict`
      )
      return res
    }

    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 })
  } catch (err) {
    console.error("/api/admin/login error", err)
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
  }
}
