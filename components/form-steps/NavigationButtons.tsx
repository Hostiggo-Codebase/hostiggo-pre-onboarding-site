"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

interface NavigationProps {
  onBack?: () => void;
  onNext: (e: React.FormEvent) => void;
  nextDisabled?: boolean;
}

export const NavigationButtons = ({
  onBack,
  onNext,
  nextDisabled = false,
}: NavigationProps) => {
  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Safely execute the onBack function passed from OnboardingForm
    if (typeof onBack === "function") {
      onBack();
    } else {
      console.warn(
        "NavigationButtons: onBack prop is missing or not a function."
      );
    }
  };

  return (
    <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
      <div className="max-w-md mx-auto flex gap-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex-1 py-3 px-6 border border-stone-300 text-blue-950 rounded-xl font-bold hover:bg-stone-50 transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition active:scale-95 ${
            !nextDisabled
              ? "bg-blue-900 text-white hover:bg-blue-950 shadow-md"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
