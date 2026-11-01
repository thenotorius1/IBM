export type PriceCategory = "MURAH" | "MENENGAH" | "MAHAL";

export interface RestaurantImage {
  id: number;
  restaurant_id: number;
  image_url: string;
  is_primary: boolean;
}

export interface FoodCategory {
  id: number;
  name: string;
  description: string | null;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  average_price: number;
  price_category: PriceCategory;
  rating: number;
  phone: string | null;
  opening_hours: string | null;
  created_at: string;
  updated_at: string;
  images: RestaurantImage[];
  categories: {
    id: number;
    category: FoodCategory;
  }[];
}

export interface RestaurantWithDistance extends Restaurant {
  distance?: number; // in km
}

export interface RestaurantFilters {
  search?: string;
  price_category?: PriceCategory | "";
  min_price?: number;
  max_price?: number;
  max_distance?: number;
  min_rating?: number;
  category_id?: number;
  sort_by?: SortOption;
  lat?: number;
  lng?: number;
}

export type SortOption =
  | "price_asc"
  | "price_desc"
  | "distance_asc"
  | "rating_desc";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
