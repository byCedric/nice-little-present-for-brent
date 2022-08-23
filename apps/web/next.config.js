const withTranspile = require('next-transpile-modules')([
  '@acme/ui',
  'react-native-web',
]);

/** @type {import('next').NextConfig} */
module.exports = withTranspile({
  reactStrictMode: true,
  experimental: {
    images: {
        unoptimized: true
    }
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.ts",
      ".web.tsx",
      ".web.js",
      ".web.jsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
});
