import withBundleAnalyzer from "@next/bundle-analyzer";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_DEV_API_BASE_URL: process.env.NEXT_PUBLIC_DEV_API_BASE_URL,
    NEXT_PUBLIC_PRO_API_BASE_URL: process.env.NEXT_PUBLIC_PRO_API_BASE_URL,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server", // 'static', 'server', 'disabled' 중 하나 선택
          openAnalyzer: true, // 분석 후 브라우저에서 열지 여부
          // reportFilename: 'report.html', // 생성될 리포트 파일 이름
        })
      );
    }
    return config;
  },
});

export default nextConfig;
