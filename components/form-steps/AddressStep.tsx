"use client";

import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { ChevronLeft, Search, Info, Target } from "lucide-react";

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
      : { lat: 28.4089, lng: 77.3178 }
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
      }
    });
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setMarkerPos({ lat, lng });
        map?.panTo({ lat, lng });
        fetchAddressAndConfirm(lat, lng);
      });
    }
  };

  if (!isLoaded)
    return <div className="p-10 text-center font-bold">Loading Map...</div>;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white flex flex-col">
      <div className="px-4 pt-6 space-y-2">
        <div className="flex gap-1">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < 4 ? "bg-blue-950" : "bg-stone-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-stone-500 font-bold">Step 4 of 14</p>
      </div>

      <div className="p-4 space-y-6 flex-1">
        <div className="flex justify-between items-center">
          <button className="text-sky-500 font-bold text-sm underline underline-offset-4 decoration-2">
            Save & Exit
          </button>
          <button className="px-4 py-1.5 border border-stone-300 rounded-lg text-sm text-stone-700 font-bold">
            Need Help?
          </button>
        </div>

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

        <div className="rounded-[32px] overflow-hidden border border-stone-100 h-[300px] shadow-sm">
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

      <div className="sticky bottom-0 bg-white border-t p-4 pb-8 z-50">
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-3.5 border-2 border-blue-950 rounded-xl font-bold"
          >
            Previous
          </button>
          <button
            onClick={() => fetchAddressAndConfirm(markerPos.lat, markerPos.lng)}
            className="flex-1 py-3.5 bg-blue-900 text-white rounded-xl font-bold shadow-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
