/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.weserv.nl" },
      { protocol: "https", hostname: "pvi.cersanit.ru" },
      { protocol: "https", hostname: "www.kerama-marazzi.com" },
      { protocol: "https", hostname: "kerama-marazzi.com" },
      { protocol: "https", hostname: "azori.ru" },
      { protocol: "https", hostname: "www.azori.ru" },
      { protocol: "https", hostname: "nefrit.ru" },
      { protocol: "https", hostname: "www.nefrit.ru" },
      { protocol: "https", hostname: "plitburg.ru" },
      { protocol: "https", hostname: "www.plitburg.ru" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.plitki-spb.ru" }],
        destination: "https://plitki-spb.ru/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
