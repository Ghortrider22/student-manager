import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Nexus | Enterprise Student Manager",
  description: "High-end student management platform for elite institutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
