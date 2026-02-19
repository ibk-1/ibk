/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Repo name: ibk-1/ibk → Pages URL: ibk-1.github.io/ibk
  basePath: process.env.NODE_ENV === 'production' ? '/ibk' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ibk/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
