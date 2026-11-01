import { MapPin, Target, Zap, Heart } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: MapPin,
      title: "Berbasis Lokasi",
      desc: "Temukan restoran yang paling dekat dengan posisi Anda menggunakan teknologi GPS.",
    },
    {
      icon: Target,
      title: "Filter Harga",
      desc: "Cari berdasarkan anggaran: murah, menengah, atau mahal sesuai kantong Anda.",
    },
    {
      icon: Zap,
      title: "Cepat & Mudah",
      desc: "Antarmuka yang intuitif untuk menemukan tempat makan dalam hitungan detik.",
    },
    {
      icon: Heart,
      title: "Kuliner Lokal",
      desc: "Mendukung UMKM dan warung lokal agar mudah ditemukan oleh masyarakat.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-[#F97316]/10 text-[#F97316] text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-[#F97316]/20">
          🍽️ Tentang MakanYuk
        </div>
        <h1 className="text-4xl font-extrabold text-[#292524] mb-4">
          Misi Kami: Mudahkan Kamu{" "}
          <span className="text-[#F97316]">Menemukan Makanan</span>
        </h1>
        <p className="text-[#78716C] text-lg leading-relaxed max-w-2xl mx-auto">
          MakanYuk adalah platform pencarian rumah makan berbasis lokasi yang dirancang
          untuk membantu masyarakat Indonesia menemukan tempat makan yang sesuai dengan
          selera dan anggaran mereka.
        </p>
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl border border-[#FED7AA] p-8 mb-10 shadow-sm">
        <h2 className="text-2xl font-bold text-[#292524] mb-4">Cerita di Balik MakanYuk</h2>
        <div className="space-y-4 text-[#78716C] leading-relaxed">
          <p>
            MakanYuk lahir dari permasalahan sederhana yang sering dialami banyak orang:
            bingung mau makan di mana dan berapa anggarannya. Di kota-kota besar, pilihan
            makanan memang banyak, namun sulit untuk menemukan yang sesuai dengan lokasi
            dan budget dengan cepat.
          </p>
          <p>
            Dengan teknologi <strong className="text-[#292524]">Location-Based Service (LBS)</strong>,
            MakanYuk dapat secara otomatis mendeteksi posisi pengguna dan menampilkan
            rumah makan terdekat lengkap dengan estimasi harga, rating, jarak, dan
            petunjuk arah menuju lokasi.
          </p>
          <p>
            Kami percaya bahwa mencari tempat makan yang baik tidak harus rumit.
            Cukup buka MakanYuk, aktifkan lokasi, dan temukan pilihan terbaik dalam
            hitungan detik.
          </p>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-[#292524] mb-6 text-center">
        Apa yang Bisa Kamu Lakukan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
        {features.map((f) => (
          <div key={f.title} className="bg-white rounded-2xl border border-[#FED7AA] p-6 flex gap-4 shadow-sm">
            <div className="w-11 h-11 bg-[#FFF7ED] rounded-xl flex items-center justify-center border border-[#FED7AA] shrink-0">
              <f.icon size={20} className="text-[#F97316]" />
            </div>
            <div>
              <h3 className="font-bold text-[#292524] mb-1">{f.title}</h3>
              <p className="text-sm text-[#78716C] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Guide */}
      <div className="bg-gradient-to-br from-[#F97316] to-[#FB923C] rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Panduan Kategori Harga</h2>
        <p className="text-white/80 text-sm mb-6">
          Harga yang ditampilkan adalah estimasi harga makanan per orang.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "💰 Murah", range: "Rp5.000 – Rp15.000", desc: "Cocok untuk makan sehari-hari" },
            { label: "⚖️ Menengah", range: "Rp15.001 – Rp35.000", desc: "Kualitas & harga seimbang" },
            { label: "✨ Mahal", range: "Di atas Rp35.000", desc: "Pengalaman kuliner premium" },
          ].map((cat) => (
            <div key={cat.label} className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <p className="font-bold text-base mb-1">{cat.label}</p>
              <p className="text-white font-semibold text-sm mb-1">{cat.range}</p>
              <p className="text-white/70 text-xs">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology */}
      <div className="mt-10 bg-white rounded-2xl border border-[#FED7AA] p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[#292524] mb-4">Teknologi yang Digunakan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Prisma ORM", "MySQL", "Google Maps API", "Framer Motion"].map((tech) => (
            <div key={tech} className="bg-[#FFF7ED] rounded-xl px-3 py-2.5 text-center border border-[#FED7AA]">
              <span className="text-sm font-semibold text-[#292524]">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
