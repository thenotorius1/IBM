"use client";

import { useGeolocation } from "@/hooks/useGeolocation";
import HeroSection from "@/components/home/HeroSection";
import PriceCategorySection from "@/components/home/PriceCategorySection";
import RecommendationSection from "@/components/home/RecommendationSection";

export default function HomePage() {
  const { lat, lng } = useGeolocation();

  return (
    <>
      <HeroSection />
      <PriceCategorySection />
      <RecommendationSection userLat={lat} userLng={lng} />
    </>
  );
}
