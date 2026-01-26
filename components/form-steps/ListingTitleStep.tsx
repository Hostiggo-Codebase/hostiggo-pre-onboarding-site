"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";

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
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities */}
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

      {/* Sticky Bottom Navigation - Logic Integrated */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onBack) onBack();
            }}
            className="flex-1 py-3 px-6 border border-stone-300 text-blue-950 rounded-xl font-bold hover:bg-stone-50 transition active:scale-95"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isTitleValid}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition active:scale-95 ${
              isTitleValid
                ? "bg-blue-900 text-white hover:bg-blue-950 shadow-md"
                : "bg-stone-200 text-stone-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
