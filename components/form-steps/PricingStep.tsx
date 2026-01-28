"use client";

import React, { useState, useEffect } from "react";
import { Info, ChevronLeft } from "lucide-react";

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
    formData.weekdayPrice || 2999
  );
  const [weekendPrice, setWeekendPrice] = useState(
    formData.weekendPrice || 2999
  );
  const [isDifferentWeekend, setIsDifferentWeekend] = useState(
    formData.weekendPrice !== formData.weekdayPrice
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
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities */}
        <div className="flex justify-between items-center">
          {/* Save & Exit color used for radio accent below */}
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

      {/* Sticky Bottom Navigation */}
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
            className="flex-1 py-3 px-6 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-950 transition active:scale-95 shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
