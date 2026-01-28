'use client';

import React, { useState } from "react";
import { Cigarette, PawPrint, PartyPopper, Moon, ChevronLeft } from "lucide-react";

export default function HouseRulesStep({ formData, onNext, onBack }: any) {
  const [rules, setRules] = useState({
    checkIn: formData.checkInTime || "00:00",
    checkOut: formData.checkOutTime || "00:00",
    smoking: formData.rules?.smoking || true,
    pets: formData.rules?.pets || false,
    parties: formData.rules?.parties || false,
    quietHours: formData.rules?.quietHours || false,
  });

  const toggleRule = (key: string) => {
    setRules(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      checkInTime: rules.checkIn, 
      checkOutTime: rules.checkOut, 
      rules 
    });
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
        {/* Header Utilities */}
        <div className="flex justify-between items-center">
          <button type="button" className="text-sky-500 font-bold text-sm underline decoration-2 underline-offset-4">Save & Exit</button>
          <button type="button" className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold">Need Help?</button>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-950">Set House Rules</h2>
          <p className="text-stone-500 text-sm">Clear rules help avoid misunderstandings with guests</p>
        </div>

        {/* Time Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-stone-500 text-sm font-medium">Check-in time</label>
            <input 
              type="time" value={rules.checkIn} 
              onChange={(e) => setRules({...rules, checkIn: e.target.value})}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 text-stone-400 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-stone-500 text-sm font-medium">Check-out time</label>
            <input 
              type="time" value={rules.checkOut} 
              onChange={(e) => setRules({...rules, checkOut: e.target.value})}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-950 text-stone-400 font-medium" 
            />
          </div>
        </div>

        <div className="h-px bg-stone-100 w-full" />

        {/* Rules Selection List */}
        <div className="space-y-4">
          <h3 className="font-bold text-blue-950">Select what's allowed at your place</h3>
          
          <div className="space-y-3">
            {[
              { id: 'smoking', label: 'Smoking Allowed', icon: Cigarette },
              { id: 'pets', label: 'Pets Allowed', icon: PawPrint },
              { id: 'parties', label: 'Parties Events Allowed', icon: PartyPopper },
              { id: 'quietHours', label: 'Quiet Hours', icon: Moon, sub: 'Between 10:00 PM and 8:00 AM' },
            ].map((item) => (
              <label key={item.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-stone-700" strokeWidth={1.5} />
                  <div>
                    <p className="text-stone-700 font-medium group-hover:text-blue-950 transition">{item.label}</p>
                    {item.sub && <p className="text-sky-500 text-[10px] font-bold">{item.sub}</p>}
                  </div>
                </div>
                <input 
                  type="checkbox" checked={rules[item.id as keyof typeof rules] as boolean} 
                  onChange={() => toggleRule(item.id)}
                  className="w-5 h-5 rounded border-stone-300 accent-blue-950" 
                />
              </label>
            ))}
          </div>
        </div>

        <p className="text-stone-400 text-xs italic text-center pt-10">You can always change this after publish</p>
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
