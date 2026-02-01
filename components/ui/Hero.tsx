"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Hero({
  onStartOnboarding,
}: {
  onStartOnboarding: () => void;
}) {
  return (
    /* Added pt-[100px] to prevent navbar from hiding content on mobile */
    <section className="relative w-full min-h-[800px] overflow-hidden bg-[radial-gradient(402.81%_211.6%_at_0%_1.17%,#FFF_0%,#B8E4FF_100%)] flex items-center px-6 lg:px-24 pt-[100px] lg:pt-0">
      {/* Circle for Mobile - Positioned in the top right corner behind the house */}
      <div className="absolute lg:hidden rounded-full opacity-[40%] bg-[#42948D] w-[300px] h-[300px] -right-20 -top-10 blur-3xl" />

      {/* Decorative Background for Desktop */}
      <div className="hidden lg:block absolute rounded-full opacity-[57%] bg-[radial-gradient(126.3%_126.3%_at_9.35%_31.48%,rgba(233,255,253,0.33)_0%,#42948D_100%)] w-[1315px] h-[1315px] -right-[20%] top-[20%]" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Right Image Side - Appears first on mobile using order-1 */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <img
            src="/Cc5cdf28a77c44d9b2abc252d34991522.png"
            alt="3D House"
            className="w-full max-w-[320px] lg:max-w-[527px] drop-shadow-2xl"
          />
        </div>

        {/* Left Content Side - Appears second on mobile using order-2 */}
        <div className="flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-[81px] font-semibold text-black leading-tight">
              Become a host
            </h1>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[#494949] font-semibold text-lg lg:text-xl">
              <span>Add Services</span>
              <span className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full" />
              <span>Manage bookings</span>
              <span className="hidden sm:block w-2 h-2 bg-slate-300 rounded-full" />
              <span>Get Paid Securely</span>
            </div>
            <p className="text-[#828282] text-lg lg:text-xl tracking-[0.27em] font-semibold uppercase pt-2">
              ALL IN ONE PLACE
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center lg:justify-start">
            <button
              className="px-10 py-4 bg-[#004772] text-white rounded-[14px] font-medium text-xl hover:opacity-90 transition-all"
              onClick={onStartOnboarding}
            >
              Get Started
            </button>
            <button className="px-10 py-4 border-2 border-[#004772] text-[#004772] rounded-[14px] font-semibold text-xl flex items-center justify-center gap-2 hover:bg-white/40 transition-all">
              Learn More <ArrowUpRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
