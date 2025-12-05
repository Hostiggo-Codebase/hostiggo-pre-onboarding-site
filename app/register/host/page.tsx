"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HostForm } from "@/components/host-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HostRegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-primary">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>Registration Submitted Successfully</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your property has been registered successfully. Our team will verify your details and contact you within
              24-48 hours.
            </p>
            <p className="text-sm font-medium text-primary">
              Keep your phone and WhatsApp active for our verification call.
            </p>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">H</span>
              </div>
              <h1 className="text-xl font-bold text-primary">Hostiggo</h1>
            </div>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">Register Your Property</CardTitle>
            <CardDescription>Fill in the details below to list your homestay, villa, or guest house</CardDescription>
          </CardHeader>
          <CardContent>
            <HostForm onSuccess={() => setIsSuccess(true)} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
