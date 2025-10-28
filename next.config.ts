import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// 👇 Add this line to ensure CommonJS compatibility
module.exports = nextConfig;
