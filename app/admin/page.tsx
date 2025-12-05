"use client"

import { useEffect, useState } from "react"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verify server-side cookie
    async function verify() {
      try {
        const res = await fetch("/api/admin/verify")
        if (res.ok) {
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error("Error verifying admin auth", err)
      } finally {
        setIsLoading(false)
      }
    }
    verify()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticate={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard />
}
