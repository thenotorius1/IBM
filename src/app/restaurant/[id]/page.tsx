"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Star, Phone, Clock, ArrowLeft, Navigation2,
  ExternalLink, Tag, ChevronLeft, ChevronRight
} from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import { formatPrice } from "@/lib/constants";
import { haversineDistance, formatDistance } from "@/lib/haversine";
import PriceBadge from "@/components/restaurant/PriceBadge";
import { useGeolocation } from "@/hooks/useGeolocation";
import MapView from "@/components/map/MapView";

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lat, lng } = useGeolocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/restaurants/${id}`);
        if (!res.ok) throw new Error("Restoran tidak ditemukan");
        const data = await res.json();
        setRestaurant(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-72 bg-[#FED7AA]/40 rounded-2xl mb-6" />
        <div className="h-8 bg-[#FED7AA]/60 rounded-full w-1/2 mb-4" />
        <div className="h-4 bg-[#FED7AA]/40 rounded-full w-full mb-2" />
        <div className="h-4 bg-[#FED7AA]/40 rounded-full w-3/4" />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🍽️</div>
        <h2 className="text-xl font-bold text-[#292524] mb-2">{error || "Restoran tidak ditemukan"}</h2>
        <button onClick={() => router.back()} className="btn-primary mt-4">
          Kembali
        </button>
      </div>
    );
  }

  const distance =
    lat && lng
      ? haversineDistance(lat, lng, restaurant.latitude, restaurant.longitude)
      : null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`;

  const images = restaurant.images.length > 0 ? restaurant.images : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#78716C] hover:text-[#F97316] font-semibold text-sm mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 mb-6 bg-[#FFF7ED]">
          <Image
            src={images[imgIndex]?.image_url || ""}
            alt={restaurant.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => setImgIndex((i) => Math.max(0, i - 1))}
                disabled={imgIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setImgIndex((i) => Math.min(images.length - 1, i + 1))}
                disabled={imgIndex === images.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? "bg-white w-4" : "bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292524]">
                {restaurant.name}
              </h1>
              <PriceBadge category={restaurant.price_category} size="md" />
            </div>

            <div className="flex items-center gap-3 flex-wrap text-sm text-[#78716C]">
              <div className="flex items-center gap-1">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-[#292524]">{restaurant.rating.toFixed(1)}</span>
              </div>
              <span className="font-semibold text-[#F97316] text-base">
                ~{formatPrice(restaurant.average_price)} / orang
              </span>
              {distance !== null && (
                <div className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#F97316]" />
                  {formatDistance(distance)} dari lokasimu
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {restaurant.description && (
            <div className="bg-[#FFF7ED] rounded-xl p-4 border border-[#FED7AA]">
              <p className="text-[#78716C] leading-relaxed">{restaurant.description}</p>
            </div>
          )}

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#FFF7ED] rounded-xl flex items-center justify-center shrink-0 border border-[#FED7AA]">
                <MapPin size={16} className="text-[#F97316]" />
              </div>
              <div>
                <p className="text-xs text-[#78716C] font-medium">Alamat</p>
                <p className="text-[#292524] font-medium">{restaurant.address}</p>
              </div>
            </div>

            {restaurant.phone && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FFF7ED] rounded-xl flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  <Phone size={16} className="text-[#F97316]" />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] font-medium">Telepon</p>
                  <a href={`tel:${restaurant.phone}`} className="text-[#292524] font-medium hover:text-[#F97316] transition-colors">
                    {restaurant.phone}
                  </a>
                </div>
              </div>
            )}

            {restaurant.opening_hours && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FFF7ED] rounded-xl flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  <Clock size={16} className="text-[#F97316]" />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] font-medium">Jam Buka</p>
                  <p className="text-[#292524] font-medium">{restaurant.opening_hours}</p>
                </div>
              </div>
            )}

            {restaurant.categories.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[#FFF7ED] rounded-xl flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  <Tag size={16} className="text-[#F97316]" />
                </div>
                <div>
                  <p className="text-xs text-[#78716C] font-medium">Jenis Makanan</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {restaurant.categories.map((rc) => (
                      <span key={rc.id} className="badge-menengah">{rc.category.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coordinates */}
          <div className="bg-[#FFF7ED] rounded-xl p-3 border border-[#FED7AA] text-xs text-[#78716C] font-mono">
            📍 {restaurant.latitude.toFixed(6)}, {restaurant.longitude.toFixed(6)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <Navigation2 size={16} />
              Dapatkan Rute
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Buka Google Maps
            </a>
          </div>
        </div>

        {/* Map Sidebar */}
        <div className="h-64 lg:h-full min-h-[200px]">
          <MapView
            restaurants={[{ ...restaurant, distance: distance ?? undefined }]}
            selectedId={restaurant.id}
            userLat={lat}
            userLng={lng}
          />
        </div>
      </div>
    </div>
  );
}
