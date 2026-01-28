"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, AlertCircle } from "lucide-react"

export function ReferralGenerator() {
  const [isOpen, setIsOpen] = useState(false)
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [referralLink, setReferralLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExisting, setIsExisting] = useState(false)
  const [formData, setFormData] = useState({
    referrer_name: "",
    referrer_phone: "",
    referrer_email: "",
  })

  const handleGenerateReferral = async () => {
    setError(null)
    setIsLoading(true)
    setIsExisting(false)

    try {
      if (!formData.referrer_name || !formData.referrer_phone) {
        throw new Error("Name and phone are required")
      }

      const response = await fetch("/api/referral/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate referral code")
      }

      const data = await response.json()
      setReferralCode(data.referral_code)
      setReferralLink(data.referral_link)
      setIsExisting(data.isExisting || false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(!isOpen)} className="bg-primary hover:bg-primary/90 w-full md:w-auto">
        Generate Your Referral Link
      </Button>

      {isOpen && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>Create Your Referral Link</CardTitle>
            <CardDescription>
              Share your unique link and earn 0% commission on the first 10 bookings when 10+ properties join through
              you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Your Name *</Label>
                <Input
                  placeholder="Full name"
                  value={formData.referrer_name}
                  onChange={(e) => setFormData({ ...formData, referrer_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input
                  placeholder="10-digit number"
                  value={formData.referrer_phone}
                  onChange={(e) => setFormData({ ...formData, referrer_phone: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Email (Optional)</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.referrer_email}
                onChange={(e) => setFormData({ ...formData, referrer_email: e.target.value })}
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button onClick={handleGenerateReferral} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Referral Link"}
            </Button>

            {referralCode && (
              <div className="space-y-3 pt-4 border-t">
                <div className={isExisting ? "bg-blue-50 p-4 rounded-lg" : "bg-green-50 p-4 rounded-lg"}>
                  <p className={`text-sm font-medium mb-2 ${isExisting ? "text-blue-900" : "text-green-900"}`}>
                    {isExisting ? "Your Existing Referral Code" : "Your Referral Code Created"}
                  </p>
                  <p className={`text-lg font-bold ${isExisting ? "text-blue-600" : "text-green-600"}`}>
                    {referralCode}
                  </p>
                </div>

                <div className="bg-primary/5 p-3 rounded text-sm">
                  {isExisting ? (
                    <p className="text-primary font-medium">
                      You already have a referral link. Share this link to invite more hosts.
                    </p>
                  ) : (
                    <p className="text-primary font-medium">
                      Referral link created successfully — share it to earn rewards!
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Your Referral Link</p>
                  <div className="flex gap-2">
                    <Input value={referralLink!} readOnly className="flex-1" />
                    <Button onClick={copyToClipboard} size="sm" variant="outline">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this link with property owners and service providers. They'll get 0% commission on their first
                  10 bookings when you refer 10+ properties!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
