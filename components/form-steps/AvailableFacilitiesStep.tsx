"use client";

import React, { useState } from "react";
import {
  Wifi,
  Utensils,
  Wind,
  Flame,
  Tv,
  Car,
  Dog,
  Trees,
  Waves,
  Table,
  Music,
  Dumbbell,
  Bell,
  ShieldAlert,
  PlusSquare,
  Radio,
  ChevronLeft,
  ChefHat,
  Flower2,
  Gamepad2,
} from "lucide-react";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const categories = [
  {
    title: "Guest's First Choices",
    items: [
      { id: "wifi", label: "Wifi", icon: Wifi },
      { id: "kitchen", label: "Kitchen", icon: ChefHat },
      { id: "ac", label: "Air Conditioning", icon: Wind },
      { id: "heating", label: "Heating", icon: Flame },
      { id: "tv", label: "TV", icon: Tv },
      { id: "washing", label: "Washing Machine", icon: Radio },
      { id: "parking", label: "Free Parking", icon: Car },
      { id: "pets", label: "Pets Allowed", icon: Dog },
    ],
  },
  {
    title: "Outdoor & Recreation",
    items: [
      { id: "balcony", label: "Balcony / Patio", icon: Flower2 },
      { id: "garden", label: "Garden", icon: Trees },
      { id: "bbq", label: "BBQ Grill", icon: Flame },
      { id: "dining", label: "Outdoor Dining Area", icon: Table },
      { id: "firepit", label: "Fire Pit", icon: Flame },
      { id: "pool", label: "Pool", icon: Waves },
    ],
  },
  {
    title: "Entertainment & Extras",
    items: [
      { id: "pool_table", label: "Pool Table", icon: Gamepad2 },
      { id: "fireplace", label: "Indoor Fireplace", icon: Flame },
      { id: "piano", label: "Piano", icon: Music },
      { id: "gym", label: "Exercise Equipment", icon: Dumbbell },
    ],
  },
  {
    title: "Safety Essentials",
    items: [
      { id: "smoke", label: "Smoke Alarm", icon: Bell },
      { id: "extinguisher", label: "Fire Extinguisher", icon: ShieldAlert },
      { id: "firstaid", label: "First-aid Kit", icon: PlusSquare },
      { id: "carbon", label: "Carbon Monoxide Alarm", icon: Radio },
    ],
  },
];

export default function AvailableFacilitiesStep({
  formData,
  onNext,
  onBack,
}: Props) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    formData.amenities || []
  );

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ amenities: selectedAmenities });
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities matching unified UI */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sky-500 font-bold text-sm underline decoration-2 underline-offset-4"
          >
            Save & Exit
          </button>
          <button
            type="button"
            className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold"
          >
            Need Help?
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">
            Available Facilities
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Select amenities that your property offers, more amenities will
            appear after you publish your listing.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-10 pb-10">
          {categories.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <h3 className="text-lg font-bold text-blue-950">{cat.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedAmenities.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.id)}
                      className={`p-4 h-32 rounded-2xl border transition flex flex-col items-center justify-center gap-3 ${
                        isSelected
                          ? "border-blue-950 bg-blue-50 shadow-sm"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          isSelected ? "text-blue-950" : "text-stone-600"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span className="text-[11px] text-center font-bold text-blue-950 leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-stone-400 text-xs italic pt-4 pb-10 text-center">
          You can always change this after publish
        </p>
      </div>

      {/* Sticky Bottom Navigation */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (onBack) onBack();
            }}
            className="flex-1 py-3 px-6 border-2 border-blue-950 text-blue-950 rounded-xl font-bold hover:bg-stone-50 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3 px-6 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-950 transition active:scale-95 shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
