import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/notes',
        permanent: false,  // También puedes usar 'true' para una redirección permanente
      },
    ];
  }
};

export default nextConfig;
