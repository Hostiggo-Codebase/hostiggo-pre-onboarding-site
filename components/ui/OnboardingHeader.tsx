"use client";

import React from "react";
import Link from "next/link";
export default function OnboardingHeader({
  onExit,
  currentStep,
  totalSteps,
}: {
  onExit: () => void;
  currentStep: number;
  totalSteps: number;
}) {
  const progress =
    totalSteps > 0
      ? Math.min(100, Math.max(0, ((currentStep + 1) / totalSteps) * 100))
      : 0;

  return (
    <header className="sticky top-0 left-0 right-0 h-[100px] bg-white z-50 flex items-center relative">
      <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#004772] rounded-full flex items-center justify-center">
            <span className="text-white text-xl sm:text-2xl font-bold font-poppins">
              H
            </span>
          </div>
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#004772] font-poppins">
            Hostiggo
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-6">
          <button
            type="button"
            onClick={onExit}
            className="text-[#0396EF] font-poppins text-[22px] font-semibold leading-[1.28em] tracking-[0.003em] hover:opacity-80 transition-all"
          >
            Save &amp; exit
          </button>
          <button
            type="button"
            className="rounded-[14px] border-2 border-[#004772] w-[216px] h-[60px] flex items-center justify-center text-[#004772] font-poppins text-[22px] font-semibold leading-[1.28em] tracking-[0.003em] hover:bg-[#004772] hover:text-white transition-all"
          >
            Need Help?
          </button>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-[#E6F3FA]">
        <div
          className="h-full bg-[#0086D8] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
