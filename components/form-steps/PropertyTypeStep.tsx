"use client";

import React, { useState } from "react";
import { NavigationButtons } from "./NavigationButtons";
import OnboardingStepLayout from "./OnboardingStepLayout";
import {
  Home,
  Building2,
  Warehouse,
  Hotel,
  Coffee,
  Tent,
  TreePine,
  Castle,
  Ship,
  Car,
  Mountain,
  Landmark,
  TentTree,
  Search,
  Box,
  Tractor,
} from "lucide-react";

// --- Reusable Form Card Component ---
const FormCard = ({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: any;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-4 ${
      selected
        ? "border-blue-950 bg-blue-50 shadow-sm"
        : "border-stone-200 bg-white hover:border-stone-300"
    }`}
  >
    <div className="text-stone-700 flex-shrink-0">
      <Icon size={32} strokeWidth={1.2} />
    </div>
    <div className="flex-1">
      <p className="font-bold text-blue-950 text-base">{title}</p>
      <p className="text-[12px] text-stone-500 leading-tight mt-0.5">
        {description}
      </p>
    </div>
  </button>
);

const propertyCategories = [
  {
    group: "Popular",
    items: [
      {
        id: "house",
        label: "House",
        desc: "A standalone home with private indoor spaces",
        icon: Home,
      },
      {
        id: "apartment",
        label: "Apartment / Flat",
        desc: "A private unit within a residential building",
        icon: Building2,
      },
      {
        id: "guesthouse",
        label: "Guest House",
        desc: "A separate property designed for hosting guests",
        icon: Warehouse,
      },
      {
        id: "hotel",
        label: "Hotel",
        desc: "A professionally managed property with multiple rooms",
        icon: Hotel,
      },
      {
        id: "bnb",
        label: "Bed and Breakfast",
        desc: "A hosted stay where breakfast is provided",
        icon: Coffee,
      },
    ],
  },
  {
    group: "Unique Stays",
    items: [
      {
        id: "cabin",
        label: "Cabin",
        desc: "A compact home, often surrounded by nature",
        icon: TentTree,
      },
      {
        id: "cottage",
        label: "Cottage",
        desc: "A cozy home, usually in a quiet or rural setting",
        icon: TreePine,
      },
      {
        id: "villa",
        label: "Villa",
        desc: "A spacious property with premium amenities",
        icon: Landmark,
      },
      {
        id: "farmstay",
        label: "Farm Stay",
        desc: "A stay located on or near a working farm",
        icon: Tractor,
      },
      {
        id: "treehouse",
        label: "Tree House",
        desc: "A raised structure built among trees",
        icon: TreePine,
      },
      {
        id: "tent",
        label: "Tent",
        desc: "A temporary outdoor accommodation",
        icon: Tent,
      },
      {
        id: "tinyhome",
        label: "Tiny Home",
        desc: "A small, fully functional living space",
        icon: Box,
      },
    ],
  },
  {
    group: "Specialty",
    items: [
      {
        id: "boat",
        label: "Boat / Houseboat",
        desc: "A floating accommodation on water",
        icon: Ship,
      },
      {
        id: "campervan",
        label: "Campervan / Motorhome",
        desc: "A mobile stay designed for travel and living",
        icon: Car,
      },
      {
        id: "castle",
        label: "Castle",
        desc: "A historic property with distinctive architecture",
        icon: Castle,
      },
      {
        id: "dome",
        label: "Dome",
        desc: "A rounded structure with unique interior layout",
        icon: Warehouse,
      },
      {
        id: "yurt",
        label: "Yurt",
        desc: "A circular tent-style structure with modern comforts",
        icon: Tent,
      },
      {
        id: "windmill",
        label: "Windmill",
        desc: "A converted windmill used as accommodation",
        icon: Landmark,
      },
      {
        id: "cave",
        label: "Cave",
        desc: "A stay built within natural or carved rock spaces",
        icon: Mountain,
      },
    ],
  },
];

interface Props {
  formData: any;
  onNext: (data: any) => void;
  onBack: () => void; // Required prop
}

export default function PropertyTypeStep({ formData, onNext, onBack }: Props) {
  const [selectedType, setSelectedType] = useState(formData.propertyType || "");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      onNext({ propertyType: selectedType });
    }
  };

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-950"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        <h2 className="text-2xl font-bold text-blue-950">
          What kind of property are you listing?
        </h2>

        <div className="space-y-10 pb-10">
          {propertyCategories.map((category) => {
            const filteredItems = category.items.filter((item) =>
              item.label.toLowerCase().includes(searchTerm),
            );
            if (filteredItems.length === 0) return null;

            return (
              <div key={category.group} className="space-y-4">
                <h3 className="text-lg font-bold text-stone-800">
                  {category.group}
                </h3>
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <FormCard
                      key={item.id}
                      icon={item.icon}
                      title={item.label}
                      description={item.desc}
                      selected={selectedType === item.id}
                      onClick={() => setSelectedType(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Buttons */}
      <NavigationButtons
        onBack={onBack}
        onNext={handleNext}
        nextDisabled={!selectedType}
        nextDisabledReason="Select a property type to continue."
      />
    </OnboardingStepLayout>
  );
}
