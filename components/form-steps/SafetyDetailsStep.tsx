'use client';

import React, { useState } from "react";
import { Camera, Volume2, ShieldAlert, Bell, ChevronLeft } from "lucide-react";

export default function SafetyDetailsStep({ formData, onNext, onBack }: any) {
  const [safety, setSafety] = useState({
    camera: formData.safety?.camera || true,
    noise: formData.safety?.noise || false,
    weapons: formData.safety?.weapons || false,
    smokeAlarm: formData.safety?.smokeAlarm || false,
  });

  const toggleSafety = (key: string) => {
    setSafety(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ safety });
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <button type="button" className="text-sky-500 font-bold text-sm underline decoration-2 underline-offset-4">Save & Exit</button>
          <button type="button" className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold">Need Help?</button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Safety Details</h2>
          <p className="text-stone-500 text-sm">Guests value transparency. Safety details help build trust</p>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="font-bold text-blue-950">Select what safety features your place provides</h3>
          
          <div className="space-y-6">
            {[
              { id: 'camera', label: 'Exterior security camera', icon: Camera },
              { id: 'noise', label: 'Noise level monitoring device', icon: Volume2 },
              { id: 'weapons', label: 'Weapon(s) on property', icon: ShieldAlert },
              { id: 'smokeAlarm', label: 'Smoke alarm', icon: Bell },
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-stone-700" strokeWidth={1.5} />
                  <span className="text-stone-700 font-medium group-hover:text-blue-950 transition">{item.label}</span>
                </div>
                <input 
                  type="checkbox" checked={safety[item.id as keyof typeof safety]} 
                  onChange={() => toggleSafety(item.id)}
                  className="w-5 h-5 rounded border-stone-300 accent-blue-950" 
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-stone-100 p-4 pb-8 z-50">
        <div className="max-w-md mx-auto flex gap-4">
          <button type="button" onClick={onBack} className="flex-1 py-3 border-2 border-blue-950 text-blue-950 rounded-xl font-bold flex items-center justify-center gap-2">
            <ChevronLeft className="w-5 h-5" /> Back
          </button>
          <button type="button" onClick={handleNext} className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-bold shadow-md">Next</button>
        </div>
      </div>
    </div>
  );
}
