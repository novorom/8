/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pvi.cersanit.ru",
      },
      {
        protocol: "https",
        hostname: "images.weserv.nl",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cersanit-spb.ru" }],
        destination: "https://cersanit-spb.ru/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
