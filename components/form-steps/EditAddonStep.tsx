"use client";

import React, { useState } from "react";
import { Coffee, Plus, Info, ChevronLeft } from "lucide-react";

export default function EditAddonStep({ addon, onSave, onBack }: any) {
  const [price, setPrice] = useState(addon?.price || 200);
  const [includes, setIncludes] = useState(
    addon?.includes || "Tea and sandwiches"
  );
  const [startTime, setStartTime] = useState(addon?.timings?.from || "08:00");
  const [endTime, setEndTime] = useState(addon?.timings?.to || "10:00");

  // Requirement: Remove pre-added label, initialize as empty array
  const [extraDetails, setExtraDetails] = useState<any[]>(
    addon?.extraDetails || []
  );

  const addDetail = () => {
    setExtraDetails([...extraDetails, { label: "", value: "" }]);
  };

  const updateDetail = (index: number, field: string, text: string) => {
    const updated = [...extraDetails];
    updated[index][field] = text;
    setExtraDetails(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const hasError = extraDetails.some((d) => !d.label.trim());
    if (hasError) return;

    onSave({
      ...addon,
      price,
      includes,
      timings: { from: startTime, to: endTime },
      extraDetails, // Persists to OnboardingForm formData
    });
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-950">Edit add-ons</h2>
          <button
            type="button"
            className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold"
          >
            Need Help?
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Coffee className="w-6 h-6 text-stone-700" />
          <span className="text-xl font-bold text-blue-950">Breakfast</span>
        </div>

        <div className="bg-stone-50/50 rounded-3xl p-6 border border-stone-100 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <label className="font-bold text-blue-950 w-24">Price</label>
            <div className="flex items-center flex-1">
              <div className="flex items-center px-4 py-2 border border-stone-300 rounded-xl bg-white focus-within:ring-1 focus-within:ring-sky-500 transition">
                <span className="mr-2 text-stone-600 font-bold">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-16 focus:outline-none font-bold text-stone-800"
                />
              </div>
              <span className="ml-3 text-stone-400 text-sm font-medium">
                / person / day
              </span>
            </div>
          </div>

          <div className="h-px bg-stone-200 w-full" />

          <div className="flex items-center justify-between gap-4">
            <label className="font-bold text-blue-950 w-24">Includes</label>
            <input
              type="text"
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              className="flex-1 px-4 py-3 border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium text-stone-700"
            />
          </div>

          <div className="h-px bg-stone-200 w-full" />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label className="font-bold text-blue-950 w-24">Timings</label>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 text-sm font-medium">
                    From
                  </span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none text-blue-950 font-bold"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500 text-sm font-bold pl-8">
                    TO
                  </span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-xl bg-white focus:outline-none text-blue-950 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-200 w-full" />

          {/* Dynamic Details: Only renders if extraDetails has items */}
          <div className="space-y-4">
            {extraDetails.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Label"
                    value={detail.label}
                    onChange={(e) =>
                      updateDetail(index, "label", e.target.value)
                    }
                    className={`w-28 px-4 py-2 border rounded-xl focus:outline-none text-sm font-bold ${
                      !detail.label ? "border-red-400" : "border-stone-300"
                    }`}
                  />
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) =>
                      updateDetail(index, "value", e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-stone-300 rounded-xl focus:outline-none text-sm text-stone-600 font-medium"
                  />
                </div>
                {!detail.label && (
                  <p className="text-red-500 text-[11px] font-bold flex items-center gap-1 ml-1">
                    <Info className="w-3 h-3 fill-red-500 text-white" />
                    Label can't be empty
                  </p>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addDetail}
              className="flex items-center gap-2 text-sky-500 font-bold text-sm pt-2"
            >
              <Plus className="w-4 h-4" />
              <span className="underline decoration-1 underline-offset-4">
                Add another detail
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 mt-auto z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border-2 border-blue-950 text-blue-950 rounded-xl font-bold flex justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
