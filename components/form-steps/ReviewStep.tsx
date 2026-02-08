"use client";

import React from "react";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface ReviewStepProps {
  formData: any;
  onSubmit: (data: any) => void;
}

export default function ReviewStep({ formData, onSubmit }: ReviewStepProps) {
  const [contactPreference, setContactPreference] = useState<
    "whatsapp" | "call" | "email"
  >("whatsapp");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      onSubmit({ contactPreference });
    }
  };

  return (
    <OnboardingStepLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-light text-blue-950">
            Review Your Information
          </h2>
          <p className="text-stone-600">
            Please verify your details before submitting
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-blue-950">Your Details</h3>
            <div className="space-y-2 text-sm text-stone-700">
              <p>
                <span className="text-stone-500">Name:</span>{" "}
                {formData.ownerName}
              </p>
              <p>
                <span className="text-stone-500">Phone:</span>{" "}
                {formData.ownerPhone}
              </p>
              <p>
                <span className="text-stone-500">City:</span>{" "}
                {formData.ownerCity}
              </p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-blue-950">Property Details</h3>
            <div className="space-y-2 text-sm text-stone-700">
              <p>
                <span className="text-stone-500">Type:</span>{" "}
                {formData.propertyType}
              </p>
              <p>
                <span className="text-stone-500">Title:</span>{" "}
                {formData.propertyTitle}
              </p>
              <p>
                <span className="text-stone-500">Location:</span>{" "}
                {formData.city}, {formData.state}
              </p>
              <p>
                <span className="text-stone-500">Bedrooms:</span>{" "}
                {formData.bedrooms?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-blue-950">Pricing</h3>
            <div className="space-y-2 text-sm text-stone-700">
              <p>
                <span className="text-stone-500">Weekday (Mon-Thu):</span>{" "}
                <span className="font-semibold text-blue-950">
                  ₹{formData.weekdayPrice?.toLocaleString() || "0"}
                </span>
              </p>
              <p>
                <span className="text-stone-500">Weekend (Fri-Sun):</span>{" "}
                <span className="font-semibold text-blue-950">
                  ₹{formData.weekendPrice?.toLocaleString() || "0"}
                </span>
              </p>
              <p>
                <span className="text-stone-500">Avg/night:</span>{" "}
                <span className="font-semibold text-blue-950">
                  ₹
                  {Math.round(
                    (formData.weekdayPrice * 20 + formData.weekendPrice * 10) /
                      30,
                  )?.toLocaleString() || "0"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {formData.photos && formData.photos.length > 0 && (
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2">
            <h3 className="font-medium text-blue-950">Uploaded Photos</h3>
            <p className="text-sm text-stone-600">
              {formData.photos.length} photo(s) uploaded
            </p>
          </div>
        )}

        <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-blue-950">Selected Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {formData.amenities.length > 0 ? (
              formData.amenities.map((a: string) => (
                <span
                  key={a}
                  className="inline-block bg-stone-200 text-blue-950 px-3 py-1 rounded-full text-sm"
                >
                  {a.replace(/_/g, " ").toUpperCase()}
                </span>
              ))
            ) : (
              <p className="text-sm text-stone-600">No amenities selected</p>
            )}
          </div>
        </div>

        {formData.paidAddons && Object.keys(formData.paidAddons).length > 0 && (
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-blue-950">
              Paid Add-ons & Services
            </h3>
            <div className="space-y-2">
              {Object.entries(formData.paidAddons).map(
                ([addonId, addon]: [string, any]) => (
                  <div
                    key={addonId}
                    className="text-sm bg-white p-2 rounded border border-stone-200"
                  >
                    <p className="font-medium text-stone-900">
                      {addonId.replace(/_/g, " ").toUpperCase()}
                    </p>
                    <p className="text-stone-600">
                      Weekday: ₹{addon.weekdayPrice}/day • Weekend: ₹
                      {addon.weekendPrice}/day
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* Contact Preference */}
        <div>
          <label className="block text-sm font-medium text-blue-950 mb-3">
            How should we contact you?
          </label>
          <div className="space-y-2">
            {["whatsapp", "call", "email"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 p-3 border border-stone-300 rounded-lg cursor-pointer hover:bg-stone-50"
              >
                <input
                  type="radio"
                  name="contact"
                  value={method}
                  checked={contactPreference === method}
                  onChange={(e) => setContactPreference(e.target.value as any)}
                  className="w-4 h-4"
                />
                <span className="font-medium text-blue-950 capitalize">
                  Via {method === "whatsapp" ? "WhatsApp" : method}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">After Submission</h4>
              <p className="text-sm text-blue-800 mt-1">
                The Hostiggo team will contact you within 24 hours to verify
                your details and complete the onboarding process. Your listing
                will not be published automatically — we ensure quality
                verification first.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <label className="flex items-start gap-3 p-3 border border-stone-300 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-1"
          />
          <span className="text-sm text-stone-700">
            I confirm that all information provided is accurate and I agree to
            be contacted by the Hostiggo team for verification and onboarding.
          </span>
        </label>

        <div className="onboarding-footer flex justify-center mt-10">
          <button
            type="submit"
            disabled={!agreed}
            className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition flex items-center justify-center gap-2 ${
              agreed
                ? "bg-[#004772] hover:bg-[#003656] shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            Submit & Begin Onboarding
          </button>
        </div>
      </form>
    </OnboardingStepLayout>
  );
}
