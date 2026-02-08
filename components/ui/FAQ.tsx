"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who can become a host on Hostiggo?",
      answer:
        "Anyone who owns or legally manages a property (home, apartment, villa, room, homestay, or guest house) can become a host, provided they comply with local laws and housing regulations.",
    },
    {
      question: "Do I need to register a company to host on Hostiggo?",
      answer:
        "No. You can host as an individual. However, if you manage multiple properties or operate commercially, you may need GST or business registration as per Indian regulations.",
    },
    {
      question: "What documents are required to become a host?",
      answer:
        "You will need a government-issued ID, property ownership or authorization proof, and valid bank account details for receiving payouts.",
    },
    {
      question: "How long does the host verification process take?",
      answer:
        "Host verification usually takes between 24 to 72 hours, depending on document review and verification checks.",
    },
    {
      question: "Is listing my property on Hostiggo free?",
      answer:
        "Yes. Creating an account and listing your property on Hostiggo is free. A service fee is charged only when you receive a booking.",
    },
    {
      question: "Who sets the price of my property?",
      answer:
        "You do. Hosts have full control over pricing, availability, discounts, and minimum stay requirements.",
    },
    {
      question: "Is my bank account information secure?",
      answer:
        "Yes. Hostiggo uses secure and encrypted payment systems, and your bank details are never shared with guests.",
    },
    {
      question: "When and how do I receive my payments?",
      answer:
        "Guests pay Hostiggo at the time of booking, and your payout is released after guest check-in directly to your linked bank account.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-[59px] font-semibold text-black text-center mb-20 tracking-[0.04em] font-poppins">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-0 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="group">
              <div
                className="flex items-center justify-between py-10 cursor-pointer"
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              >
                <p className="text-[#1E1E1E] font-poppins text-[26px] font-medium tracking-[0.03em] leading-[1.6em]">
                  {faq.question}
                </p>

                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-[41px] h-[41px] transition-transform group-hover:translate-y-1 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M10.25 17.0833L20.5 27.3333L30.75 17.0833L28.3583 14.6916L20.5 22.5499L12.6417 14.6916L10.25 17.0833Z"
                    fill="#2A2A2A"
                  />
                </svg>
              </div>
              {openIndex === index && (
                <p className="pb-8 text-[#494949] font-poppins text-[20px] font-medium tracking-[0.02em] leading-[1.7em]">
                  {faq.answer}
                </p>
              )}
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
            <a
              href="https://wa.me/918448337674"
              className="rounded-[55px] bg-[#004772] w-[287px] h-[75px] text-white font-poppins text-[27px] font-medium hover:bg-[#003554] transition-all inline-flex items-center justify-center"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
