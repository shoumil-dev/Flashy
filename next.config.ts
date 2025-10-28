import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/quiz",
        permanent: true, // use false if you want it temporary during testing
      },
    ];
  },
};

export default nextConfig;
