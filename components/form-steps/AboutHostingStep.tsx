"use client";

import React from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

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
    <OnboardingStepLayout>
      <div className="space-y-8">
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

      {/* Footer Buttons */}
      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onBack();
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
