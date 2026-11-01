"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2, AlertCircle } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { requestLocation, loading, error, permissionDenied, lat, lng } = useGeolocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (lat) params.set("lat", String(lat));
    if (lng) params.set("lng", String(lng));
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF7ED] via-[#FFF7ED] to-[#FDBA74]/20 pt-16 pb-20">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDBA74]/20 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FB923C]/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-[#F97316]/20">
              <MapPin size={14} />
              Pencarian Berbasis Lokasi
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#292524] leading-tight mb-4">
              Temukan Rumah Makan{" "}
              <span className="text-[#F97316]">Favoritmu</span> dengan Harga
              Terbaik!
            </h1>

            <p className="text-[#78716C] text-lg mb-8 leading-relaxed">
              Jelajahi ratusan pilihan rumah makan di sekitarmu berdasarkan
              harga, jarak, dan rating. Hemat waktu, hemat uang, tetap enak!
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama rumah makan atau lokasi..."
                  className="input-field pl-11"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">
                Cari Rumah Makan
              </button>
            </form>

            {/* Location Button */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={requestLocation}
                disabled={loading}
                className="flex items-center gap-2 text-sm text-[#F97316] font-semibold hover:text-[#EA6C0A] transition-colors"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <MapPin size={16} />
                )}
                {loading
                  ? "Mengambil lokasi..."
                  : lat
                  ? "✅ Lokasi terdeteksi"
                  : "Gunakan lokasi saya"}
              </button>
              {permissionDenied && (
                <span className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  Izin ditolak
                </span>
              )}
            </div>

            {error && !permissionDenied && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-80 h-80">
              {/* Floating cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 bg-[#F97316] rounded-3xl opacity-10 rotate-12" />
              </div>
              <div className="relative z-10 flex flex-col gap-4 pt-8">
                {[
                  { emoji: "🍛", name: "Nasi Padang", price: "Rp15.000", dist: "0.3 km" },
                  { emoji: "🍜", name: "Bakso Malang", price: "Rp12.000", dist: "0.7 km" },
                  { emoji: "🍣", name: "Sushi Resto", price: "Rp80.000", dist: "1.2 km" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-2xl shadow-md p-3 flex items-center gap-3 border border-[#FED7AA]"
                    style={{ marginLeft: i % 2 === 0 ? 0 : 32 }}
                  >
                    <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center text-xl">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#292524]">{item.name}</p>
                      <p className="text-xs text-[#78716C]">~{item.price}</p>
                    </div>
                    <span className="text-xs text-[#F97316] font-semibold bg-[#FFF7ED] px-2 py-1 rounded-full">
                      {item.dist}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
