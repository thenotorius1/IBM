import { PriceCategory } from "@/types/restaurant";

interface PriceBadgeProps {
  category: PriceCategory;
  size?: "sm" | "md";
}

const labels: Record<PriceCategory, string> = {
  MURAH: "Murah",
  MENENGAH: "Menengah",
  MAHAL: "Mahal",
};

const classMap: Record<PriceCategory, string> = {
  MURAH: "badge-murah",
  MENENGAH: "badge-menengah",
  MAHAL: "badge-mahal",
};

export default function PriceBadge({ category, size = "sm" }: PriceBadgeProps) {
  return (
    <span className={`${classMap[category]} ${size === "md" ? "text-sm px-3 py-1.5" : ""}`}>
      {labels[category]}
    </span>
  );
}
