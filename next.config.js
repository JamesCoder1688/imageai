/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Cloudflare Pages with Functions support
  images: {
    unoptimized: true,
  },
  // Keep API routes enabled for Cloudflare Functions
}

module.exports = nextConfig