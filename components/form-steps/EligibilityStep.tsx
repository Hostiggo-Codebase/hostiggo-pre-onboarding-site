"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
interface Props {
  formData: any;
  onSubmit: (data: any) => void; // Parent must pass handleSubmit here
  onBack: () => void;
}
export default function EligibilityStep({ onSubmit, onBack }: any) {
  const [eligibility, setEligibility] = useState({
    allowed: true,
    policy: false,
  });

  const isComplete = eligibility.allowed && eligibility.policy;

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
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

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border-2 border-blue-950 text-blue-950 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button
            type="button"
            onClick={() => isComplete && onSubmit()}
            disabled={!isComplete}
            className={`flex-1 py-3 rounded-xl font-bold transition shadow-md ${
              isComplete
                ? "bg-blue-900 text-white"
                : "bg-stone-200 text-stone-400"
            }`}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
