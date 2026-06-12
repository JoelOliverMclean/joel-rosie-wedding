import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "story-images.joelandrosie.wedding",
      },
    ],
  },
};

export default nextConfig;
