"use client";

import React, { useState } from "react";
import { ChevronLeft, DoorClosed, Home, Users } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const accommodationTypes = [
  {
    value: "entire",
    label: "Entire Property",
    description: "Guests book entire property for their stay",
    icon: Home,
  },
  {
    value: "private",
    label: "Private Room",
    description: "Guests stay in a private room and share common areas",
    icon: DoorClosed,
  },
  {
    value: "shared",
    label: "Shared Space",
    description: "Guests share living or sleeping areas with others",
    icon: Users,
  },
];

export default function AccommodationTypeStep({
  formData,
  onNext,
  onBack,
}: Props) {
  const [selectedType, setSelectedType] = useState(
    formData.accommodationType || "",
  );

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      onNext({ accommodationType: selectedType });
    }
  };

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-950">
          How will guests stay at your property?
        </h2>

        {/* Accommodation Selection Cards */}
        <div className="space-y-4">
          {accommodationTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={`w-full text-left p-4 rounded-2xl border transition flex items-center gap-4 ${
                selectedType === type.value
                  ? "border-blue-950 bg-blue-50 shadow-sm"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              {/* Icon */}
              <div className="w-24 h-20 rounded-xl flex-shrink-0 bg-stone-100 border border-stone-50 flex items-center justify-center">
                <type.icon className="w-10 h-10 text-[#004772]" />
              </div>

              <div className="flex-1">
                <p className="font-bold text-blue-950 text-lg leading-tight">
                  {type.label}
                </p>
                <p className="text-sm text-stone-500 leading-snug mt-1">
                  {type.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-stone-400 text-xs italic pt-10 text-center">
          You can always change this after publish
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onBack) onBack();
          }}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedType}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            selectedType
              ? "bg-[#004772] hover:bg-[#003656] shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      {!selectedType && (
        <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
          Select an accommodation type to continue.
        </p>
      )}
    </OnboardingStepLayout>
  );
}
