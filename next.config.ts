import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gyubuntu.duckdns.org",
      },
    ],
  },
};

export default nextConfig;
