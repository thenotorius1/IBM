# MakanYuk 🍽️

Platform pencarian rumah makan berbasis **Location-Based Service (LBS)** yang membantu pengguna menemukan tempat makan sesuai lokasi dan anggaran.

## ✨ Fitur

- 🗺️ **Pencarian Berbasis Lokasi** — Deteksi posisi otomatis via browser Geolocation API
- 💰 **Filter Harga** — Murah (≤Rp15rb), Menengah (Rp15rb–35rb), Mahal (>Rp35rb)
- 📍 **Google Maps Integration** — Peta interaktif dengan marker & info window
- 📏 **Perhitungan Jarak** — Rumus Haversine untuk jarak akurat
- 🔍 **Filter & Sorting** — Berdasarkan harga, rating, jarak, jenis makanan
- 📱 **Responsif** — Desktop, tablet, dan mobile

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 18+
- Google Maps API Key (opsional)

> **SQLite** digunakan sebagai database — tidak perlu instalasi server apapun. File database otomatis dibuat di `prisma/dev.db`.

### Instalasi

```bash
# 1. Clone atau masuk ke direktori proyek
cd makanyuk

# 2. Install dependencies
npm install

# 3. Salin file environment
cp .env.local.example .env.local

# 4. Edit .env.local dengan konfigurasi Anda
nano .env.local
```

### Konfigurasi `.env.local`

```env
DATABASE_URL="file:./prisma/dev.db"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Database

```bash
# Push schema ke database (file SQLite dibuat otomatis)
npm run db:push

# Isi data dummy (16 restoran)
npm run db:seed
```

### Menjalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🗄️ Struktur Database

| Tabel | Deskripsi |
|---|---|
| `Restaurant` | Data utama restoran |
| `RestaurantImage` | Foto-foto restoran |
| `FoodCategory` | Kategori jenis makanan |
| `RestaurantCategory` | Relasi restoran-kategori |

## 📂 Struktur Folder

```
src/
├── app/
│   ├── api/             # API Routes (Next.js Route Handlers)
│   ├── explore/         # Halaman Jelajahi Rumah Makan
│   ├── restaurant/[id]/ # Halaman Detail
│   └── about/           # Halaman Tentang Kami
├── components/
│   ├── home/            # Komponen Homepage
│   ├── layout/          # Navbar, Footer
│   ├── map/             # Google Maps component
│   ├── restaurant/      # Card, Badge, Skeleton
│   ├── filters/         # Panel filter & sorting
│   └── ui/              # Komponen generik (EmptyState)
├── hooks/
│   ├── useGeolocation.ts
│   └── useRestaurants.ts
├── lib/
│   ├── prisma.ts        # Prisma client singleton
│   ├── haversine.ts     # Rumus jarak geografis
│   └── constants.ts     # Konfigurasi harga & format
└── types/
    └── restaurant.ts    # TypeScript interfaces
```

## 🔑 Google Maps API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Aktifkan **Maps JavaScript API**
3. Buat API Key dan batasi domain
4. Tambahkan ke `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
   ```

> **Tanpa API Key**, peta tidak akan tampil, namun semua fitur lain (pencarian, filter, sorting, detail restoran) tetap berfungsi.

## 🏷️ Kategori Harga

| Kategori | Rentang | Deskripsi |
|---|---|---|
| Murah | Rp5.000 – Rp15.000 | Cocok makan sehari-hari |
| Menengah | Rp15.001 – Rp35.000 | Kualitas & harga seimbang |
| Mahal | Di atas Rp35.000 | Pengalaman kuliner premium |

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes
- **ORM**: Prisma 8
- **Database**: SQLite (via Prisma)
- **Maps**: Google Maps JavaScript API
- **Icons**: Lucide React
- **Animation**: Framer Motion

## 📝 Script NPM

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:push      # Push schema ke database
npm run db:seed      # Isi data dummy
npm run db:studio    # Prisma Studio (GUI database)
npm run db:generate  # Regenerate Prisma client
```
