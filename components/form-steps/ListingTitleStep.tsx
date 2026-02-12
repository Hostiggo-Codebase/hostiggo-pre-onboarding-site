"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function ListingTitleStep({ formData, onNext, onBack }: Props) {
  const [title, setTitle] = useState(formData.propertyTitle || "");
  const maxChars = 25;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length > 0) {
      onNext({ propertyTitle: title });
    }
  };

  const isTitleValid = title.trim().length > 0 && title.length <= maxChars;

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Listing Title</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Give your listing a title, a short title helps guests to understand
            your space at glance
          </p>
        </div>

        {/* Title Input Area */}
        <div className="space-y-4">
          <div className="relative">
            <textarea
              rows={4}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cozy 2BHK near City Center"
              maxLength={maxChars}
              className="w-full p-4 border border-stone-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-950 resize-none bg-white shadow-sm text-lg"
            />
            <div className="absolute bottom-4 right-4 text-stone-400 text-sm font-medium">
              {title.length}/{maxChars}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-stone-500 text-sm font-medium">
              Not sure what to write?
            </p>
            <button
              type="button"
              className="flex items-center gap-2 text-sky-500 font-bold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="underline decoration-1 underline-offset-4">
                View suggested titles
              </span>
            </button>
          </div>
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
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!isTitleValid}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            isTitleValid
              ? "bg-[#004772] hover:bg-[#003656] shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      {!isTitleValid && (
        <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
          Add a title (max {maxChars} characters) to continue.
        </p>
      )}
    </OnboardingStepLayout>
  );
}
