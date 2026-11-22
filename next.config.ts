import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin({
  experimental: {
    srcPath: "./",
    extract: {
      sourceLocale: "en",
    },
    messages: {
      path: "./messages",
      format: "json",
      locales: ["en"],
    },
  },
});
const nextConfig: NextConfig = {
  output: "export",
  async headers() {
    return [
      {
        source: "/x2t/x2t.wasm",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
        ],
      },
      {
        source: "/x2t-:суффикс/:путь*",
        headers: [
          {
            key: "Content-Encoding",
            value: "br",
          },
          {
            key: "Cache-Control",
            value: "общедоступный, максимальный возраст = 31556952, неизменяемый",
          },
        ],
      },
    ];
  },
};
export default withNextIntl(nextConfig);