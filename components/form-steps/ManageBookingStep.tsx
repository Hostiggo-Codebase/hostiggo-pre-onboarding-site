'use client';

import React, { useState } from "react";
import { ChevronLeft, ClipboardList, Rocket } from "lucide-react";

export default function ManageBookingStep({ formData, onNext, onBack }: any) {
  const [type, setType] = useState(formData.bookingManagementType || 'request');

  return (
    <div className="max-w-md mx-auto relative min-h-screen flex flex-col bg-white">
      <div className="p-4 space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <button type="button" className="text-sky-500 font-bold text-sm underline decoration-2 underline-offset-4">Save & Exit</button>
          <button type="button" className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold">Need Help?</button>
        </div>

        <h2 className="text-2xl font-bold text-blue-950">How Would You Like To Manage Bookings?</h2>

        <div className="space-y-4">
          {[
            { id: 'request', label: 'Request approval', sub: 'Host review and approve booking requests before confirmation', tags: 'New hosts, Selective stays', icon: ClipboardList },
            { id: 'auto', label: 'Auto accept bookings', sub: 'Bookings are confirmed instantly if requirements are met', tags: 'Hosts who wants faster bookings', icon: Rocket },
          ].map((item) => (
            <button key={item.id} onClick={() => setType(item.id)} className={`w-full text-left p-4 rounded-2xl border transition ${type === item.id ? 'border-blue-950 bg-blue-50' : 'border-stone-200 bg-white'}`}>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center flex-shrink-0"><item.icon className="w-8 h-8 text-stone-700" /></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-blue-950 text-lg">{item.label}</p>
                    {type === item.id && <div className="w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center text-white text-[10px]">✓</div>}
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{item.sub}</p>
                  <p className="text-[10px] mt-2 font-bold text-blue-900 underline decoration-stone-200">Good for :</p>
                  <p className="text-[10px] text-stone-500">{item.tags}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 p-4 border-t flex gap-4">
        <button onClick={onBack} className="flex-1 py-3 border-2 border-blue-950 text-blue-950 rounded-xl font-bold flex justify-center gap-2"><ChevronLeft /> Back</button>
        <button onClick={() => onNext({ bookingManagementType: type })} className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-bold shadow-md">Next</button>
      </div>
    </div>
  );
}
