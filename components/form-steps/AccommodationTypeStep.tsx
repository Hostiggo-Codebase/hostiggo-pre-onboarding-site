"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

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
    // In a real app, replace these placeholders with the actual 3D isometric images
    image: "/api/placeholder/120/100",
  },
  {
    value: "private",
    label: "Private Room",
    description: "Guests stay in a private room and share common areas",
    image: "/api/placeholder/120/100",
  },
  {
    value: "shared",
    label: "Shared Space",
    description: "Guests share living or sleeping areas with others",
    image: "/api/placeholder/120/100",
  },
];

export default function AccommodationTypeStep({
  formData,
  onNext,
  onBack,
}: Props) {
  const [selectedType, setSelectedType] = useState(
    formData.accommodationType || ""
  );

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      onNext({ accommodationType: selectedType });
    }
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities matching your UI */}
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
              {/* Image Placeholder matching image_6160d2.png isometric style */}
              <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-50">
                <img
                  src={type.image}
                  alt={type.label}
                  className="w-full h-full object-cover opacity-80"
                />
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

      {/* Sticky Bottom Navigation matching your recent feedback */}
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
            disabled={!selectedType}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition active:scale-95 shadow-md ${
              selectedType
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
