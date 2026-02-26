import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizePackageImports: ["lucide-react"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
