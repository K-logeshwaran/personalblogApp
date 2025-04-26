/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{domains:["images.pexels.com"]},
  eslint:{
    ignoreDuringBuilds:true
  },
  // env:{
  //   //SECRET_KEY: "i6Iu7bxTmWMParI9LcQJxnM" 
  // }
}

module.exports = nextConfig
