import { PriceCategory } from "@/types/restaurant";

export const PRICE_RANGES: Record<
  PriceCategory,
  { min: number; max: number; label: string; description: string }
> = {
  MURAH: {
    min: 5000,
    max: 15000,
    label: "Murah",
    description: "Rp5.000 – Rp15.000",
  },
  MENENGAH: {
    min: 15001,
    max: 35000,
    label: "Menengah",
    description: "Rp15.001 – Rp35.000",
  },
  MAHAL: {
    min: 35001,
    max: Infinity,
    label: "Mahal",
    description: "Di atas Rp35.000",
  },
};

export const SORT_OPTIONS = [
  { value: "distance_asc", label: "Terdekat" },
  { value: "price_asc", label: "Harga Terendah" },
  { value: "price_desc", label: "Harga Tertinggi" },
  { value: "rating_desc", label: "Rating Tertinggi" },
] as const;

export const DEFAULT_MAP_CENTER = {
  lat: -6.2088,
  lng: 106.8456,
};

export const DEFAULT_MAP_ZOOM = 12;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPriceCategory(price: number): PriceCategory {
  if (price <= PRICE_RANGES.MURAH.max) return "MURAH";
  if (price <= PRICE_RANGES.MENENGAH.max) return "MENENGAH";
  return "MAHAL";
}
