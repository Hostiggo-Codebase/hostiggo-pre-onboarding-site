"use client";

import React, { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface OwnerDetailsStepProps {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function OwnerDetailsStep({
  formData,
  onNext,
  onBack,
}: OwnerDetailsStepProps) {
  const initialName = (formData.ownerName || "").trim();
  const nameParts = initialName.split(/\s+/).filter(Boolean);
  const [firstName, setFirstName] = useState(nameParts[0] || "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" "));
  const [phone, setPhone] = useState(formData.ownerPhone || "");
  const [city, setCity] = useState(formData.ownerCity || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phoneDigits = phone.replace(/\D/g, "");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "Required";
    if (!lastName.trim()) newErrors.lastName = "Required";
    if (!phone.trim()) {
      newErrors.phone = "Required";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!city.trim()) newErrors.city = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        ownerName: [firstName, lastName].filter(Boolean).join(" "),
        ownerPhone: phone,
        ownerCity: city,
      });
    }
  };

  const isNextDisabled =
    !firstName || !lastName || !phone || !city || phoneDigits.length < 10;

  return (
    <OnboardingStepLayout>
      <div className="text-center mb-8">
        <h1 className="text-[#282828] text-3xl sm:text-4xl font-semibold tracking-[0.02em] leading-tight">
          Your Information
        </h1>
        <p className="text-[#494949] text-base sm:text-lg font-medium tracking-[0.02em] mt-2">
          Add your basic details to set up your profile
        </p>
      </div>

      <form onSubmit={handleNext} id="owner-form">
        <h2 className="text-[#282828] text-2xl font-semibold mb-6 tracking-[0.02em]">
          Personal details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`rounded-[14px] border bg-white p-4 text-base sm:text-lg outline-none transition ${
              errors.firstName
                ? "border-red-500"
                : "border-black/20 focus:border-[#004772]"
            }`}
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`rounded-[14px] border bg-white p-4 text-base sm:text-lg outline-none transition ${
              errors.lastName
                ? "border-red-500"
                : "border-black/20 focus:border-[#004772]"
            }`}
          />
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-[14px] border border-black/20 bg-white p-4 text-base sm:text-lg outline-none focus:border-[#004772]"
          />

          <div className="space-y-2">
            <input
              type="tel"
              placeholder="Mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full rounded-[14px] border bg-white p-4 text-base sm:text-lg outline-none transition focus:border-[#004772] ${
                errors.phone ? "border-red-500" : "border-black/20"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 font-medium">{errors.phone}</p>
            )}
          </div>
        </div>
      </form>

      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          onClick={onBack}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition"
        >
          Previous
        </button>
        <button
          type="submit"
          form="owner-form"
          disabled={isNextDisabled}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            isNextDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#004772] hover:bg-[#003656] shadow-lg"
          }`}
        >
          Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
