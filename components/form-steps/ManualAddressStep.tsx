"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

const FormInput = ({ label, error, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-bold text-stone-700">{label}</label>
    <input
      {...props}
      className={`w-full px-4 py-3 border rounded-xl focus:ring-1 focus:ring-blue-950 bg-white transition ${
        error ? "border-red-500" : "border-stone-200 shadow-sm"
      }`}
    />
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

export default function ManualAddressStep({ formData, onNext, onBack }: any) {
  const [address, setAddress] = useState({
    country: formData.country || "India",
    streetAddress: formData.streetAddress || "",
    nearbyLandmark: formData.nearbyLandmark || "",
    city: formData.city || "",
    state: formData.state || "",
    postalCode: formData.postalCode || "",
  });

  // Sync state with props when map data is passed from AddressStep
  useEffect(() => {
    setAddress({
      country: formData.country || "India",
      streetAddress: formData.streetAddress || "",
      nearbyLandmark: formData.nearbyLandmark || "",
      city: formData.city || "",
      state: formData.state || "",
      postalCode: formData.postalCode || "",
    });
  }, [formData]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!address.streetAddress.trim()) errs.streetAddress = "Required";
    if (!address.city.trim()) errs.city = "Required";
    if (!address.state || address.state === "Select state")
      errs.state = "Required";
    if (!/^\d{6}$/.test(address.postalCode)) errs.postalCode = "Invalid Pin";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const states = [
    "Select state",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
  ];

  return (
    <OnboardingStepLayout>
      {/* Scrollable Content Area */}
      <div className="space-y-6">
        <div className="flex justify-between items-center pt-2">
          <h2 className="text-2xl font-bold text-blue-950">Confirm Address</h2>
          <button className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold hover:bg-stone-50 transition">
            Help
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-700">
              Country / Region
            </label>
            <select
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white shadow-sm focus:ring-1 focus:ring-blue-950 outline-none"
            >
              <option value="India">India</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <FormInput
            label="Street Address"
            value={address.streetAddress}
            onChange={(e: any) =>
              setAddress({ ...address, streetAddress: e.target.value })
            }
            error={errors.streetAddress}
          />
          <FormInput
            label="Nearby Landmark (optional)"
            value={address.nearbyLandmark}
            onChange={(e: any) =>
              setAddress({ ...address, nearbyLandmark: e.target.value })
            }
          />
          <FormInput
            label="City"
            value={address.city}
            onChange={(e: any) =>
              setAddress({ ...address, city: e.target.value })
            }
            error={errors.city}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-stone-700">
              State / UT
            </label>
            <select
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className={`w-full px-4 py-3 border rounded-xl bg-white shadow-sm outline-none focus:ring-1 focus:ring-blue-950 transition ${
                errors.state ? "border-red-500" : "border-stone-200"
              }`}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-xs text-red-500 font-medium">{errors.state}</p>
            )}
          </div>

          <FormInput
            label="Pin Code"
            value={address.postalCode}
            onChange={(e: any) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            error={errors.postalCode}
          />

          {/* Privacy Card matching the design theme */}
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex gap-3 mt-4">
            <ShieldCheck className="w-6 h-6 text-blue-950 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-bold text-blue-950 text-sm">
                Your Privacy Matters
              </p>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Exact address is shared only after a booking is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          onClick={onBack}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        <button
          onClick={() =>
            validate() &&
            onNext({
              ...address,
              latitude: formData.latitude ?? null,
              longitude: formData.longitude ?? null,
            })
          }
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Confirm & Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
