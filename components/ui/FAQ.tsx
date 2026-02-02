"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    "Who can become a host on Hostiggo?",
    "Do i need to register a company to host on Hostiggo?",
    "When and how do i receive my payments",
    "Is my back account information secure",
    "How does Hostiggo prevent fake bookings and fraud",
    "What if a guest damages my property",
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-[59px] font-semibold text-black text-center mb-20 tracking-[0.04em] font-poppins">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-0 max-w-5xl mx-auto">
          {faqs.map((question, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between py-10 cursor-pointer">
                <p className="text-[#1E1E1E] font-poppins text-[26px] font-medium tracking-[0.03em] leading-[1.6em]">
                  {question}
                </p>

                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[41px] h-[41px] transition-transform group-hover:translate-y-1"
                >
                  <path
                    d="M10.25 17.0833L20.5 27.3333L30.75 17.0833L28.3583 14.6916L20.5 22.5499L12.6417 14.6916L10.25 17.0833Z"
                    fill="#2A2A2A"
                  />
                </svg>
              </div>
              {/* Divider Line from your code */}
              <div className="w-full h-px bg-black opacity-[34%]" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-32 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-[#3A3A3A] font-poppins text-[38px] font-semibold tracking-[0.03em]">
              Still have questions?
            </h3>
            <p className="text-[#494949] font-poppins text-[23px] font-medium tracking-[0.03em]">
              Our support team is here to help
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button className="rounded-[55px] bg-[#004772] w-[287px] h-[75px] text-white font-poppins text-[27px] font-medium hover:bg-[#003554] transition-all">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
