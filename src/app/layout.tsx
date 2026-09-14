import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "CropWise | Plant with Information, Not Assumptions",
  description:
    "Agricultural intelligence platform in Cambodia preventing crop oversupply and climate losses for smallholder farmers.",
  keywords: [
    "Cambodia agriculture",
    "crop oversupply prevention",
    "climate resilience",
    "smallholder farmers",
    "market intelligence",
    "Battambang cassava",
    "Takeo mung beans",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#F7F9F6] text-[#1C241D] antialiased selection:bg-[#2D924F] selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
