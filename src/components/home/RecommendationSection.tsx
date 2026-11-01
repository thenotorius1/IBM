"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RestaurantWithDistance } from "@/types/restaurant";
import { haversineDistance } from "@/lib/haversine";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import { RestaurantListSkeleton } from "@/components/restaurant/RestaurantCardSkeleton";
import EmptyState from "@/components/ui/EmptyState";

interface RecommendationSectionProps {
  userLat?: number | null;
  userLng?: number | null;
}

export default function RecommendationSection({
  userLat,
  userLng,
}: RecommendationSectionProps) {
  const [restaurants, setRestaurants] = useState<RestaurantWithDistance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ sort_by: "rating_desc", per_page: "6" });
        if (userLat) params.set("lat", String(userLat));
        if (userLng) params.set("lng", String(userLng));
        const res = await fetch(`/api/restaurants?${params}`);
        const json = await res.json();
        const withDist: RestaurantWithDistance[] = json.data.map(
          (r: RestaurantWithDistance) => ({
            ...r,
            distance:
              userLat && userLng
                ? haversineDistance(userLat, userLng, r.latitude, r.longitude)
                : undefined,
          })
        );
        setRestaurants(withDist);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [userLat, userLng]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#292524] mb-1">
              Rekomendasi <span className="text-[#F97316]">Untukmu</span>
            </h2>
            <p className="text-[#78716C] text-base">
              Rumah makan terpopuler {userLat ? "di sekitar lokasimu" : "berdasarkan rating"}.
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-2 text-[#F97316] font-semibold text-sm hover:gap-3 transition-all"
          >
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="h-44 bg-[#FED7AA]/40" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#FED7AA]/60 rounded-full w-3/4" />
                  <div className="h-3 bg-[#FED7AA]/40 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <EmptyState
            title="Belum ada rekomendasi"
            description="Tambahkan data restoran ke database terlebih dahulu."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8 sm:hidden">
          <Link href="/explore" className="btn-primary flex items-center gap-2">
            Lihat Semua Rumah Makan <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
