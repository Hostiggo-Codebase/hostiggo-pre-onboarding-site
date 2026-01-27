"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

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
  const [name, setName] = useState(formData.ownerName || "");
  const [phone, setPhone] = useState(formData.ownerPhone || "");
  const [city, setCity] = useState(formData.ownerCity || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (phone.trim() && !/^[0-9]{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ ownerName: name, ownerPhone: phone, ownerCity: city });
    }
  };

  const isNextDisabled = !name || !phone || !city;

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities matching the design theme */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sky-500 font-bold text-sm underline decoration-2 underline-offset-4"
          >
            Save & Exit
          </button>
          <button
            type="button"
            className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold"
          >
            Need Help?
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Your Information</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Let's start with your basic details to set up your profile
          </p>
        </div>

        <div className="space-y-5 pt-2">
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-950">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 transition shadow-sm ${
                errors.name ? "border-red-400" : "border-stone-200"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-950">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit number"
              className={`w-full px-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 transition shadow-sm ${
                errors.phone ? "border-red-400" : "border-stone-200"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* City Input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-blue-950">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className={`w-full px-4 py-3 border rounded-2xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 transition shadow-sm ${
                errors.city ? "border-red-400" : "border-stone-200"
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-500 font-medium ml-1">
                {errors.city}
              </p>
            )}
          </div>
        </div>

        <p className="text-stone-400 text-xs italic pt-10 text-center">
          You can always change this after publish
        </p>
      </div>

      {/* Sticky Bottom Navigation matching unified UI */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onBack) onBack();
            }}
            className="flex-1 py-3 px-6 border-2 border-blue-950 text-blue-950 rounded-xl font-bold hover:bg-stone-50 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition active:scale-95 shadow-md ${
              !isNextDisabled
                ? "bg-blue-900 text-white hover:bg-blue-950"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
