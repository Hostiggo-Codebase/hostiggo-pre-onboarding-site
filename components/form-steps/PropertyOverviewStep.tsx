"use client";

import React from "react";

import { useState } from "react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface PropertyOverviewStepProps {
  formData: any;
  onNext: (data: any) => void;
}

const propertyTypes = [
  "House",
  "Flat/Apartment",
  "Villa",
  "Cottage",
  "Hostel",
  "Guest House",
  "Other",
];
const priceRanges = [
  "₹1,000 - ₹2,500",
  "₹2,500 - ₹5,000",
  "₹5,000 - ₹10,000",
  "₹10,000+",
];

export default function PropertyOverviewStep({
  formData,
  onNext,
}: PropertyOverviewStepProps) {
  const [propertyType, setPropertyType] = useState(formData.propertyType);
  const [area, setArea] = useState(formData.propertyArea);
  const [bedrooms, setBedrooms] = useState(formData.bedrooms);
  const [priceRange, setPriceRange] = useState(formData.priceRange);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!propertyType) newErrors.propertyType = "Property type is required";
    if (!area.trim()) newErrors.area = "Area/Location is required";
    if (bedrooms < 1) newErrors.bedrooms = "At least 1 bedroom required";
    if (!priceRange) newErrors.priceRange = "Price range is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ propertyType, propertyArea: area, bedrooms, priceRange });
    }
  };

  return (
    <OnboardingStepLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-light text-blue-950">
            Tell Us About Your Property
          </h2>
          <p className="text-stone-600">
            Help us understand what you're listing
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-3">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`p-3 rounded-lg border transition text-sm font-medium ${
                    propertyType === type
                      ? "border-blue-950 bg-blue-950 text-white"
                      : "border-stone-300 bg-white text-blue-950 hover:border-blue-950"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.propertyType && (
              <p className="text-sm text-red-500 mt-2">{errors.propertyType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-950 mb-2">
              Area/Locality/Neighborhood
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. Mumbai, Lower Parel"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
            />
            {errors.area && (
              <p className="text-sm text-red-500 mt-1">{errors.area}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-950 mb-2">
              Number of Bedrooms
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-50"
              >
                −
              </button>
              <span className="text-2xl font-light w-12 text-center">
                {bedrooms}
              </span>
              <button
                type="button"
                onClick={() => setBedrooms(bedrooms + 1)}
                className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center hover:bg-stone-50"
              >
                +
              </button>
            </div>
            {errors.bedrooms && (
              <p className="text-sm text-red-500 mt-2">{errors.bedrooms}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-950 mb-3">
              Estimated Nightly Price Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setPriceRange(range)}
                  className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                    priceRange === range
                      ? "border-blue-950 bg-blue-950 text-white"
                      : "border-stone-300 bg-white text-blue-950 hover:border-blue-950"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            {errors.priceRange && (
              <p className="text-sm text-red-500 mt-2">{errors.priceRange}</p>
            )}
          </div>
        </div>

        <div className="onboarding-footer flex justify-center mt-10">
          <button
            type="submit"
            className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
          >
            Continue to Amenities
          </button>
        </div>
      </form>
    </OnboardingStepLayout>
  );
}
