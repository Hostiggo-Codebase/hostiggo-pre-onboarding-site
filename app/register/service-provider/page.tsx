"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceProviderForm } from "@/components/service-provider-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServiceProviderRegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false)

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary/5 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-secondary">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>Registration Submitted Successfully</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your service has been registered successfully. Our team will review your profile and contact you within
              24-48 hours for verification.
            </p>
            <p className="text-sm font-medium text-secondary">
              Keep your phone and WhatsApp active for our confirmation.
            </p>
            <Link href="/">
              <Button className="w-full bg-secondary hover:bg-secondary/90">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/5 to-background">
      <nav className="border-b border-border bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-bold">H</span>
              </div>
              <h1 className="text-xl font-bold text-secondary">Hostiggo</h1>
            </div>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">Register Your Services</CardTitle>
            <CardDescription>Fill in the details below to start getting bookings as a service provider</CardDescription>
          </CardHeader>
          <CardContent>
            <ServiceProviderForm onSuccess={() => setIsSuccess(true)} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
