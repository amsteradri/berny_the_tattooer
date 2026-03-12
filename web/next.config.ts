import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Unsplash sin subdominio (unsplash.com/es/fotos/...)
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        // Supabase Storage — imágenes subidas por el admin
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
