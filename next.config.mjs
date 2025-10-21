/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fast Refresh'i tamamen devre dışı bırak
  reactStrictMode: false,
  
  // Development optimizations
  compiler: {
    removeConsole: false,
  },
  
  // Images
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'atkigetir-backend.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.atkigetir.com',
        pathname: '/uploads/**',
      },
    ],
  },
  
  // Webpack config - Fast Refresh'i tamamen kapat
  webpack: (config, { dev }) => {
    if (dev) {
      // Hot reload'u tamamen devre dışı bırak
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
      };
      
      // Fast Refresh plugin'ini kaldır
      config.plugins = config.plugins.filter(plugin => {
        return plugin.constructor.name !== 'ReactRefreshPlugin';
      });
    }
    
    return config;
  },
  
  // Dev server ayarları
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  
  // Experimental features
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
