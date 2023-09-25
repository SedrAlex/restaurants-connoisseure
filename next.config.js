/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
        {
            protocol: "https",
            hostname: "images.unsplash.com"
        },
        {
            protocol: "https",
            hostname: "i1.fnp.com"
        },
    ],
 }
}

module.exports = nextConfig
