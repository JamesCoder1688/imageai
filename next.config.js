/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for Cloudflare Pages with Functions support
  images: {
    unoptimized: true,
  },
  // Keep API routes enabled for Cloudflare Functions
  
  // Optimize for Cloudflare Pages deployment
  experimental: {
    optimizePackageImports: ['@google/generative-ai', 'framer-motion', 'lucide-react'],
  },
  
  // Reduce bundle size
  compress: true,
  
  // Configure webpack to reduce build output size
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce client-side bundle size
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 244000, // ~240KB per chunk
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig