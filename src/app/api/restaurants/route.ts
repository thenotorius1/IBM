import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PriceCategory } from "@/types/restaurant";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const price_category = searchParams.get("price_category") as PriceCategory | null;
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const min_rating = searchParams.get("min_rating");
    const category_id = searchParams.get("category_id");
    const sort_by = searchParams.get("sort_by") || "rating_desc";
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const max_distance = searchParams.get("max_distance");
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "20");

    // Build where clause
    const where: Prisma.RestaurantWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (price_category) {
      where.price_category = price_category;
    }

    if (min_price || max_price) {
      where.average_price = {
        ...(min_price ? { gte: parseInt(min_price) } : {}),
        ...(max_price ? { lte: parseInt(max_price) } : {}),
      };
    }

    if (min_rating) {
      where.rating = { gte: parseFloat(min_rating) };
    }

    if (category_id) {
      where.categories = {
        some: { category_id: parseInt(category_id) },
      };
    }

    // Build orderBy
    let orderBy: Prisma.RestaurantOrderByWithRelationInput = {};
    if (sort_by === "price_asc") orderBy = { average_price: "asc" };
    else if (sort_by === "price_desc") orderBy = { average_price: "desc" };
    else if (sort_by === "rating_desc") orderBy = { rating: "desc" };
    else orderBy = { rating: "desc" }; // distance_asc handled client-side

    const skip = (page - 1) * per_page;

    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        orderBy,
        skip,
        take: per_page,
        include: {
          images: true,
          categories: {
            include: { category: true },
          },
        },
      }),
      prisma.restaurant.count({ where }),
    ]);

    // Filter by distance if user location provided
    let filtered: typeof restaurants = restaurants;
    if (lat && lng && max_distance) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxKm = parseFloat(max_distance);
      filtered = restaurants.filter((r) => {
        const d = haversineDistance(userLat, userLng, r.latitude, r.longitude);
        return d <= maxKm;
      });
    }

    return NextResponse.json({
      data: filtered,
      total: lat && lng && max_distance ? filtered.length : total,
      page,
      per_page,
      total_pages: Math.ceil(total / per_page),
    });
  } catch (error) {
    console.error("GET /api/restaurants error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
