import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [
      {
        // 1. MATCH NESTED REFERENCE PATHS
        // Block betterauth openAPI reference paths
        source: "/api/auth/reference/:path*",
        destination: "/error", 
      },
      {
        // 2. MATCH BASE REFERENCE EXACTLY
        source: "/api/auth/reference",
        destination: "/error",
      },
      {
        source: "/api/auth/:path*",
        destination: (process.env.BACKEND_URL || "http://localhost:4000") + "/api/auth/:path*", 
      },
    ];
  },
};

export default nextConfig;
