"use client";

import React, { useState, useRef } from "react";
import { Plus, Lightbulb, X, ChevronLeft } from "lucide-react";

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function PhotoUploadStep({ formData, onNext, onBack }: Props) {
  // Initialize with existing photos or an empty array
  const [photos, setPhotos] = useState<(File | string)[]>(
    formData.photos || []
  );
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
    return URL.createObjectURL(photo);
  };

  const isNextDisabled = photos.length < 3;

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
            disabled={isNextDisabled}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition active:scale-95 shadow-md ${
              !isNextDisabled
                ? "bg-blue-900 text-white hover:bg-blue-950"
                : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
