"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle, ChevronLeft } from "lucide-react";

interface Bedroom {
  guests: number;
  beds: number;
  bathrooms: number;
}

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function PropertyCapacityStep({
  formData,
  onNext,
  onBack,
}: Props) {
  const [bedrooms, setBedrooms] = useState<Bedroom[]>(
    formData.bedrooms || [{ guests: 2, beds: 1, bathrooms: 1 }]
  );

  const updateBedroom = (idx: number, field: keyof Bedroom, delta: number) => {
    const updated = [...bedrooms];
    const newValue = Math.max(1, updated[idx][field] + delta);
    updated[idx][field] = newValue;
    setBedrooms(updated);
  };

  const addBedroom = () => {
    setBedrooms([...bedrooms, { guests: 2, beds: 1, bathrooms: 1 }]);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ bedrooms });
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        {/* Top Header Utilities */}
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
            Property Capacity
          </h2>
          <p className="text-stone-500 text-sm">
            You can edit these details later after listing your property
          </p>
        </div>

        {/* Bedroom List */}
        <div className="space-y-8">
          {bedrooms.map((bedroom, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="font-bold text-blue-950 text-lg">
                Bedroom {idx + 1}
              </h3>

              <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm space-y-4">
                {/* Max Guests Row */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-700">Max Guests</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "guests", -1)}
                    >
                      <MinusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                    <span className="text-lg font-bold w-4 text-center">
                      {bedroom.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "guests", 1)}
                    >
                      <PlusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-stone-100 w-full" />

                {/* Beds Row */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-700">Beds</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "beds", -1)}
                    >
                      <MinusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                    <span className="text-lg font-bold w-4 text-center">
                      {bedroom.beds}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "beds", 1)}
                    >
                      <PlusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-stone-100 w-full" />

                {/* Bathrooms Row */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-700">Bathrooms</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "bathrooms", -1)}
                    >
                      <MinusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                    <span className="text-lg font-bold w-4 text-center">
                      {bedroom.bathrooms}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateBedroom(idx, "bathrooms", 1)}
                    >
                      <PlusCircle className="w-8 h-8 text-blue-950 fill-blue-950 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addBedroom}
          className="w-fit px-8 py-3 border-2 border-sky-500 text-sky-500 rounded-full font-bold hover:bg-sky-50 transition shadow-sm"
        >
          Add Bedroom +
        </button>

        <p className="text-stone-400 text-xs italic py-6 text-center">
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
