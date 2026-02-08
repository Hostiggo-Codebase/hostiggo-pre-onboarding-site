"use client";

import React, { useState } from "react";
import { Camera, Volume2, ShieldAlert, Bell, ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

export default function SafetyDetailsStep({ formData, onNext, onBack }: any) {
  const [safety, setSafety] = useState({
    camera: formData.safety?.camera || true,
    noise: formData.safety?.noise || false,
    weapons: formData.safety?.weapons || false,
    smokeAlarm: formData.safety?.smokeAlarm || false,
  });

  const toggleSafety = (key: string) => {
    setSafety((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ safety });
  };

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Safety Details</h2>
          <p className="text-stone-500 text-sm">
            Guests value transparency. Safety details help build trust
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-blue-950">
            Select what safety features your place provides
          </h3>

          <div className="space-y-6">
            {[
              { id: "camera", label: "Exterior security camera", icon: Camera },
              {
                id: "noise",
                label: "Noise level monitoring device",
                icon: Volume2,
              },
              {
                id: "weapons",
                label: "Weapon(s) on property",
                icon: ShieldAlert,
              },
              { id: "smokeAlarm", label: "Smoke alarm", icon: Bell },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    className="w-5 h-5 text-stone-700"
                    strokeWidth={1.5}
                  />
                  <span className="text-stone-700 font-medium group-hover:text-blue-950 transition">
                    {item.label}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={safety[item.id as keyof typeof safety]}
                  onChange={() => toggleSafety(item.id)}
                  className="w-5 h-5 rounded border-stone-300 accent-blue-950"
                />
              </label>
            ))}
          </div>
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
          onClick={handleNext}
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
