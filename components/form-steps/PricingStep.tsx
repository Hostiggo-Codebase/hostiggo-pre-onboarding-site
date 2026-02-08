"use client";

import React, { useState, useEffect } from "react";
import { Info, ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface FormData {
  weekdayPrice: number;
  weekendPrice: number;
}

interface Props {
  formData: FormData;
  onNext: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function PricingStep({ formData, onNext, onBack }: Props) {
  const [weekdayPrice, setWeekdayPrice] = useState(
    formData.weekdayPrice || 2999,
  );
  const [weekendPrice, setWeekendPrice] = useState(
    formData.weekendPrice || 2999,
  );
  const [isDifferentWeekend, setIsDifferentWeekend] = useState(
    formData.weekendPrice !== formData.weekdayPrice,
  );

  // Sync weekend price if "Same as weekday" is selected
  useEffect(() => {
    if (!isDifferentWeekend) {
      setWeekendPrice(weekdayPrice);
    }
  }, [weekdayPrice, isDifferentWeekend]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      weekdayPrice,
      weekendPrice: isDifferentWeekend ? weekendPrice : weekdayPrice,
    });
  };

  // Calculate percentage difference for the dynamic UI tip
  const priceDiff = ((weekendPrice - weekdayPrice) / weekdayPrice) * 100;
  const showDiffLabel = isDifferentWeekend && weekendPrice !== weekdayPrice;

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-950">Set Your Price</h2>

        {/* Weekday Price Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-blue-950">
              Weekday price
            </label>
            <p className="text-stone-500 text-xs">
              Price per night from Monday to Thursday
            </p>
          </div>

          <div className="flex items-center px-4 py-3 border border-stone-200 rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-950 transition">
            <span className="text-xl font-bold text-stone-800 mr-2">₹</span>
            <input
              type="number"
              value={weekdayPrice}
              onChange={(e) => setWeekdayPrice(Number(e.target.value))}
              className="flex-1 bg-transparent border-none focus:outline-none text-xl font-bold text-stone-800"
            />
            <span className="text-stone-400 font-medium">/ Night</span>
          </div>
        </div>

        {/* 1. Added the divider line between weekday and weekend sections */}
        <div className="h-px bg-stone-200 w-full my-2" />

        {/* Weekend Price Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-blue-950">
              Weekend price
            </label>
            <p className="text-stone-500 text-xs">
              Price per night from Friday to Sunday
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              {/* 2. Radio button accent color updated to match sky-500 (Save & Exit) */}
              <input
                type="radio"
                checked={!isDifferentWeekend}
                onChange={() => setIsDifferentWeekend(false)}
                className="w-5 h-5 border-2 border-stone-300 focus:ring-sky-500 accent-sky-500"
              />
              <span className="text-stone-600 font-medium group-hover:text-blue-950 transition">
                Same as weekday
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              {/* 2. Radio button accent color updated to match sky-500 (Save & Exit) */}
              <input
                type="radio"
                checked={isDifferentWeekend}
                onChange={() => setIsDifferentWeekend(true)}
                className="w-5 h-5 border-2 border-stone-300 focus:ring-sky-500 accent-sky-500"
              />
              <span className="text-stone-600 font-medium group-hover:text-blue-950 transition">
                Set a different price
              </span>
            </label>
          </div>

          {isDifferentWeekend && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center px-4 py-3 border border-stone-200 rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-950 transition">
                <span className="text-xl font-bold text-stone-800 mr-2">₹</span>
                <input
                  type="number"
                  value={weekendPrice}
                  onChange={(e) => setWeekendPrice(Number(e.target.value))}
                  className="flex-1 bg-transparent border-none focus:outline-none text-xl font-bold text-stone-800"
                />
                <span className="text-stone-400 font-medium">/ Night</span>
              </div>

              {showDiffLabel && (
                <div className="flex items-center gap-2 px-1">
                  <Info className="w-4 h-4 text-stone-600 fill-stone-100" />
                  <p className="text-xs text-stone-500 font-medium">
                    {Math.abs(Math.round(priceDiff))}%{" "}
                    {priceDiff > 0 ? "higher" : "lower"} than weekday price
                  </p>
                </div>
              )}
            </div>
          )}
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
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
