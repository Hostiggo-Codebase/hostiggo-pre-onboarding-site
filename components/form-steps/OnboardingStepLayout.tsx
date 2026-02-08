"use client";

import React from "react";

export default function OnboardingStepLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-visible font-poppins">
      <div className="absolute left-[-200px] top-[10%] w-[1032px] h-[923px] rounded-full opacity-[40%] bg-[radial-gradient(circle,#E9FFFD_0%,#42948D_100%)] blur-3xl -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-8 lg:px-28 pt-12 pb-32">
        <div className="mx-auto w-full max-w-[920px] text-[17px] sm:text-[18px] leading-relaxed flex min-h-[calc(100vh-8rem)] flex-col [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_.onboarding-footer]:mt-auto [&_.onboarding-footer]:pt-6 [&_.onboarding-footer]:pb-6 [&_.onboarding-footer]:border-t [&_.onboarding-footer]:border-stone-100 [&_.onboarding-footer]:sticky [&_.onboarding-footer]:bottom-0 [&_.onboarding-footer]:bg-white/90 [&_.onboarding-footer]:backdrop-blur-sm [&_.onboarding-footer>button]:w-full sm:[&_.onboarding-footer>button]:w-[259px]">
          {children}
        </div>
      </div>
    </div>
  );
}
