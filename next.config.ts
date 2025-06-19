import type { NextConfig } from "next";
import type { ImageConfig } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'localhost', 'res.cloudinary.com'],
  },
};

export default nextConfig;