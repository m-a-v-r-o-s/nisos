/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@rentals/db"],
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};
export default nextConfig;
