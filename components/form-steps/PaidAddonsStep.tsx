"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Edit2,
  ChevronLeft,
  Plus,
  PlusCircle,
} from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
  onEdit: (id: string) => void;
  categories: {
    name: string;
    items: {
      id: string;
      label: string;
      icon: any;
      details?: any;
    }[];
  }[];
  setCategories: React.Dispatch<React.SetStateAction<{
    name: string;
    items: {
      id: string;
      label: string;
      icon: any;
      details?: any;
    }[];
  }[]>>;
}

export default function PaidAddonsStep({
  formData,
  onNext,
  onBack,
  onEdit,
  categories,
  setCategories,
}: Props) {
  const [selectedAddons, setSelectedAddons] = useState<Record<string, any>>(
    formData.paidAddons || {},
  );

  // const [categories, setCategories] = useState(CATEGORIES);
  const [selectingCustomAddon, setSelectingCustomAddon] = useState(false);
  const [customAddonName, setCustomAddonName] = useState("");
  const [customAddonError, setCustomAddonError] = useState<string | null>(null);

  const toggleAddon = (id: string, defaultDetails?: any) => {
    setSelectedAddons((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = {
          id,
          enabled: true,
          price: defaultDetails?.price || 500,
          includes: defaultDetails?.includes || "Not specified",
          timings: defaultDetails?.timings || "Not set",
          extraDetails: [],
        };
      }
      return updated;
    });
  };

  const formatTimings = (timings: any) => {
    if (!timings) return "Not set";
    if (typeof timings === "object" && timings.from && timings.to) {
      return `${timings.from} - ${timings.to}`;
    }
    return timings;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ paidAddons: selectedAddons });
  };

  const handleAddCustomAddon = () => {
    if (!selectingCustomAddon) setSelectingCustomAddon(true);
    else {
      const newAddonId = customAddonName.trim();

      if (!newAddonId) return; // ignore empty input

      // Check for duplicate across all categories
      const isDuplicate = categories.some((cat) =>
        cat.items.some((item) => item.id === newAddonId)
      );

      if (isDuplicate) {
        setCustomAddonError("An add-on with this name already exists.");
        return;
      }

      setCustomAddonError(null);

      setCategories((prev) =>
        prev.map((cat) => {
          if (cat.name === "Custom Add-on (You can define your own add-on with custom details)") {
            return {
              ...cat,
              items: [
                ...cat.items,
                {
                  id: newAddonId,
                  label: customAddonName.trim(),
                  icon: PlusCircle,
                },
              ],
            };
          }
          return cat;
        })
      );
      toggleAddon(newAddonId, { price: 500, includes: "Not specified", timings: "Not set" }); // auto-select the newly added custom add-on
      setCustomAddonName("");
      setSelectingCustomAddon(false);
    }
  };

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">
            Service Add-ons (optional)
          </h2>
          <p className="text-stone-500 text-sm leading-tight">
            you can earn more by providing some services to guests, you can
            change add-ons prices
          </p>
          <button
            type="button"
            className="flex items-center gap-2 text-sky-500 font-bold text-sm pt-2"
          >
            <Lightbulb className="w-4 h-4 fill-sky-100" />
            <span className="underline decoration-1 underline-offset-4">
              How Add-ons Work?
            </span>
          </button>
        </div>

        {/* Categories and Add-on Cards */}
        <div className="space-y-10 pb-4">
          {categories.filter((cat) => 
              !(cat.name === "Custom Add-on (You can define your own add-on with custom details)" && cat.items.length === 0)
            ).map((cat) => (
            <div key={cat.name} className="space-y-4">
              <h3 className="text-lg font-bold text-blue-950">{cat.name}</h3>
              <div className="space-y-3">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = !!selectedAddons[item.id];
                  const details = selectedAddons[item.id];

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border transition ${
                        isSelected
                          ? "border-blue-950 bg-blue-50 shadow-sm"
                          : "border-stone-200 bg-white"
                      }`}
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Icon
                            className="w-6 h-6 text-stone-700"
                            strokeWidth={1.5}
                          />
                          <span className="font-bold text-blue-950">
                            {item.label}
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleAddon(item.id, item.details)}
                          className="w-5 h-5 rounded border-stone-300 accent-blue-950 cursor-pointer"
                        />
                      </div>

                      {/* Detail view for ANY selected item */}
                      {isSelected && (
                        <div className="px-4 pb-4 ml-10 space-y-2 border-t border-blue-100 pt-3">
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <span className="font-bold text-blue-950">
                              Price
                            </span>
                            <span className="text-stone-600">
                              ₹{details.price} / person / day
                            </span>

                            <span className="font-bold text-blue-950">
                              Includes
                            </span>
                            <span className="text-stone-600 truncate">
                              {details.includes}
                            </span>

                            <span className="font-bold text-blue-950">
                              Timings
                            </span>
                            <span className="text-stone-600">
                              {formatTimings(details.timings)}
                            </span>
                          </div>

                          {cat.name === "Food & Dining" && (
                            <p className="text-[10px] text-stone-400 italic">
                              "Please inform Dietary preferences in advance"
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() => onEdit(item.id)}
                            className="flex items-center gap-1 text-sky-500 text-xs font-bold pt-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span className="underline decoration-1">
                              Edit Details
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!selectingCustomAddon && (
        <button
          type="button"
          onClick={handleAddCustomAddon}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-dashed border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Custom Add-on
        </button>
        )}

        {selectingCustomAddon && (
          <div className="flex items-center gap-3 mt-4 px-1">
            <input
              type="text"
              placeholder="Enter custom add-on name..."
              value={customAddonName}
              onChange={(e) => setCustomAddonName(e.target.value)}
              className="flex-1 h-[52px] rounded-[14px] border-2 border-[#004772] px-4 text-[#004772] text-base font-medium placeholder:text-[#004772]/40 focus:outline-none focus:ring-2 focus:ring-[#004772]/30 transition"
            />
            <button
              type="button"
              onClick={handleAddCustomAddon}
              className="h-[52px] px-6 rounded-[14px] bg-[#004772] text-white text-base font-semibold hover:bg-[#003656] shadow-lg transition"
            >
              Add
            </button>
          </div>
        )}

        {customAddonError && (
          <p className="text-red-500 text-sm mt-1 px-1">{customAddonError}</p>
        )}

        <p className="text-stone-400 text-xs text-center py-10 leading-relaxed max-w-[250px] mx-auto">
          More options will be available after you publish your listing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onBack) onBack();
          }}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Next
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
