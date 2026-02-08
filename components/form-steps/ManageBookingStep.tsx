"use client";

import React, { useState } from "react";
import { ChevronLeft, ClipboardList, Rocket } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

export default function ManageBookingStep({ formData, onNext, onBack }: any) {
  const [type, setType] = useState(formData.bookingManagementType || "request");

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-950">
          How Would You Like To Manage Bookings?
        </h2>

        <div className="space-y-4">
          {[
            {
              id: "request",
              label: "Request approval",
              sub: "Host review and approve booking requests before confirmation",
              tags: "New hosts, Selective stays",
              icon: ClipboardList,
            },
            {
              id: "auto",
              label: "Auto accept bookings",
              sub: "Bookings are confirmed instantly if requirements are met",
              tags: "Hosts who wants faster bookings",
              icon: Rocket,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              className={`w-full text-left p-4 rounded-2xl border transition ${type === item.id ? "border-blue-950 bg-blue-50" : "border-stone-200 bg-white"}`}
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-8 h-8 text-stone-700" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-950 text-lg">
                      {item.label}
                    </p>
                    {type === item.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center text-white text-[10px]">
                        ✓
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{item.sub}</p>
                  <p className="text-[10px] mt-2 font-bold text-blue-900 underline decoration-stone-200">
                    Good for :
                  </p>
                  <p className="text-[10px] text-stone-500">{item.tags}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          onClick={onBack}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={() => onNext({ bookingManagementType: type })}
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
