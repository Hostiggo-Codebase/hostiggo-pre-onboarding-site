"use client";

import React, { useState, useRef } from "react";
import { Plus, Lightbulb, X, ChevronLeft } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function PhotoUploadStep({ formData, onNext, onBack }: Props) {
  // Initialize with existing photos or an empty array
  const initialPhotos: (File | string)[] = Array.isArray(formData.photos)
    ? formData.photos.filter(
        (photo: unknown): photo is File | string =>
          typeof photo === "string" || photo instanceof File,
      )
    : [];
  const [photos, setPhotos] = useState<(File | string)[]>(initialPhotos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length >= 3) {
      onNext({ photos });
    }
  };

  // Helper to generate preview URLs for File objects
  const getPreviewUrl = (photo: File | string) => {
    if (typeof photo === "string") return photo;
    if (photo instanceof File) return URL.createObjectURL(photo);
    return "";
  };

  const isNextDisabled = photos.length < 3;

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Property Photos</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Clear photos help guests to understand your space and book with
            confidence
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-stone-800 font-bold text-sm">
            Add at least 3 photos to continue
          </p>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Existing Photo Previews */}
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden border border-stone-100 shadow-sm"
              >
                <img
                  src={getPreviewUrl(photo)}
                  alt={`Upload ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full text-stone-700 hover:text-red-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Add Photo Card */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-stone-50 transition bg-white"
            >
              <div className="text-sky-600">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-blue-950 font-bold text-sm">Add Photo</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />

          {/* Photo Tips Link */}
          <button
            type="button"
            className="flex items-center gap-2 text-sky-500 font-bold text-sm"
          >
            <Lightbulb className="w-4 h-4 fill-sky-100" />
            <span className="underline decoration-1 underline-offset-4">
              Photo Tips
            </span>
          </button>
        </div>

        <p className="text-stone-400 text-xs italic pt-10 text-center">
          You can always change this after publish
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (onBack) onBack();
          }}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className={`w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition ${
            !isNextDisabled
              ? "bg-[#004772] hover:bg-[#003656] shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
      {isNextDisabled && (
        <p className="mt-2 text-center text-xs sm:text-sm text-red-500">
          Upload at least 3 photos to continue.
        </p>
      )}
    </OnboardingStepLayout>
  );
}
