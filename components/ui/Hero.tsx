"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
export default function Hero({
  onStartOnboarding,
}: {
  onStartOnboarding: () => void;
}) {
  return (
    <section className="relative w-full min-h-[800px] overflow-hidden bg-[radial-gradient(402.81%_211.6%_at_0%_1.17%,#FFF_0%,#B8E4FF_100%)] flex items-center px-6 lg:px-24">
      {/* Decorative Background Elements */}
      <div className="absolute rounded-full opacity-[57%] bg-[radial-gradient(126.3%_126.3%_at_9.35%_31.48%,rgba(233,255,253,0.33)_0%,#42948D_100%)] w-[1315px] h-[1315px] -right-[20%] top-[20%]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <h1 className="text-7xl lg:text-[91px] font-semibold text-black leading-tight">
              Become a host
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#494949] font-semibold text-xl">
              <span>Add Services</span>
              <span className="w-2 h-2 bg-slate-300 rounded-full" />
              <span>Manage bookings</span>
              <span className="w-2 h-2 bg-slate-300 rounded-full" />
              <span>Get Paid Securely</span>
            </div>
            <p className="text-[#828282] text-xl tracking-[0.27em] font-semibold uppercase pt-2">
              ALL IN ONE PLACE
            </p>
          </div>

          <div className="flex flex-row gap-6 pt-4">
            <button
              className="px-10 py-4 bg-[#004772] text-white rounded-[14px] font-medium text-xl hover:opacity-90 transition-all"
              onClick={onStartOnboarding}
            >
              Get Started
            </button>
            <button className="px-10 py-4 border-2 border-[#004772] text-[#004772] rounded-[14px] font-semibold text-xl flex items-center gap-2 hover:bg-white/40 transition-all">
              Learn More <ArrowUpRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/Cc5cdf28a77c44d9b2abc252d34991522.png"
            alt="3D House"
            className="w-full max-w-[527px] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
