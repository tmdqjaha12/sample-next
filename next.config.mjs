/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_DEV_API_BASE_URL: process.env.NEXT_PUBLIC_DEV_API_BASE_URL,
    NEXT_PUBLIC_PRO_API_BASE_URL: process.env.NEXT_PUBLIC_PRO_API_BASE_URL,
  },
};

export default nextConfig;
