import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Next.js ignorera ESLint lors de `next build`
  },
};

export default nextConfig;
