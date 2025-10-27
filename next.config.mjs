/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/rcls-web',
  assetPrefix: '/rcls-web/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
