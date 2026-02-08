"use client";

import React from "react";

export default function HowItWorks({
  onStartOnboarding,
}: {
  onStartOnboarding: () => void;
}) {
  const steps = [
    {
      n: "1",
      t: "Create your listing",
      d: "Add photos, pricing rules & amenities",
    },
    {
      n: "2",
      t: "Get Bookings",
      d: "Approve manually or enable instant booking",
    },
    { n: "3", t: "Get Paid", d: "Payouts directly to your account" },
  ];

  return (
    <section
      className="relative py-24 px-6 bg-[#EFF7FF] overflow-hidden"
      id="how"
    >
      {/* FIXED APPLE CIRCLE: 
          1. Added a background color (bg-[#42948D]) 
          2. Changed top/left to keep it within the section container
          3. Added blur for the 'glow' effect seen in your design
      */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-[#42948D] opacity-[20%] blur-3xl left-[-100px] top-[10%] z-0"
        id="apple"
      ></div>
      <div
        className="absolute rounded-full bg-[#BEE7FF] opacity-70 blur-2xl w-[220px] h-[220px] -bottom-24 left-0 sm:left-8 lg:w-[420px] lg:h-[420px] lg:-bottom-40 lg:left-24 z-0"
        aria-hidden="true"
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-[59px] font-bold text-[#004772] tracking-[0.04em]">
            How Host Onboarding Works?
          </h2>
          <p className="text-xl lg:text-[29px] font-medium tracking-[0.27em] uppercase text-[#323232]">
            Start earning in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex items-center gap-8 bg-white p-8 rounded-[43px] border border-[#A2A2A2] shadow-sm"
              >
                <span className="text-6xl lg:text-[110px] font-extrabold text-[#004772] leading-none">
                  {step.n}
                </span>
                <div className="space-y-2">
                  <h4 className="text-2xl lg:text-[38px] font-semibold text-[#3A3A3A]">
                    {step.t}
                  </h4>
                  <p className="text-lg lg:text-[23px] text-[#494949] leading-tight">
                    {step.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute rounded-full opacity-[57%] bg-[radial-gradient(126.3%_126.3%_at_9.35%_31.48%,rgba(233,255,253,0.33)_0%,#42948D_100%)] w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] -right-10 lg:-right-20" />
            <img
              src="/254b250221134658a25aea837e5f7cd52.png"
              alt="Rocket Onboarding"
              className="relative hidden lg:block w-full max-w-[555px] h-auto drop-shadow-xl z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
