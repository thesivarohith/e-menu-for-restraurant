import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SUVAI | Menu",
  description: "Crafted with fire. Served with soul. Discover our exquisite menu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased font-sans`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
