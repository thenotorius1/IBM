import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakanYuk – Temukan Rumah Makan Favoritmu",
  description:
    "Platform pencarian rumah makan berbasis lokasi. Temukan tempat makan terbaik sesuai anggaran dan lokasi Anda.",
  keywords: "rumah makan, restoran, kuliner, makanan, lokasi, harga murah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#FFF7ED] text-[#292524]`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
