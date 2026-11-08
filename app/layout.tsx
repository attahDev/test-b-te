import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import SiteEnhancements from "./components/SiteEnhancements";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Black Tech Expo - More Than A Network",
  description:
    "BTE connects Black talent to the networks, skills, technology and capital that compound into community ownership.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><SiteEnhancements />{children}</body>
    </html>
  );
}
