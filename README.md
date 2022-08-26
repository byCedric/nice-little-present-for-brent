# Expo Monorepo

This example shows an Expo monorepo with multiple React and React Native versions.

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

## Package manager config

Each package manager requires a specific config to work with React Native. Some newer packagers, like pnpm and yarn berry, have concepts like Plug'n'Play. Fundamentally, that doesn't work with React Native because we refer to Android/iOS files within the package. Since there is no Plug'n'Play concept in that area, we can't use it (yet).

### npm

All this package manager needs is the [workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) definition in [the root **package.json**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/package.json#L4-L7).

### pnpm

Because pnpm uses a better but slightly different **node_modules** setup, we need to make some changes here.
- First, create a [root **.npmrc**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/.npmrc) file [containing `node-linker=hoisted`](https://pnpm.io/npmrc#node-linker). The `node-linker` will make pnpm use a **node_modules** structure that is compatible with React Native, and disable Plug'n'Play.
- Then create a [root **pnpm-workspace.yaml**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/pnpm-workspace.yaml) where you [define the workspaces](https://pnpm.io/pnpm-workspace_yaml).
- Optionally, because React Native libraries often have some peer dependency issues, you could disable failing on them. In this repository, we disabled all peer dependency [errors for `@babel/*` packages](https://github.com/byCedric/nice-little-present-for-brent/blob/main/package.json#L19-L25). But, you can also [set **.npmrc** to `strict-peer-dependencies=false`](https://pnpm.io/npmrc#strict-peer-dependencies).

### Yarn (v1)

Just like NPM, all this package manager needs is the [workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) definition in [the root **package.json**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/package.json#L4-L7).

### Yarn Berry (v3)

This package manager is a bit harder to configure, mainly due to a [typing bug with React Native and React](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/59862). Funny enough, this is the only package manager where you might be running into this with this monorepo.
- Create a [root **.yarnrc.yml**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/.yarnrc.yml) file [containing `nodeLinker: node-modules`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) (Just like pnpm, to disable the plug'n'play system).
- If you run into the "is not a valid JSX element" bug, add a resolution to the [root **package.json**](https://github.com/byCedric/nice-little-present-for-brent/blob/main/package.json#L15-L18) forcing only a single React type in the monorepo.
- The Webpack configuration in **apps/web** has issues with resolving `react-native-web` for our **packages/ui** as well. It tries to resolve the `react-native-web` library that we use as a replacement for `react-native` on web from the **packages/ui/node_modules** folder. Unfortunately, `react-native-web` is only installed in **packages/web/node_modules** (or the root **node_modules**). [Check the **apps/web/webpack.config.js** for a workaround for that](https://github.com/byCedric/nice-little-present-for-brent/blob/main/apps/web/next.config.js#L22-L29).

## Package manager benchmark

In [the actions tab](https://github.com/byCedric/nice-little-present-for-brent/actions), you can see some benchmarks of all the package managers and their install time. But here is a rough overview of the performance of Expo apps.

Package manager | Average install time
---             | ---
npm             | **35s**
pnpm            | **9s**
yarn (v1)       | **45s**
yarn berry (v3) | **25s**

> These average install times are with cache enabled. [See the action for more info.](https://github.com/byCedric/nice-little-present-for-brent/blob/main/.github/workflows/benchmark.yml)

## Configuring Metro

After you've set up the preferred package manager, you'll still need to set up Metro. Usually, you could look this up [in our docs](https://docs.expo.dev/guides/monorepos). But due to [PR #18756](https://github.com/expo/expo/pull/18756) not being merged yet, [you can look this up here](https://github.com/expo/expo/blob/%40bycedric/docs/monorepo/docs/pages/guides/monorepos.md).

Happy coding!
