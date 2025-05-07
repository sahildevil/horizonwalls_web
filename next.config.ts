import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "fra.cloud.appwrite.io", // Add the Appwrite domain here
    ],
    // Alternatively, you can use remotePatterns for more precise control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/v1/storage/**',
      },
    ],
  },
};

export default nextConfig;
