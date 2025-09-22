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
        <div className="flex min-h-screen flex-col items-center gap-10 p-4 sm:p-10 md:items-start">
          <div className="w-full select-none text-shadow-lg">
            <p className="text-xl">The wedding of</p>
            <h1>Joel &</h1>
            <h1>Rosie</h1>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
