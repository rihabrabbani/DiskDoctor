import type { NextConfig } from "next";
import type { ImageConfig } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;