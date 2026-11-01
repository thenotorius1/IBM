import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Phone, Clock, ArrowRight } from "lucide-react";
import { RestaurantWithDistance } from "@/types/restaurant";
import PriceBadge from "./PriceBadge";
import { formatPrice } from "@/lib/constants";
import { formatDistance } from "@/lib/haversine";

interface RestaurantCardProps {
  restaurant: RestaurantWithDistance;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
  compact?: boolean;
}

export default function RestaurantCard({
  restaurant,
  isSelected = false,
  onSelect,
  compact = false,
}: RestaurantCardProps) {
  const primaryImage = restaurant.images.find((img) => img.is_primary);
  const imageUrl = primaryImage?.image_url || restaurant.images[0]?.image_url;

  return (
    <div
      className={`card overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected ? "ring-2 ring-[#F97316] shadow-md" : ""
      }`}
      onClick={() => onSelect?.(restaurant.id)}
    >
      {/* Image */}
      <div className="relative h-44 bg-[#FFF7ED] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#FFF7ED]">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <PriceBadge category={restaurant.price_category} />
        </div>
        {restaurant.distance !== undefined && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#292524] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <MapPin size={11} className="text-[#F97316]" />
            {formatDistance(restaurant.distance)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#292524] text-base leading-snug line-clamp-1 mb-1">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-1 text-sm text-[#78716C] mb-2">
          <MapPin size={13} className="text-[#F97316] shrink-0" />
          <span className="line-clamp-1">{restaurant.address}</span>
        </div>

        {!compact && restaurant.description && (
          <p className="text-sm text-[#78716C] line-clamp-2 mb-3">
            {restaurant.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#FED7AA]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-[#292524]">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm font-semibold text-[#F97316]">
              ~{formatPrice(restaurant.average_price)}
            </span>
          </div>

          <Link
            href={`/restaurant/${restaurant.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:text-[#EA6C0A] transition-colors"
          >
            Detail
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
