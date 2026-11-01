"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { PRICE_RANGES } from "@/lib/constants";

const categories = [
  {
    key: "MURAH",
    icon: TrendingDown,
    emoji: "💰",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    textColor: "text-green-700",
    badgeColor: "bg-green-100 text-green-700",
    description: "Kenyang tanpa bikin dompet tipis.",
  },
  {
    key: "MENENGAH",
    icon: Minus,
    emoji: "⚖️",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-[#F97316]",
    textColor: "text-[#F97316]",
    badgeColor: "bg-orange-100 text-orange-700",
    description: "Kualitas bagus dengan harga yang wajar.",
  },
  {
    key: "MAHAL",
    icon: TrendingUp,
    emoji: "✨",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    textColor: "text-purple-700",
    badgeColor: "bg-purple-100 text-purple-700",
    description: "Pengalaman kuliner premium yang tak terlupakan.",
  },
] as const;

export default function PriceCategorySection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[#292524] mb-2">
          Pilih Sesuai <span className="text-[#F97316]">Anggaran</span> Kamu
        </h2>
        <p className="text-[#78716C] text-base">
          Temukan rumah makan terbaik berdasarkan rentang harga yang kamu inginkan.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((cat, i) => {
          const range = PRICE_RANGES[cat.key];
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/explore?price_category=${cat.key}`}
                className={`block p-6 rounded-2xl border-2 ${cat.color} hover:shadow-lg transition-all duration-200 group`}
              >
                <div className="text-4xl mb-4">{cat.emoji}</div>
                <div className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full mb-3 ${cat.badgeColor}`}>
                  {range.label}
                </div>
                <h3 className={`text-xl font-bold ${cat.textColor} mb-1`}>
                  {range.label}
                </h3>
                <p className="text-[#78716C] text-sm mb-3">{cat.description}</p>
                <p className={`text-sm font-semibold ${cat.textColor}`}>
                  {range.description}
                </p>
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${cat.textColor} group-hover:gap-2 transition-all`}>
                  Jelajahi →
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
