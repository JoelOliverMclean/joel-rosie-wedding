import type { Metadata } from "next";
import { Metamorphous } from "next/font/google";
import "./globals.css";

const metamorphous = Metamorphous({
  weight: "400",
  subsets: ["latin"],
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
