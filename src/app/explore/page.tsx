"use client";

import { Suspense } from "react";
import { RestaurantListSkeleton } from "@/components/restaurant/RestaurantCardSkeleton";
import ExploreContent from "./ExploreContent";

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-[#FED7AA]/40 rounded-full w-48 mb-6 animate-pulse" />
          <RestaurantListSkeleton count={6} />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
