"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";
interface Props {
  formData: any;
  onSubmit: (data?: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}
export default function EligibilityStep({
  onSubmit,
  onBack,
  isSubmitting = false,
}: Props) {
  const [eligibility, setEligibility] = useState({
    allowed: true,
    policy: false,
  });

  const isComplete = eligibility.allowed && eligibility.policy;
  const isPublishDisabled = !isComplete || isSubmitting;

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-950">
          Confirm Hosting Eligibility
        </h2>

        <div className="space-y-10 pt-4">
          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-stone-700 font-medium group-hover:text-blue-950 transition">
              I'm allowed to host at this location
            </span>
            <input
              type="checkbox"
              checked={eligibility.allowed}
              onChange={() =>
                setEligibility({
                  ...eligibility,
                  allowed: !eligibility.allowed,
                })
              }
              className="w-5 h-5 rounded border-stone-300 accent-sky-500"
            />
          </label>

          <label className="flex items-center justify-between group cursor-pointer">
            <span className="text-stone-700 font-medium group-hover:text-blue-950 transition">
              I agree to platform's policy
            </span>
            <input
              type="checkbox"
              checked={eligibility.policy}
              onChange={() =>
                setEligibility({ ...eligibility, policy: !eligibility.policy })
              }
              className="w-5 h-5 rounded border-stone-300 accent-sky-500"
            />
          </label>
        </div>

        <div className="pt-20">
          <p className="text-stone-500 text-[11px] text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="underline decoration-1 underline-offset-2">
              Hosting Standards
            </span>{" "}
            and <br />
            <span className="underline decoration-1 underline-offset-2">
              Terms & Policies
            </span>
          </p>
        </div>
      </div>

      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={onBack}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="button"
          onClick={() => isComplete && !isSubmitting && onSubmit()}
          disabled={isPublishDisabled}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            isPublishDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#004772] hover:bg-[#003656] shadow-lg"
          }`}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </div>
      {isPublishDisabled && (
        <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
          Confirm both checkboxes to publish.
        </p>
      )}
    </OnboardingStepLayout>
  );
}
