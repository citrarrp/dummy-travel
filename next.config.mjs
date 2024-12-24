/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "asset.kompas.com",
        port: "",
        pathname: "/crops/**",
      },
      {
        protocol: "https",
        hostname: "visitingjogja.jogjaprov.go.id",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wartaptm.id",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.connollycove.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "baliunforgetablemoments.weebly.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.wandernesia.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
