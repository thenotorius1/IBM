"use client";

import { useState, useEffect, useCallback } from "react";
import { RestaurantWithDistance, RestaurantFilters } from "@/types/restaurant";
import { haversineDistance } from "@/lib/haversine";

export function useRestaurants(filters: RestaurantFilters) {
  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.price_category) params.set("price_category", filters.price_category);
      if (filters.min_price) params.set("min_price", String(filters.min_price));
      if (filters.max_price) params.set("max_price", String(filters.max_price));
      if (filters.min_rating) params.set("min_rating", String(filters.min_rating));
      if (filters.category_id) params.set("category_id", String(filters.category_id));
      if (filters.sort_by) params.set("sort_by", filters.sort_by);
      if (filters.lat) params.set("lat", String(filters.lat));
      if (filters.lng) params.set("lng", String(filters.lng));
      if (filters.max_distance) params.set("max_distance", String(filters.max_distance));

      const res = await fetch(`/api/restaurants?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal memuat data restoran");
      const json = await res.json();

      // Hitung jarak jika ada koordinat pengguna
      const withDistance: RestaurantWithDistance[] = json.data.map(
        (r: RestaurantWithDistance) => ({
          ...r,
          distance:
            filters.lat && filters.lng
              ? haversineDistance(filters.lat, filters.lng, r.latitude, r.longitude)
              : undefined,
        })
      );

      // Sort by distance jika diminta
      if (filters.sort_by === "distance_asc" && filters.lat && filters.lng) {
        withDistance.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
      }

      setRestaurants(withDistance);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.price_category,
    filters.min_price,
    filters.max_price,
    filters.min_rating,
    filters.category_id,
    filters.sort_by,
    filters.lat,
    filters.lng,
    filters.max_distance,
  ]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return { restaurants, total, loading, error, refetch: fetchRestaurants };
}
