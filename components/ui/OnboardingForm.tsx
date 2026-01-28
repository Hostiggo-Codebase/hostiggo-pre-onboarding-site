"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import OwnerDetailsStep from "@/components/form-steps/OwnerDetailsStep";
import PropertyTypeStep from "@/components/form-steps/PropertyTypeStep";
import AddressStep from "@/components/form-steps/AddressStep";
import ListingTitleStep from "@/components/form-steps/ListingTitleStep";
import PropertyCapacityStep from "@/components/form-steps/PropertyCapacityStep";
import PhotoUploadStep from "@/components/form-steps/PhotoUploadStep";
import AccommodationTypeStep from "@/components/form-steps/AccommodationTypeStep";
import AvailableFacilitiesStep from "@/components/form-steps/AvailableFacilitiesStep";
import AboutHostingStep from "@/components/form-steps/AboutHostingStep";
import PricingStep from "@/components/form-steps/PricingStep";
import PaidAddonsStep from "@/components/form-steps/PaidAddonsStep";
import ReviewStep from "@/components/form-steps/ReviewStep";
import ManualAddressStep from "../form-steps/ManualAddressStep";
import EditAddonStep from "../form-steps/EditAddonStep";
import HouseRulesStep from "../form-steps/HouseRulesStep";
import SafetyDetailsStep from "../form-steps/SafetyDetailsStep";
import EligibilityStep from "../form-steps/EligibilityStep";
import { createClient } from "@/lib/supabase/client";

interface Bedroom {
  guests: number;
  beds: number;
  bathrooms: number;
}

export interface FormData {
  // 1. Owner Details
  ownerName: string;
  ownerPhone: string;
  ownerCity: string;

  // 2. Address & Manual Entry
  country: string;
  streetAddress: string;
  nearbyLandmark: string;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;

  // 3. Property Overview
  propertyType: string;
  propertyTitle: string;
  bedrooms: Bedroom[];

  // 4. Accommodation & Amenities
  accommodationType: "entire" | "private" | "shared";
  amenities: string[];

  // 5. Media
  photos: (File | string)[];

  // 6. Pricing
  weekdayPrice: number;
  weekendPrice: number;

  // 7. Paid Add-ons (Detailed structure to support the Edit page)
  paidAddons: Record<
    string,
    {
      id: string;
      enabled: boolean;
      price: number;
      includes: string;
      timings: { from: string; to: string } | string;
      extraDetails?: { label: string; value: string }[];
    }
  >;

  // 8. House Rules
  checkInTime: string;
  checkOutTime: string;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  partiesAllowed: boolean;
  quietHours: boolean;

  // 9. Safety Details
  hasExteriorCamera: boolean;
  hasNoiseDevice: boolean;
  hasWeapons: boolean;
  hasSmokeAlarm: boolean;

  // 10. Eligibility & Contact
  isAllowedToHost: boolean; //
  agreedToPolicy: boolean; //
  contactPreference: "whatsapp" | "call" | "email";
}

export default function OnboardingForm({ onBack }: { onBack: () => void }) {
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [isManualAddress, setIsManualAddress] = useState(false);
  const [editingAddonId, setEditingAddonId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ownerName: "",
    ownerPhone: "",
    ownerCity: "",
    country: "India",
    streetAddress: "",
    nearbyLandmark: "",
    city: "",
    state: "",
    postalCode: "",
    propertyType: "",
    propertyTitle: "",
    bedrooms: [{ guests: 2, beds: 1, bathrooms: 1 }],
    accommodationType: "entire",
    amenities: [],
    photos: [],
    weekdayPrice: 2999,
    weekendPrice: 3999,
    paidAddons: {},
    // New Initial States
    checkInTime: "00:00",
    checkOutTime: "00:00",
    smokingAllowed: true,
    petsAllowed: false,
    partiesAllowed: false,
    quietHours: false,
    hasExteriorCamera: true,
    hasNoiseDevice: false,
    hasWeapons: false,
    hasSmokeAlarm: false,
    isAllowedToHost: true,
    agreedToPolicy: false,
    contactPreference: "whatsapp",
  });

  const handleNext = (data: Partial<FormData>) => {
    console.log("Handling next with data:", data);
    setFormData({ ...formData, ...data });
    if (isManualAddress) setIsManualAddress(false);
    setCurrentStep(currentStep + 1);
    console.log(formData);
  };

  const handleBack = () => {
    if (editingAddonId) {
      setEditingAddonId(null); // Return to the list
    } else if (isManualAddress) {
      setIsManualAddress(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderPaidAddonsStep = () => {
    if (editingAddonId) {
      return (
        <EditAddonStep
          addon={formData.paidAddons[editingAddonId]}
          onSave={(updatedData) => {
            const newAddons = {
              ...formData.paidAddons,
              [editingAddonId]: updatedData,
            };
            setFormData({ ...formData, paidAddons: newAddons });
            setEditingAddonId(null); // Return to list after save
          }}
          onBack={handleBack}
        />
      );
    }
    return (
      <PaidAddonsStep
        formData={formData}
        onNext={handleNext}
        onBack={handleBack}
        onEdit={(id) => setEditingAddonId(id)} // Pass trigger to child
      />
    );
  };
  const handleSubmit = async (data: Partial<FormData>) => {
    setIsSubmitting(true);
    const finalData = { ...formData, ...data };

    try {
      // 1. Insert listing WITHOUT photos
      const { data: listing, error: insertError } = await supabase
        .from("listings")
        .insert([
          {
            owner_name: finalData.ownerName,
            owner_phone: finalData.ownerPhone,
            owner_city: finalData.ownerCity,
            country: finalData.country,
            street_address: finalData.streetAddress,
            nearby_landmark: finalData.nearbyLandmark,
            city: finalData.city,
            state: finalData.state,
            postal_code: finalData.postalCode,
            latitude: finalData.latitude,
            longitude: finalData.longitude,
            property_type: finalData.propertyType,
            property_title: finalData.propertyTitle,
            bedrooms: finalData.bedrooms,
            accommodation_type: finalData.accommodationType,
            amenities: finalData.amenities,
            weekday_price: finalData.weekdayPrice,
            weekend_price: finalData.weekendPrice,
            paid_addons: finalData.paidAddons,
            check_in_time: finalData.checkInTime,
            check_out_time: finalData.checkOutTime,
            smoking_allowed: finalData.smokingAllowed,
            pets_allowed: finalData.petsAllowed,
            parties_allowed: finalData.partiesAllowed,
            quiet_hours: finalData.quietHours,
            has_exterior_camera: finalData.hasExteriorCamera,
            has_smoke_alarm: finalData.hasSmokeAlarm,
            is_allowed_to_host: finalData.isAllowedToHost,
            agreed_to_policy: finalData.agreedToPolicy,
            contact_preference: finalData.contactPreference,
          },
        ])
        .select("id")
        .single();

      if (insertError || !listing) {
        throw insertError;
      }

      const listingId = listing.id;

      // 3. Upload photos
      const photoUrls: string[] = [];

      for (const photo of finalData.photos) {
        if (!(photo instanceof File)) continue;

        const ext = photo.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const filePath = `listings/${listingId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property-photos")
          .upload(filePath, photo);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("property-photos")
          .getPublicUrl(filePath);

        photoUrls.push(data.publicUrl);
      }

      // 4. Update listing with photo URLs
      const { error: updateError } = await supabase
        .from("listings")
        .update({ photo_urls: photoUrls })
        .eq("id", listingId);

      if (updateError) throw updateError;

      alert("Property listed successfully!");
      onBack();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render the address logic at index 3
  const renderAddressStep = () => {
    if (isManualAddress) {
      return (
        <ManualAddressStep
          formData={formData}
          // When manual entry is done, proceed to the next main step (index 4)
          onNext={handleNext}
          onBack={handleBack}
        />
      );
    }
    return (
      <AddressStep
        formData={formData}
        // CHANGE: Update data and show manual form instead of moving to Step 4
        onNext={(data: Partial<FormData>) => {
          setFormData((prev) => ({ ...prev, ...data }));
          setIsManualAddress(true);
        }}
        onBack={handleBack}
        onManualEntry={() => setIsManualAddress(true)}
      />
    );
  };
  // In OnboardingForm.tsx
  const steps = [
    <OwnerDetailsStep
      key="owner"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <AboutHostingStep
      key="about"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <PropertyTypeStep
      key="type"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    renderAddressStep(),
    <ListingTitleStep
      key="title"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <PropertyCapacityStep
      key="capacity"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <PhotoUploadStep
      key="photos"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <AccommodationTypeStep
      key="accommodation"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <AvailableFacilitiesStep
      key="facilities"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <PricingStep
      key="pricing"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    renderPaidAddonsStep(),
    <HouseRulesStep
      key="house-rules"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,
    <SafetyDetailsStep
      key="safety"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
    />,

    <EligibilityStep
      key="eligibility"
      formData={formData}
      onNext={handleNext}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />,
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition ${
                  i <= currentStep ? "bg-blue-950" : "bg-stone-200"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-stone-600 mt-4">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Form Content */}
        <div className="mb-8">{steps[currentStep]}</div>
      </div>
    </div>
  );
}
