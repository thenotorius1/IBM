import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "Tidak ada hasil ditemukan",
  description = "Coba ubah filter atau kata kunci pencarian Anda.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-[#FFF7ED] rounded-full flex items-center justify-center mb-4 border-2 border-[#FED7AA]">
        {icon || <Search size={28} className="text-[#F97316]" />}
      </div>
      <h3 className="font-bold text-[#292524] text-lg mb-2">{title}</h3>
      <p className="text-[#78716C] text-sm max-w-xs">{description}</p>
    </div>
  );
}
