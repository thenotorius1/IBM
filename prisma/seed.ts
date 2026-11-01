import { PrismaClient } from "@prisma/client";

type PriceCategory = "MURAH" | "MENENGAH" | "MAHAL";

const prisma = new PrismaClient();

const foodCategories = [
  { name: "Masakan Padang", description: "Masakan khas Sumatera Barat" },
  { name: "Masakan Jawa", description: "Masakan khas Jawa" },
  { name: "Seafood", description: "Hidangan laut" },
  { name: "Ayam Goreng", description: "Berbagai olahan ayam goreng" },
  { name: "Bakso & Mie", description: "Bakso, mie ayam, dan sejenisnya" },
  { name: "Warteg", description: "Warung tegal, masakan rumahan" },
  { name: "Nasi Goreng", description: "Nasi goreng dan variasi" },
  { name: "Soto", description: "Soto berbagai daerah" },
  { name: "Burger & Western", description: "Makanan western dan fast food lokal" },
  { name: "Japanese", description: "Masakan Jepang" },
];

const restaurants = [
  {
    name: "Rumah Makan Padang Sederhana",
    description: "Rumah makan Padang autentik dengan cita rasa asli Sumatera Barat. Terkenal dengan rendang dan gulai ikannya.",
    address: "Jl. Jend. Sudirman No. 45, Jakarta Pusat, DKI Jakarta 10220",
    latitude: -6.2088,
    longitude: 106.8456,
    average_price: 20000,
    price_category: "MENENGAH",
    rating: 4.5,
    phone: "021-5551234",
    opening_hours: "07:00 - 21:00",
    categories: ["Masakan Padang"],
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    ],
  },
  {
    name: "Warung Bu Siti",
    description: "Warung makan sederhana dengan menu masakan rumahan khas Jawa. Nasi pecel dan gudeg menjadi andalannya.",
    address: "Jl. Malioboro No. 12, Yogyakarta 55213",
    latitude: -7.7956,
    longitude: 110.3695,
    average_price: 10000,
    price_category: "MURAH",
    rating: 4.3,
    phone: "0274-551234",
    opening_hours: "06:00 - 20:00",
    categories: ["Masakan Jawa", "Warteg"],
    images: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    ],
  },
  {
    name: "Restoran Seafood Bahari",
    description: "Restoran seafood premium dengan ikan segar langsung dari nelayan. Menu andalan: kepiting saus padang dan udang bakar.",
    address: "Jl. Pantai Indah No. 8, Ancol, Jakarta Utara 14430",
    latitude: -6.1275,
    longitude: 106.8502,
    average_price: 75000,
    price_category: "MAHAL",
    rating: 4.7,
    phone: "021-6412345",
    opening_hours: "11:00 - 22:00",
    categories: ["Seafood"],
    images: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    ],
  },
  {
    name: "Ayam Geprek Pak Joko",
    description: "Ayam geprek dengan sambal bawang yang nendang. Pilihan level pedas dari 1 sampai 10.",
    address: "Jl. Kebon Jeruk Raya No. 23, Jakarta Barat 11530",
    latitude: -6.1944,
    longitude: 106.7795,
    average_price: 14000,
    price_category: "MURAH",
    rating: 4.4,
    phone: "021-5388765",
    opening_hours: "10:00 - 21:00",
    categories: ["Ayam Goreng"],
    images: [
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
    ],
  },
  {
    name: "Bakso Malang Pak Kumis",
    description: "Bakso khas Malang dengan kuah kaldu sapi yang gurih. Ada bakso urat, bakso halus, dan mie ayam.",
    address: "Jl. Pemuda No. 67, Surabaya, Jawa Timur 60271",
    latitude: -7.2575,
    longitude: 112.7521,
    average_price: 12000,
    price_category: "MURAH",
    rating: 4.6,
    phone: "031-5012345",
    opening_hours: "08:00 - 20:00",
    categories: ["Bakso & Mie"],
    images: [
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    ],
  },
  {
    name: "Warteg Barokah",
    description: "Warteg dengan berbagai pilihan lauk pauk segar setiap hari. Murah, enak, dan mengenyangkan.",
    address: "Jl. Hayam Wuruk No. 34, Jakarta Barat 11180",
    latitude: -6.1481,
    longitude: 106.8176,
    average_price: 8000,
    price_category: "MURAH",
    rating: 4.1,
    phone: null,
    opening_hours: "06:00 - 21:00",
    categories: ["Warteg"],
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    ],
  },
  {
    name: "Nasi Goreng Kambing Kebon Sirih",
    description: "Nasi goreng kambing yang legendaris di Jakarta Pusat sejak 1978. Cita rasa yang khas dan tidak tertandingi.",
    address: "Jl. Kebon Sirih No. 31, Jakarta Pusat 10340",
    latitude: -6.1863,
    longitude: 106.8281,
    average_price: 25000,
    price_category: "MENENGAH",
    rating: 4.8,
    phone: "021-3145678",
    opening_hours: "17:00 - 02:00",
    categories: ["Nasi Goreng"],
    images: [
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    ],
  },
  {
    name: "Soto Betawi H. Ma'ruf",
    description: "Soto Betawi asli dengan kuah santan kental. Pilihan daging sapi, kikil, dan jeroan.",
    address: "Jl. KH. Zainul Arifin No. 17, Jakarta Barat 11140",
    latitude: -6.1642,
    longitude: 106.8099,
    average_price: 22000,
    price_category: "MENENGAH",
    rating: 4.5,
    phone: "021-6291234",
    opening_hours: "07:00 - 17:00",
    categories: ["Soto"],
    images: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    ],
  },
  {
    name: "The Hungry Burger",
    description: "Burger artisan dengan patty daging lokal segar. Tidak ada bahan pengawet, semuanya dibuat di tempat.",
    address: "Jl. SCBD Lot 28, Sudirman, Jakarta Selatan 12190",
    latitude: -6.2241,
    longitude: 106.8095,
    average_price: 65000,
    price_category: "MAHAL",
    rating: 4.4,
    phone: "021-5799123",
    opening_hours: "11:00 - 22:00",
    categories: ["Burger & Western"],
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    ],
  },
  {
    name: "Sushi Nori Bandung",
    description: "Restoran Jepang dengan menu sushi, sashimi, dan ramen autentik. Bahan baku impor langsung dari Jepang.",
    address: "Jl. Dago No. 118, Bandung, Jawa Barat 40135",
    latitude: -6.8952,
    longitude: 107.6133,
    average_price: 80000,
    price_category: "MAHAL",
    rating: 4.6,
    phone: "022-2512345",
    opening_hours: "11:00 - 21:30",
    categories: ["Japanese"],
    images: [
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    ],
  },
  {
    name: "Gudeg Yu Djum",
    description: "Gudeg khas Yogyakarta yang sudah legendaris. Krecek, opor, dan gudeg kering menjadi keistimewaan warung ini.",
    address: "Jl. Wijilan No. 167, Yogyakarta 55131",
    latitude: -7.8014,
    longitude: 110.3648,
    average_price: 18000,
    price_category: "MENENGAH",
    rating: 4.7,
    phone: "0274-373873",
    opening_hours: "06:00 - 21:00",
    categories: ["Masakan Jawa"],
    images: [
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    ],
  },
  {
    name: "Ikan Bakar Cianjur",
    description: "Spesialis ikan bakar dengan berbagai pilihan ikan segar. Sambal terasi dan lalapan tersedia gratis.",
    address: "Jl. TB Simatupang No. 12, Jakarta Selatan 12560",
    latitude: -6.3108,
    longitude: 106.8292,
    average_price: 45000,
    price_category: "MENENGAH",
    rating: 4.3,
    phone: "021-7894321",
    opening_hours: "11:00 - 22:00",
    categories: ["Seafood"],
    images: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    ],
  },
  {
    name: "Mie Kocok Bandung Mas Ucup",
    description: "Mie kocok dengan kuah kaldu tulang sapi yang kaya rasa. Kikil empuk dan bakso sapi pilihan.",
    address: "Jl. Ahmad Yani No. 256, Bandung, Jawa Barat 40113",
    latitude: -6.9175,
    longitude: 107.6391,
    average_price: 15000,
    price_category: "MURAH",
    rating: 4.5,
    phone: "022-7204567",
    opening_hours: "08:00 - 18:00",
    categories: ["Bakso & Mie"],
    images: [
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
    ],
  },
  {
    name: "Restoran Puri Rasa",
    description: "Restoran fine dining dengan menu nusantara premium. Cocok untuk makan malam spesial dan acara keluarga.",
    address: "Jl. Gatot Subroto Kav. 56, Jakarta Selatan 12950",
    latitude: -6.2383,
    longitude: 106.8235,
    average_price: 120000,
    price_category: "MAHAL",
    rating: 4.8,
    phone: "021-5270001",
    opening_hours: "12:00 - 23:00",
    categories: ["Masakan Padang", "Seafood"],
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    ],
  },
  {
    name: "Pecel Lele Lamongan Bang Udin",
    description: "Pecel lele goreng crispy dengan sambal terasi segar. Lalapan lengkap dan nasi pulen tersedia.",
    address: "Jl. Raya Bogor KM 28, Depok, Jawa Barat 16414",
    latitude: -6.4025,
    longitude: 106.8425,
    average_price: 13000,
    price_category: "MURAH",
    rating: 4.2,
    phone: "021-8712456",
    opening_hours: "10:00 - 22:00",
    categories: ["Ayam Goreng"],
    images: [
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
    ],
  },
  {
    name: "Sate Ayam Madura Pak Dul",
    description: "Sate ayam Madura dengan bumbu kacang tradisional yang lezat. Porsi besar, harga terjangkau.",
    address: "Jl. Diponegoro No. 78, Surabaya, Jawa Timur 60241",
    latitude: -7.2832,
    longitude: 112.7432,
    average_price: 16000,
    price_category: "MENENGAH",
    rating: 4.4,
    phone: "031-5671234",
    opening_hours: "09:00 - 22:00",
    categories: ["Masakan Jawa"],
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create food categories
  const createdCategories: Record<string, number> = {};
  for (const cat of foodCategories) {
    const created = await prisma.foodCategory.upsert({
      where: { id: foodCategories.indexOf(cat) + 1 },
      update: {},
      create: { name: cat.name, description: cat.description },
    });
    createdCategories[cat.name] = created.id;
  }
  console.log(`✅ Created ${foodCategories.length} food categories`);

  // Create restaurants
  for (const r of restaurants) {
    const { categories, images, ...data } = r;
    const restaurant = await prisma.restaurant.create({
      data: {
        ...data,
        images: {
          create: images.map((url, i) => ({
            image_url: url,
            is_primary: i === 0,
          })),
        },
        categories: {
          create: categories
            .filter((c) => createdCategories[c] !== undefined)
            .map((c) => ({
              category: { connect: { id: createdCategories[c] } },
            })),
        },
      },
    });
    console.log(`  ✅ ${restaurant.name}`);
  }

  console.log(`✅ Seeded ${restaurants.length} restaurants`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
