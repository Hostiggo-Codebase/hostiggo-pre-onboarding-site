"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[100px] bg-white z-50 border-b-8 border-[#0086D8] flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#004772] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold font-poppins">
              H
            </span>
          </div>
          <span className="text-3xl font-bold tracking-tight text-[#004772] font-poppins">
            Hostiggo
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {/* Section Anchors */}
          <a
            href="#why"
            className="text-[#004772] font-poppins text-[27px] font-semibold hover:opacity-70 transition-all"
          >
            Why Hostiggo?
          </a>
          <a
            href="#how"
            className="text-[#004772] font-poppins text-[27px] font-semibold hover:opacity-70 transition-all"
          >
            How it works?
          </a>
        </nav>

        <button className="rounded-[14px] border-2 border-[#004772] w-[210px] h-[77px] flex items-center justify-center text-[#004772] font-poppins text-[27px] font-semibold hover:bg-[#004772] hover:text-white transition-all">
          Sign In
        </button>
      </div>
    </header>
  );
}
