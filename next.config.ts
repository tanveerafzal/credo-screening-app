import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/aml-screening",
        destination: "/screening",
        permanent: true,
      },
      {
        source: "/sanctions-screening",
        destination: "/screening",
        permanent: true,
      },
      {
        source: "/ofac-screening",
        destination: "/screening",
        permanent: true,
      },
      {
        source: "/kyc-verification",
        destination: "/credo-id-verification",
        permanent: true,
      },
      {
        source: "/id-verification",
        destination: "/credo-id-verification",
        permanent: true,
      },
      {
        source: "/id-verification/:path*",
        destination: "/credo-id-verification/:path*",
        permanent: true,
      },
      {
        source: "/trusted-signatures",
        destination: "/credo-trusted-signatures",
        permanent: true,
      },
      {
        source: "/trusted-signatures/:path*",
        destination: "/credo-trusted-signatures/:path*",
        permanent: true,
      },
      {
        source: "/onboarding",
        destination: "/credo-onboarding",
        permanent: true,
      },
      {
        source: "/onboarding/:path*",
        destination: "/credo-onboarding/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "trustcredo.com" }],
        destination: "https://www.credoscreening.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.trustcredo.com" }],
        destination: "https://www.credoscreening.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
