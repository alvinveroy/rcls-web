/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/rcls-web',
  assetPrefix: '/rcls-web/',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/rcls-web',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
