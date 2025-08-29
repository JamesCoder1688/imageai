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
  
  // Disable webpack caching for Cloudflare Pages
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Disable persistent caching to avoid large cache files
    if (!dev) {
      config.cache = false;
    }
    
    // Configure chunk splitting for both client and server
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244000, // ~240KB per chunk
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: isServer ? 'server-vendor' : 'client-vendor',
          priority: -10,
          chunks: 'all',
          maxSize: 244000, // ~240KB per chunk
        },
      },
    };
    
    return config;
  },
}

module.exports = nextConfig