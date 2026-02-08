"use client";

import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { ChevronLeft, Search, Info, Target } from "lucide-react";
import OnboardingStepLayout from "./OnboardingStepLayout";

const libraries: "places"[] = ["places"];

export default function AddressStep({
  formData,
  onNext,
  onBack,
  onManualEntry,
}: any) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPos, setMarkerPos] = useState(
    formData.latitude
      ? { lat: formData.latitude, lng: formData.longitude }
      : { lat: 27.4089, lng: 87.3178 },
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const fetchAddressAndConfirm = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const components = results[0].address_components;
        const getComp = (types: string[]) =>
          components.find((c) => types.some((t) => c.types.includes(t)))
            ?.long_name || "";

        onNext({
          latitude: lat,
          longitude: lng,
          streetAddress: results[0].formatted_address,
          city: getComp(["locality", "postal_town"]),
          state: getComp(["administrative_area_level_1"]), // Auto-populates State
          postalCode: getComp(["postal_code"]),
          country: getComp(["country"]) || "India",
        });
      } else {
        onNext({
          latitude: null,
          longitude: null,
        });
      }
    });
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setMarkerPos({ lat, lng });
          map?.panTo({ lat, lng });
          map?.setZoom(17);
        },
        (error) => {
          console.error("Failed to get current location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }
  };

  if (!isLoaded)
    return <div className="p-10 text-center font-bold">Loading Map...</div>;

  return (
    <OnboardingStepLayout>
      <div className="space-y-6">
        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={() => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.geometry?.location) {
              const pos = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };
              setMarkerPos(pos);
              map?.panTo(pos);
            }
          }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search for your place..."
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl"
            />
          </div>
        </Autocomplete>

        <div className="rounded-[32px] overflow-hidden border border-stone-100 h-[500px] shadow-sm">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={markerPos}
            zoom={15}
            onLoad={(m) => setMap(m)}
            options={{ disableDefaultUI: true }}
          >
            <MarkerF
              position={markerPos}
              draggable
              onDragEnd={(e) =>
                e.latLng &&
                setMarkerPos({ lat: e.latLng.lat(), lng: e.latLng.lng() })
              }
            />
          </GoogleMap>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={useCurrentLocation}
            className="w-fit bg-white px-6 py-2.5 rounded-full shadow-md border border-stone-100 flex items-center gap-2 text-xs font-bold text-blue-950"
          >
            <Target className="w-4 h-4 text-sky-500" /> Use Current location
          </button>
          <button
            onClick={onManualEntry}
            className="text-xs font-bold text-blue-950"
          >
            Can't Find Your Location?{" "}
            <span className="text-sky-500 underline">Enter Manually</span>
          </button>
        </div>
      </div>

      <div className="onboarding-footer flex flex-col sm:flex-row justify-center gap-8 mt-10">
        <button
          onClick={onBack}
          className="w-[259px] h-[75px] rounded-[14px] border-2 border-[#004772] text-[#004772] text-lg sm:text-xl font-semibold hover:bg-[#004772]/5 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={() => fetchAddressAndConfirm(markerPos.lat, markerPos.lng)}
          className="w-[259px] h-[75px] rounded-[14px] text-white text-lg sm:text-xl font-medium transition bg-[#004772] hover:bg-[#003656] shadow-lg"
        >
          Confirm
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
