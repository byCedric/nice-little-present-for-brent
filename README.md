# Expo Monorepo

This example shows an Expo monorepo, with multiple React and React Native versions.

It works because of the latest fix mentioned in [PR #18756](https://github.com/expo/expo/pull/18756)

## Versions

| App        | React    | React Dom | React Native | React Native Web |
| ---------- | -------- | --------- | ------------ | ---------------- |
| **sdk-43** | `17.0.1` | `17.0.1`  | `0.64.3`     | `0.17.1`         |
| **sdk-44** | `17.0.1` | `17.0.1`  | `0.64.3`     | `0.17.1`         |
| **sdk-45** | `17.0.2` | `17.0.2`  | `0.68.2`     | `0.17.1`         |
| **sdk-46** | `18.0.0` | `18.0.0`  | `0.69.4`     | `0.18.7`         |
| **web**    | `18.2.0` | `18.2.0`  | -            | `0.18.7`         |

## Test it

```bash
# Install all dependencies
$ npm|pnpm|yarn install
# Build the packages + next app
$ (npm run)|pnpm|yarn build

# Go to an app
$ cd apps/<app>

# Expo projects
$ npm|pnpm|yarn start
# Next project
$ npm|pnpm|yarn dev 
```
