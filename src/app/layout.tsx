import type { Metadata } from "next";
import { Geist, Geist_Mono, Metamorphous } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metamorphous = Metamorphous({
  weight: "400",
});

export const metadata: Metadata = {
  title: "Joel & Rosie's Wedding",
  description: "A wedding website for Joel Mclean and Rosie Puttergill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${metamorphous.className} antialiased`}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
