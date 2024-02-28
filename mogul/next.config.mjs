/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // basePath: '/public',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
