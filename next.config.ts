import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Protege contra XSS e injeções de scripts
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              img-src * data:;
              media-src 'self';
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com data:;
              frame-ancestors 'self';
            `.replace(/\s{2,}/g, " "),
          },
          // Remove informações do servidor
          {
            key: "X-Powered-By",
            value: "Next.js",
          },
          // Protege contra cliques maliciosos em iframes
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Protege contra sniffing de MIME
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Protege contra ataques de clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Configura o comportamento do navegador em relação a scripts de terceiros
          {
            key: "Permissions-Policy",
            value: "fullscreen=(self), geolocation=(), microphone=(), camera=(), browsing-topics=()",
          },
          // Habilita HTTPS para o site
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Protege contra ataques XSS em navegadores modernos
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Protege contra ataques CSRF
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
