export function RestaurantCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-44 bg-[#FED7AA]/40" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#FED7AA]/60 rounded-full w-3/4" />
        <div className="h-3 bg-[#FED7AA]/40 rounded-full w-full" />
        <div className="h-3 bg-[#FED7AA]/40 rounded-full w-4/5" />
        <div className="flex justify-between pt-3 border-t border-[#FED7AA]">
          <div className="h-3 bg-[#FED7AA]/60 rounded-full w-20" />
          <div className="h-3 bg-[#FED7AA]/60 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
}

export function RestaurantListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <RestaurantCardSkeleton key={i} />
      ))}
    </div>
  );
}
