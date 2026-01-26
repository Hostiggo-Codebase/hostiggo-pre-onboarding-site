"use client";

import React from "react";
import { CheckCircle2, ChevronLeft, HelpCircle } from "lucide-react";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function AboutHostingStep({ formData, onNext, onBack }: Props) {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({});
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-8 flex-1">
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
          <h2 className="text-2xl font-bold text-blue-950">About Hosting</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Learn what hosting is all about and how you can start earning
          </p>
        </div>

        <div className="space-y-8">
          {/* Information Sections */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
              What is this?
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              With Hostiggo, you can list your home stay and make it available
              for guests to book from anywhere in the world.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
              How do you earn?
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              You earn whenever a guest books your place. You set your own
              prices, availability, and house rules — everything is under your
              control.
            </p>
          </div>

          {/* List Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-950">How it works?</h3>
            <ul className="space-y-4">
              {[
                "Create your listing in a few simple steps",
                "Add photos, details, and pricing",
                "Publish when you're ready",
                "Get paid securely for confirmed bookings",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-950">Good to know</h3>
            <ul className="space-y-4">
              {[
                "You can save and finish anytime",
                "Your listing won't go live until you publish it",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-stone-400 text-xs italic pt-10 pb-6 text-center">
          You can always change this after publish
        </p>
      </div>

      {/* Sticky Bottom Navigation matching unified UI */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onBack();
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
