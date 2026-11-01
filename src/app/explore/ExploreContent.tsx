"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, List, Map, Loader2, AlertCircle } from "lucide-react";
import { RestaurantFilters } from "@/types/restaurant";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useGeolocation } from "@/hooks/useGeolocation";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { RestaurantCardSkeleton } from "@/components/restaurant/RestaurantCardSkeleton";
import FilterPanel from "@/components/filters/FilterPanel";
import MapView from "@/components/map/MapView";
import EmptyState from "@/components/ui/EmptyState";

export default function ExploreContent() {
  const searchParams = useSearchParams();
  const { lat, lng, requestLocation, loading: geoLoading, error: geoError, permissionDenied } = useGeolocation();

  const [filters, setFilters] = useState<RestaurantFilters>({
    search: searchParams.get("search") || "",
    price_category: (searchParams.get("price_category") as RestaurantFilters["price_category"]) || "",
    sort_by: "rating_desc",
    lat: undefined,
    lng: undefined,
  });

  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  // Sync user location into filters
  useEffect(() => {
    if (lat && lng) {
      setFilters((prev) => ({ ...prev, lat, lng, sort_by: prev.sort_by || "distance_asc" }));
    }
  }, [lat, lng]);

  const { restaurants, total, loading } = useRestaurants(filters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#292524] mb-1">
          Jelajahi <span className="text-[#F97316]">Rumah Makan</span>
        </h1>
        <p className="text-[#78716C]">
          {total > 0 ? `${total} restoran ditemukan` : "Temukan rumah makan terbaik di sekitarmu"}
        </p>
      </div>

      {/* Search Bar + Location */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari nama atau lokasi..."
              className="input-field pl-11"
            />
          </div>
          <button type="submit" className="btn-primary px-4">
            Cari
          </button>
        </form>

        <button
          onClick={requestLocation}
          disabled={geoLoading}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
            lat
              ? "bg-green-50 border-green-300 text-green-700"
              : "bg-white text-[#F97316] border-[#FED7AA] hover:border-[#F97316]"
          }`}
        >
          {geoLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <MapPin size={15} />
          )}
          {lat ? "Lokasi Aktif" : "Gunakan Lokasi"}
        </button>
      </div>

      {/* Location error */}
      {geoError && !permissionDenied && (
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
          <AlertCircle size={16} />
          {geoError}
        </div>
      )}

      {/* Mobile View Toggle */}
      <div className="flex sm:hidden gap-2 mb-4">
        {(["list", "map"] as const).map((view) => (
          <button
            key={view}
            onClick={() => setMobileView(view)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              mobileView === view
                ? "bg-[#F97316] text-white border-[#F97316]"
                : "bg-white text-[#78716C] border-[#FED7AA]"
            }`}
          >
            {view === "list" ? <><List size={16} /> Daftar</> : <><Map size={16} /> Peta</>}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Left: Filters + List */}
        <div className={`flex-none w-full sm:w-80 lg:w-96 flex flex-col gap-4 ${mobileView === "map" ? "hidden sm:flex" : "flex"}`}>
          <FilterPanel filters={filters} onChange={setFilters} />

          <div className="flex flex-col gap-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <RestaurantCardSkeleton key={i} />)
            ) : restaurants.length === 0 ? (
              <EmptyState
                title="Tidak ada rumah makan"
                description="Coba ubah filter atau kata kunci pencarian."
              />
            ) : (
              restaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  isSelected={selectedId === r.id}
                  onSelect={setSelectedId}
                  compact
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Map */}
        <div className={`flex-1 min-w-0 ${mobileView === "list" ? "hidden sm:block" : "block"}`}>
          <div className="sticky top-20 h-[calc(100vh-120px)] min-h-[400px]">
            <MapView
              restaurants={restaurants}
              selectedId={selectedId}
              userLat={lat}
              userLng={lng}
              onMarkerClick={setSelectedId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
