"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { /*Select, SelectContent, SelectItem, SelectTrigger, SelectValue*/ } from "@/components/ui/select"

const AMENITIES = [
  "WiFi",
  "Parking",
  "Food Service",
  "AC",
  "Heating",
  "Pool",
  "Gym",
  "Laundry",
  "TV",
  "Kitchen",
  "Garden",
  "Terrace",
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

interface HostFormData {
  full_name: string
  phone: string
  whatsapp: string
  email: string
  property_name: string
  full_address: string
  state: string
  district: string
  city: string
  google_maps_link: string
  number_of_rooms: number
  max_guests: number
  description: string
  amenities: string[]
  base_price: string
  weekend_price: string
  referral_code: string
}

interface HostFormProps {
  onSuccess?: () => void
}

export function HostForm({ onSuccess }: HostFormProps) {
  const [formData, setFormData] = useState<HostFormData>({
    full_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    property_name: "",
    full_address: "",
    state: "",
    district: "",
    city: "",
    google_maps_link: "",
    number_of_rooms: 1,
    max_guests: 1,
    description: "",
    amenities: [],
    base_price: "",
    weekend_price: "",
    referral_code: "",
  })

  const [photos, setPhotos] = useState<File[]>([])
  const [amenitiesSelected, setAmenitiesSelected] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const refCode = params.get("ref")
    if (refCode) {
      setFormData((prev) => ({ ...prev, referral_code: refCode }))
    }
  }, [])


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const toggleAmenity = (amenity: string) => {
    setAmenitiesSelected((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
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

      if (!formData.google_maps_link) {
        throw new Error("Please provide a Google Maps location or coordinates")
      }

      if (photos.length < 5) {
        throw new Error("Please upload at least 5 photos")
      }

      const photoUrls = []
      for (const photo of photos.slice(0, 5)) {
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
        photoUrls.push(data.url)
      }

      const payload = {
        ...formData,
        amenities: amenitiesSelected,
        photoUrls,
        base_price: parseFloat(formData.base_price as any) || 0,
        weekend_price: parseFloat(formData.weekend_price as any) || 0,
      }

      const registrationResponse = await fetch("/api/register/host", {
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

      // Show success and reset form
      onSuccess?.()
      setFormData({
        full_name: "",
        phone: "",
        whatsapp: "",
        email: "",
        property_name: "",
        full_address: "",
        state: "",
        district: "",
        city: "",
        google_maps_link: "",
        number_of_rooms: 1,
        max_guests: 1,
        description: "",
        amenities: [],
        base_price: "",
        weekend_price: "",
        referral_code: "",
      })
      setPhotos([])
      setAmenitiesSelected([])
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
        <Label>Property Name *</Label>
        <Input
          required
          value={formData.property_name}
          onChange={(e) => setFormData({ ...formData, property_name: e.target.value })}
          placeholder="e.g., Sunset Villa, Mountain Lodge"
        />
      </div>

      <div>
        <Label>Full Address *</Label>
        <Textarea
          required
          value={formData.full_address}
          onChange={(e) => setFormData({ ...formData, full_address: e.target.value })}
          placeholder="Complete address with pin code"
          rows={3}
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
        <Label>Google Maps Location (Coordinates or Link) *</Label>
        <Input
          required
          value={formData.google_maps_link}
          onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
          placeholder="https://maps.google.com/... or 12.9716, 77.5946"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Number of Rooms *</Label>
          <Input
            required
            type="number"
            min="1"
            value={formData.number_of_rooms}
            onChange={(e) =>
              setFormData({ ...formData, number_of_rooms: e.target.value ? Number.parseInt(e.target.value) : 1 })
            }
          />
        </div>
        <div>
          <Label>Maximum Guests *</Label>
          <Input
            required
            type="number"
            min="1"
            value={formData.max_guests}
            onChange={(e) =>
              setFormData({ ...formData, max_guests: e.target.value ? Number.parseInt(e.target.value) : 1 })
            }
          />
        </div>
      </div>

      <div>
        <Label>Property Description *</Label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Tell travelers about your property... amenities, views, nearby attractions, etc."
          rows={4}
        />
      </div>

      <div>
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {AMENITIES.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                amenitiesSelected.includes(amenity)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Base Price / Night (₹) *</Label>
          <Input
            required
            type="text"
            value={formData.base_price}
            onFocus={() => formData.base_price === "0" && setFormData({ ...formData, base_price: "" })}
            onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
            placeholder="e.g., 1500"
          />
        </div>
        <div>
          <Label>Weekend/Season Price / Night (₹)</Label>
          <Input
            type="text"
            value={formData.weekend_price}
            onFocus={() => formData.weekend_price === "0" && setFormData({ ...formData, weekend_price: "" })}
            onChange={(e) => setFormData({ ...formData, weekend_price: e.target.value })}
            placeholder="e.g., 2000"
          />
        </div>
      </div>

      <div>
        <Label>Upload Photos (Minimum 5 required) *</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📷</div>
            <p className="font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">{photos.length} file(s) selected (min 5 required)</p>
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

      <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
        {isLoading ? "Registering..." : "Register Property"}
      </Button>
    </form>
  )
}
