"use client";

import { useState, useEffect } from "react";
import { X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { RestaurantFilters, PriceCategory, SortOption } from "@/types/restaurant";
import { SORT_OPTIONS, PRICE_RANGES } from "@/lib/constants";
import { FoodCategory } from "@/types/restaurant";

interface FilterPanelProps {
  filters: RestaurantFilters;
  onChange: (filters: RestaurantFilters) => void;
}

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const update = (key: keyof RestaurantFilters, value: unknown) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const activeCount = [
    filters.price_category,
    filters.min_price,
    filters.max_price,
    filters.max_distance,
    filters.min_rating,
    filters.category_id,
  ].filter(Boolean).length;

  const reset = () =>
    onChange({ search: filters.search, sort_by: filters.sort_by, lat: filters.lat, lng: filters.lng });

  return (
    <div className="bg-white rounded-2xl border border-[#FED7AA] overflow-hidden">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 font-semibold text-[#292524]">
          <SlidersHorizontal size={16} className="text-[#F97316]" />
          Filter
          {activeCount > 0 && (
            <span className="bg-[#F97316] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-[#78716C] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-5 border-t border-[#FED7AA]">
          {/* Sort */}
          <div className="pt-4">
            <label className="block text-sm font-semibold text-[#292524] mb-2">Urutkan</label>
            <select
              value={filters.sort_by || "rating_desc"}
              onChange={(e) => update("sort_by", e.target.value as SortOption)}
              className="input-field text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Category */}
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-2">Kategori Harga</label>
            <div className="flex flex-wrap gap-2">
              {(["", "MURAH", "MENENGAH", "MAHAL"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => update("price_category", cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    filters.price_category === cat || (!filters.price_category && cat === "")
                      ? "bg-[#F97316] text-white border-[#F97316]"
                      : "bg-white text-[#78716C] border-[#FED7AA] hover:border-[#F97316] hover:text-[#F97316]"
                  }`}
                >
                  {cat === "" ? "Semua" : PRICE_RANGES[cat].label}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-2">
              Rating Minimal:{" "}
              <span className="text-[#F97316]">{filters.min_rating ?? 0}⭐</span>
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={filters.min_rating ?? 0}
              onChange={(e) => update("min_rating", parseFloat(e.target.value) || undefined)}
              className="w-full accent-[#F97316]"
            />
            <div className="flex justify-between text-xs text-[#78716C] mt-1">
              <span>0</span>
              <span>5</span>
            </div>
          </div>

          {/* Max Distance */}
          {filters.lat && (
            <div>
              <label className="block text-sm font-semibold text-[#292524] mb-2">
                Jarak Maksimal:{" "}
                <span className="text-[#F97316]">
                  {filters.max_distance ? `${filters.max_distance} km` : "Semua"}
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={filters.max_distance ?? 50}
                onChange={(e) => update("max_distance", parseInt(e.target.value))}
                className="w-full accent-[#F97316]"
              />
              <div className="flex justify-between text-xs text-[#78716C] mt-1">
                <span>1 km</span>
                <span>50 km</span>
              </div>
            </div>
          )}

          {/* Food Category */}
          {categories.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-[#292524] mb-2">Jenis Makanan</label>
              <select
                value={filters.category_id ?? ""}
                onChange={(e) => update("category_id", e.target.value ? parseInt(e.target.value) : undefined)}
                className="input-field text-sm"
              >
                <option value="">Semua Jenis</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reset */}
          {activeCount > 0 && (
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-semibold py-2 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
            >
              <X size={14} />
              Reset Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
