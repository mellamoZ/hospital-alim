/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "dummyimage.com" },
      { hostname: "robohash.org" },
    ],
  },
};

export default nextConfig;
