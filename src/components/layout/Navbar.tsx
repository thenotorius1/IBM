"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X, UtensilsCrossed } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { requestLocation, loading } = useGeolocation();

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/explore", label: "Jelajahi Rumah Makan" },
    { href: "/about", label: "Tentang Kami" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#FED7AA] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#F97316]">
            <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
              <UtensilsCrossed size={18} className="text-white" />
            </div>
            <span>MakanYuk</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#F97316] border-b-2 border-[#F97316] pb-0.5"
                    : "text-[#78716C] hover:text-[#F97316]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={requestLocation}
              disabled={loading}
              className="flex items-center gap-2 btn-primary text-sm"
            >
              <MapPin size={16} />
              {loading ? "Memuat..." : "Gunakan Lokasi Saya"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[#78716C] hover:text-[#F97316] hover:bg-[#FFF7ED] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#FED7AA] px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-[#FFF7ED] text-[#F97316]"
                  : "text-[#78716C] hover:bg-[#FFF7ED] hover:text-[#F97316]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              requestLocation();
              setMobileOpen(false);
            }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 btn-primary mt-2"
          >
            <MapPin size={16} />
            {loading ? "Memuat Lokasi..." : "Gunakan Lokasi Saya"}
          </button>
        </div>
      )}
    </nav>
  );
}
