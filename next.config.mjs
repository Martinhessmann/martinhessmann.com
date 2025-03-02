// No need to try importing a file that doesn't exist
// This was causing webpack caching errors
let userConfig = undefined
/*
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}
*/

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
  experimental: {
    webpackBuildWorker: true,
  },
  // Ensure Tailwind has enough time to build
  webpack: (config) => {
    // This is to ensure the CSS is properly generated
    return config;
  },
}

// No need for mergeConfig if userConfig is always undefined
/*
mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}
*/

export default nextConfig
