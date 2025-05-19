import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "connect-src 'self' https://uhqkuvvretjkdlmhdqfp.supabase.co",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src * data:",
              "script-src 'self' 'unsafe-inline'"
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
