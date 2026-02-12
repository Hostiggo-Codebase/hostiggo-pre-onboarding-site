"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

interface NavigationProps {
  onBack?: () => void;
  onNext: (e: React.FormEvent) => void;
  nextDisabled?: boolean;
  nextDisabledReason?: string;
}

export const NavigationButtons = ({
  onBack,
  onNext,
  nextDisabled = false,
  nextDisabledReason,
}: NavigationProps) => {
  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Safely execute the onBack function passed from OnboardingForm
    if (typeof onBack === "function") {
      onBack();
    } else {
      console.warn(
        "NavigationButtons: onBack prop is missing or not a function.",
      );
    }
  };

  return (
    <>
      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={handleBackClick}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            !nextDisabled
              ? "bg-[#004772] hover:bg-[#003656] shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      {nextDisabled && nextDisabledReason && (
        <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
          {nextDisabledReason}
        </p>
      )}
    </>
  );
};
