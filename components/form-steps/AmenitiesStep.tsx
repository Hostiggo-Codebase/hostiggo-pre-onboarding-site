'use client';

import React from "react"

import { useState } from 'react';
import { Wifi, Tv, UtensilsCrossed, Feather as Washer, ParkingCircle, Zap, Wind, Shield, Sofa, Coffee, Users, Dog } from 'lucide-react';

interface AmenitiesStepProps {
  formData: any;
  onNext: (data: any) => void;
}

const amenitiesOptions = [
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'tv', label: 'TV', icon: Tv },
  { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
  { id: 'washing_machine', label: 'Washing Machine', icon: Washer },
  { id: 'parking_free', label: 'Free Parking', icon: ParkingCircle },
  { id: 'parking_paid', label: 'Paid Parking', icon: ParkingCircle },
  { id: 'ac', label: 'Air Conditioning', icon: Wind },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'sofa', label: 'Living Room', icon: Sofa },
  { id: 'breakfast', label: 'Breakfast Available', icon: Coffee },
  { id: 'common_area', label: 'Common Areas', icon: Users },
  { id: 'pets', label: 'Pets Allowed', icon: Dog },
];

export default function AmenitiesStep({ formData, onNext }: AmenitiesStepProps) {
  const [amenities, setAmenities] = useState<string[]>(formData.amenities);

  const toggleAmenity = (id: string) => {
    setAmenities((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ amenities });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-light text-blue-950">What Amenities Do You Offer?</h2>
        <p className="text-stone-600">Tell guests what to expect at your property</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenitiesOptions.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggleAmenity(id)}
            className={`p-4 rounded-lg border transition flex flex-col items-center gap-2 ${
              amenities.includes(id)
                  ? 'border-blue-950 bg-blue-950 text-white'
                  : 'border-stone-300 bg-white text-blue-950 hover:border-blue-950'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium text-center">{label}</span>
          </button>
        ))}
      </div>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
        <p className="text-sm text-stone-600">
          💡 You can add more amenities after your listing is approved. For now, select the main ones that set your property apart.
        </p>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-900 transition"
      >
        Continue to Review
      </button>
    </form>
  );
}
