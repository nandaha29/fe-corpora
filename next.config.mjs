/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Compress output
  compress: true,
  // Note: swcMinify is enabled by default in Next.js 15, no need to specify
  webpack: (config, { isServer, dev }) => {
    // Handle three.js and related dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }
    
    // Optimize bundle splitting for better code splitting
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks for better caching
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Separate heavy 3D libraries
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three|globe\.gl|kapsule|frame-ticker)[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Other vendors
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // CSS extraction
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 10,
            },
            // Common chunks
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // Tree shaking optimization (removed usedExports as it conflicts with cacheUnaffected)
        sideEffects: false,
      }
    }
    
    return config
  },
}

export default nextConfig
