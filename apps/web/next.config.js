const path = require('path');
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
      "react-native$": 'react-native-web', 
    };

    // workaround for Yarn Berry, it tries to resolve react-native-web from @acme/ui
    if (process.env.YARN_WORKAROUND) {
      config.resolve.modules = [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../../node_modules'),
        path.resolve(__dirname, '../../packages/ui/node_modules'),
      ];
    }

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
