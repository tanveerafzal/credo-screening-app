import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "trustcredo.com" }],
        destination: "https://credoscreening.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.trustcredo.com" }],
        destination: "https://credoscreening.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.credoscreening.com" }],
        destination: "https://credoscreening.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
