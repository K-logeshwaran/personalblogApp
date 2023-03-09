/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{domains:["images.pexels.com"]},
  eslint:{
    ignoreDuringBuilds:true
  }
}

module.exports = nextConfig
