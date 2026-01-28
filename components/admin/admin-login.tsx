"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface AdminLoginProps {
  onAuthenticate: () => void
}

export function AdminLogin({ onAuthenticate }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        // Server sets HttpOnly cookie; inform parent that we're authenticated
        onAuthenticate()
      } else {
        const data = await res.json().catch(() => ({}))
        setError((data && data.error) || "Invalid password")
        setPassword("")
      }
    } catch (err) {
      console.error("Login error", err)
      setError("Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">H</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">Hostiggo</h2>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>Enter your admin password to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="font-mono"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button onClick={handleLogin} className="w-full bg-primary">
            Access Dashboard
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
