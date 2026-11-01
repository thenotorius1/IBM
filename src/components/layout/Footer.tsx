import Link from "next/link";
import { UtensilsCrossed, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#FED7AA] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#F97316] mb-3">
              <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
                <UtensilsCrossed size={18} className="text-white" />
              </div>
              <span>MakanYuk</span>
            </Link>
            <p className="text-sm text-[#78716C] leading-relaxed">
              Platform pencarian rumah makan berbasis lokasi. Temukan tempat makan terbaik sesuai anggaran dan lokasi Anda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-[#292524] mb-3">Navigasi</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/explore", label: "Jelajahi Rumah Makan" },
                { href: "/about", label: "Tentang Kami" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#78716C] hover:text-[#F97316] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-[#292524] mb-3">Kategori Harga</h3>
            <ul className="space-y-2 text-sm text-[#78716C]">
              <li className="flex items-center gap-2">
                <span className="badge-murah">Murah</span>
                <span>Rp5.000 – Rp15.000</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge-menengah">Menengah</span>
                <span>Rp15.001 – Rp35.000</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="badge-mahal">Mahal</span>
                <span>Di atas Rp35.000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FED7AA] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#78716C]">
            © 2025 MakanYuk. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-1 text-sm text-[#78716C]">
            <MapPin size={14} className="text-[#F97316]" />
            <span>Berbasis Lokasi untuk Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
