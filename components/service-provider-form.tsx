"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SERVICE_CATEGORIES = [
  "Taxi/Transport",
  "Chef/Catering",
  "Housekeeping/Cleaning",
  "Event Decoration",
  "Photography",
  "Massage/Wellness",
  "Tour Guide",
  "Handyman",
  "Gardening",
  "Other",
]

const STATES = {
  "Andhra Pradesh": ["Visakhapatnam", "Krishna", "Chittoor"],
  Karnataka: ["Bangalore", "Mysore", "Coorg"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Wayanad"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Ooty"],
  Goa: ["North Goa", "South Goa"],
  Maharashtra: ["Mumbai", "Pune", "Aurangabad"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  Uttarakhand: ["Dehradun", "Mussoorie", "Auli"],
  "West Bengal": ["Kolkata", "Darjeeling", "Sikkim"],
}

interface ServiceProviderFormData {
  full_name: string
  phone: string
  whatsapp: string
  email: string
  service_category: string
  experience_years: number
  description: string
  state: string
  district: string
  city: string
  working_area: string
  rate_type: string
  rate: string
  referral_code: string
}

interface ServiceProviderFormProps {
  onSuccess?: () => void
}

export function ServiceProviderForm({ onSuccess }: ServiceProviderFormProps) {
  const [formData, setFormData] = useState<ServiceProviderFormData>({
    full_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    service_category: "",
    experience_years: 0,
    description: "",
    state: "",
    district: "",
    city: "",
    working_area: "",
    rate_type: "per_day",
    rate: "",
    referral_code: "",
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const refCode = params.get("ref")
    if (refCode) {
      setFormData((prev) => ({ ...prev, referral_code: refCode }))
    }
  }, [])

  const [photo, setPhoto] = useState<File | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([])

  const handleStateChange = (state: string) => {
    setFormData({ ...formData, state, district: "", city: "" })
    // keep selectedDistricts as-is for compatibility but we no longer use selects
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!termsAccepted) {
        throw new Error("Please accept the Terms & Conditions")
      }

      if (!formData.email) {
        throw new Error("Please enter an email address")
      }

      if (!formData.working_area) {
        throw new Error("Please enter your working area / coverage location")
      }
      let photoUrl = null
      if (photo) {
        const uploadFormData = new FormData()
        uploadFormData.append("file", photo)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        })

        if (!response.ok) {
          throw new Error("Photo upload failed")
        }

        const data = await response.json()
        photoUrl = data.url
      }

      const payload = {
        ...formData,
        photoUrl,
        rate: parseFloat(formData.rate as any) || 0,
      }

      const registrationResponse = await fetch("/api/register/service-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const registrationData = await registrationResponse.json()

      if (!registrationResponse.ok) {
        throw new Error(registrationData.error || "Registration failed")
      }

      onSuccess?.()
      setFormData({
        full_name: "",
        phone: "",
        whatsapp: "",
        email: "",
        service_category: "",
        experience_years: 0,
        description: "",
        state: "",
        district: "",
        city: "",
        working_area: "",
        rate_type: "per_day",
        rate: "",
        referral_code: "",
      })
      setPhoto(null)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input
            required
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit mobile number"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>WhatsApp Number *</Label>
          <Input
            required
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            placeholder="10-digit WhatsApp number"
          />
        </div>
        <div>
          <Label>Email *</Label>
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <Label>Service Category *</Label>
        <Select
          value={formData.service_category}
          onValueChange={(cat) => setFormData({ ...formData, service_category: cat })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service category" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Years of Experience *</Label>
        <Input
          required
          type="number"
          min="0"
          max="70"
          value={formData.experience_years || ""}
          onChange={(e) =>
            setFormData({ ...formData, experience_years: e.target.value ? Number.parseInt(e.target.value) : 0 })
          }
        />
      </div>

      <div>
        <Label>Short Description of Services *</Label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your services, specializations, and what you offer..."
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label>State *</Label>
          <Input
            required
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="State"
          />
        </div>
        <div>
          <Label>District *</Label>
          <Input
            required
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            placeholder="District"
          />
        </div>
        <div>
          <Label>City *</Label>
          <Input
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City/Town"
          />
        </div>
      </div>

      <div>
        <Label>Working Area / Coverage Location *</Label>
        <Input
          required
          value={formData.working_area}
          onChange={(e) => setFormData({ ...formData, working_area: e.target.value })}
          placeholder="e.g., Within 50km of city center"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Rate Type *</Label>
          <Select value={formData.rate_type} onValueChange={(type) => setFormData({ ...formData, rate_type: type })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per_day">Per Day</SelectItem>
              <SelectItem value="per_hour">Per Hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Rate (₹) *</Label>
          <Input
            required
            type="text"
            value={formData.rate}
            onFocus={() => formData.rate === "0" && setFormData({ ...formData, rate: "" })}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            placeholder="e.g., 500"
          />
        </div>
      </div>

      <div>
        <Label>Upload Photo/Portfolio</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📸</div>
            <p className="font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">{photo ? photo.name : "No photo selected"}</p>
          </label>
        </div>
      </div>

      <div>
        <Label>Referral Code / Link (Optional)</Label>
        <Input
          value={formData.referral_code}
          onChange={(e) => setFormData({ ...formData, referral_code: e.target.value })}
          placeholder="If referred by someone, enter their referral code here"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 rounded"
        />
        <Label htmlFor="terms" className="text-sm cursor-pointer">
          I accept the Terms & Conditions *
        </Label>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}

      <Button type="submit" disabled={isLoading} className="w-full bg-secondary hover:bg-secondary/90">
        {isLoading ? "Registering..." : "Register Services"}
      </Button>
    </form>
  )
}
