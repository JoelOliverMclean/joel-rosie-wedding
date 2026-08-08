import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "story-images.joelandrosie.wedding",
      },
      { protocol: "https", hostname: "pixabay.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
