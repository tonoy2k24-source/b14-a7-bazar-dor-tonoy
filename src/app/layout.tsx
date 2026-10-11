import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার দর ট্র্যাকার",
  description: "আজকের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার বাজার দর এক নজরে দেখুন।",
  keywords: ["বাজার দর", "BazarDor", "Market Price Bangladesh", "Daily Bazar Rate"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-[#F8F9FA]`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}