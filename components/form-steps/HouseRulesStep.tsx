"use client";

import React, { useState } from "react";
import {
  Cigarette,
  PawPrint,
  PartyPopper,
  Moon,
  ChevronLeft,
} from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

export default function HouseRulesStep({ formData, onNext, onBack }: any) {
  const [rules, setRules] = useState({
    checkIn: formData.checkInTime || "00:00",
    checkOut: formData.checkOutTime || "00:00",
    smoking: formData.rules?.smoking || true,
    pets: formData.rules?.pets || false,
    parties: formData.rules?.parties || false,
    quietHours: formData.rules?.quietHours || false,
  });

  const toggleRule = (key: string) => {
    setRules((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      checkInTime: rules.checkIn,
      checkOutTime: rules.checkOut,
      rules,
    });
  };

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Set House Rules</h2>
          <p className="text-stone-500 text-sm">
            Clear rules help avoid misunderstandings with guests
          </p>
        </div>

        {/* Time Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-stone-500 text-sm font-medium">
              Check-in time
            </label>
            <input
              type="time"
              value={rules.checkIn}
              onChange={(e) => setRules({ ...rules, checkIn: e.target.value })}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 text-stone-400 font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-stone-500 text-sm font-medium">
              Check-out time
            </label>
            <input
              type="time"
              value={rules.checkOut}
              onChange={(e) => setRules({ ...rules, checkOut: e.target.value })}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 text-stone-400 font-medium"
            />
          </div>
        </div>

        <div className="h-px bg-stone-100 w-full" />

        {/* Rules Selection List */}
        <div className="space-y-4">
          <h3 className="font-bold text-blue-950">
            Select what's allowed at your place
          </h3>

          <div className="space-y-3">
            {[
              { id: "smoking", label: "Smoking Allowed", icon: Cigarette },
              { id: "pets", label: "Pets Allowed", icon: PawPrint },
              {
                id: "parties",
                label: "Parties Events Allowed",
                icon: PartyPopper,
              },
              {
                id: "quietHours",
                label: "Quiet Hours",
                icon: Moon,
                sub: "Between 10:00 PM and 8:00 AM",
              },
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
                  <div>
                    <p className="text-stone-700 font-medium group-hover:text-blue-950 transition">
                      {item.label}
                    </p>
                    {item.sub && (
                      <p className="text-sky-500 text-[10px] font-bold">
                        {item.sub}
                      </p>
                    )}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={rules[item.id as keyof typeof rules] as boolean}
                  onChange={() => toggleRule(item.id)}
                  className="w-5 h-5 rounded border-stone-300 accent-blue-950"
                />
              </label>
            ))}
          </div>
        </div>

        <p className="text-stone-400 text-xs italic text-center pt-10">
          You can always change this after publish
        </p>
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
