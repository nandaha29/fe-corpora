/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable image optimization (was disabled)
  images: {
    // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'],
    // Allow images from these domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
    ],
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress output
  compress: true,
  // Target modern browsers to avoid unnecessary polyfills
  // This reduces legacy JavaScript by ~22 KiB
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // Remove React properties in production for smaller bundle
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  // Experimental features for better optimization
  experimental: {
    // Optimize package imports - tree shake unused exports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      'framer-motion',
      'date-fns',
    ],
    // Optimize CSS - inline critical CSS and defer non-critical
    optimizeCss: true,
  },
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
          minSize: 20000, // Only create chunks for modules >= 20KB
          maxSize: 244000, // Try to keep chunks under 244KB
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks for better caching
            // Split framework into smaller chunks to reduce unused code
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 50,
              enforce: true,
              minChunks: 1,
              // Split large framework chunks
              maxSize: 100000, // 100KB max per framework chunk
            },
            // Separate heavy 3D libraries (lazy loaded)
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three|globe\.gl|kapsule|frame-ticker)[\\/]/,
              priority: 40,
              enforce: true,
              minChunks: 1,
            },
            // Separate animation library (framer-motion)
            animations: {
              name: 'animations',
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              priority: 35,
              enforce: true,
              minChunks: 1,
            },
            // Separate editor libraries (tiptap - likely only used in admin)
            editor: {
              name: 'editor',
              test: /[\\/]node_modules[\\/](@tiptap)[\\/]/,
              priority: 35,
              enforce: true,
              minChunks: 1,
            },
            // Separate charting library (recharts)
            charts: {
              name: 'charts',
              test: /[\\/]node_modules[\\/](recharts)[\\/]/,
              priority: 35,
              enforce: true,
              minChunks: 1,
            },
            // Separate Radix UI components (only load what's used)
            radix: {
              name: 'radix',
              test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
              priority: 30,
              enforce: true,
              minChunks: 1,
            },
            // Other vendors - only bundle if used in multiple places
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minChunks: 2, // Only bundle if used in 2+ places
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
            // Common chunks - only if used in multiple places
            common: {
              name: 'common',
              minChunks: 3, // Increased from 2 to 3 to reduce unused code
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
        // Tree shaking optimization
        sideEffects: false,
        // Enable module concatenation for better tree shaking
        concatenateModules: true,
        // More aggressive tree shaking
        providedExports: true,
        // Minimize unused exports
        minimize: !dev,
      }
    }
    
    return config
  },
}

export default nextConfig
