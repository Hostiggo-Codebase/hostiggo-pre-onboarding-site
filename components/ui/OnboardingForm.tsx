"use client";

import { useEffect, useState } from "react";
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
import OnboardingHeader from "@/components/ui/OnboardingHeader";
import CopyrightBar from "@/components/ui/Copyrightbar";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
  latitude?: number | null;
  longitude?: number | null;

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

export default function OnboardingForm({
  onBack,
  onExit,
}: {
  onBack: () => void;
  onExit: () => void;
}) {
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [isManualAddress, setIsManualAddress] = useState(false);
  const [editingAddonId, setEditingAddonId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const initialFormData: FormData = {
    ownerName: "",
    ownerPhone: "",
    ownerCity: "",
    country: "India",
    streetAddress: "",
    nearbyLandmark: "",
    city: "",
    state: "",
    postalCode: "",
    latitude: null,
    longitude: null,
    propertyType: "",
    propertyTitle: "",
    bedrooms: [{ guests: 2, beds: 1, bathrooms: 1 }],
    accommodationType: "entire",
    amenities: [],
    photos: [],
    weekdayPrice: 2999,
    weekendPrice: 3999,
    paidAddons: {},

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
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("onboarding_form="))
        ?.split("=")[1];

      if (!cookieValue) return;

      const parsed = JSON.parse(decodeURIComponent(cookieValue));
      if (parsed && typeof parsed === "object") {
        const {
          currentStep: savedStep,
          photos,
          ...rest
        } = parsed as Partial<
          FormData & { currentStep: number; photos: (File | string)[] }
        >;

        setFormData((prev) => ({
          ...prev,
          ...rest,
          photos: Array.isArray(photos) ? photos : prev.photos,
        }));

        if (typeof savedStep === "number" && savedStep >= 0) {
          setCurrentStep(savedStep);
        }
      }
    } catch (error) {
      console.error("Failed to load onboarding data:", error);
    }
  }, []);

  const handleNext = (data: Partial<FormData>) => {
    console.log("Handling next with data:", data);
    setFormData({ ...formData, ...data });
    if (isManualAddress) setIsManualAddress(false);
    setCurrentStep(currentStep + 1);
    console.log(formData);
  };

  const handleSaveExit = () => {
    try {
      const serializedPhotos = formData.photos.map((photo) =>
        typeof photo === "string"
          ? photo
          : { name: photo.name, type: photo.type, size: photo.size },
      );
      const payload = {
        ...formData,
        photos: serializedPhotos,
        currentStep,
      };
      const encoded = encodeURIComponent(JSON.stringify(payload));
      document.cookie = `onboarding_form=${encoded}; path=/; max-age=2592000`;
    } catch (error) {
      console.error("Failed to save onboarding data:", error);
    }
    onExit();
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
    type PaidAddon = FormData["paidAddons"][string];
    if (editingAddonId) {
      return (
        <EditAddonStep
          addon={formData.paidAddons[editingAddonId]}
          onSave={(updatedData: PaidAddon) => {
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

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsManualAddress(false);
    setEditingAddonId(null);
    document.cookie = "onboarding_form=; path=/; max-age=0";
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

      resetForm();
      setIsSuccess(true);
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
      isSubmitting={isSubmitting}
    />,
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1">
          <Header />
          <section className="pt-[140px] pb-20 px-6 lg:px-20 font-poppins">
            <div className="max-w-[900px] mx-auto text-center space-y-6">
              <h1 className="text-[44px] sm:text-[56px] font-semibold text-[#004772]">
                Successfully listed
              </h1>
              <p className="text-[#3A3A3A] text-[20px]">
                Your property has been published and is now live on Hostiggo.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-10 py-4 bg-[#004772] text-white rounded-[14px] font-medium text-xl hover:opacity-90 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </section>
          <Footer />
        </div>
        <CopyrightBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <OnboardingHeader
          onExit={handleSaveExit}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
        {/* Form Content - Full width, steps handle their own layout */}
        {steps[currentStep]}
      </div>
      <CopyrightBar />
    </div>
  );
}
