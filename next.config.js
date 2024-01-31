/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-hook-mousetrap'],
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_URL_SERVER}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
  //     },
  //     {
  //       source: "/storage/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_URL_SERVER_STORAGE}/:path*`, // Thay đổi địa chỉ IP và cổng tại đây
  //     },
  //   ];
  // },
}

module.exports = nextConfig
