# Contributing to React Native In-App Browser
Thank you for even just considering to contribute to this package. Seeing people using and improving my projects, either by reporting bugs or making PRs, brings me more joy than it probably should :heart:

## Table of Contents
- [Bug Reporting](#bug-reporting)
  - [Valuable Environment Data](#valuable-environment-data)
- [Code Contributions and PRs](#code-contributions-and-prs)
  - [Tests](#tests)
  - [Code Styles](#code-styles)
- [License](#license)

## Bug Reporting
If you're new to this package, please check the [API Wiki](https://github.com/matei-radu/react-native-in-app-browser/wiki/Api) first to exclude misuse and misconfiguration.

Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/matei-radu/react-native-in-app-browser/issues). If it has already been reported, add a comment to that issue describing your scenario and add your [environment data](#valuable-environment-data).

If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/matei-radu/react-native-in-app-browser/issues/new). Be sure to include a **title and clear description**, your [environment data](#valuable-environment-data), as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Valuable Environment Data
It is important to understand under which conditions problems occur. Please follow these steps and add the information you find to your bug report.

Firstly, the version of React Native In-App Browser you are using. This can be found in your project's `package.json` under `dependencies`:

```javascript
{
  "name": "your project",
  // ...
  "dependencies": {
    "@matt-block/react-native-in-app-browser": "^3.1.0",
    // other dependencies
  }
}

```

Next, an overview of your working environment is needed. The React Native CLI provides the `info` command to streamline the process of collecting the relevant data:

```sh
# Yarn
yarn react-native info

# npm
npx react-native info
```

Which will output something similar to this:

```
  React Native Environment Info:
    System:
      OS: Linux 5.0 Ubuntu 18.04.3 LTS (Bionic Beaver)
      CPU: (4) x64 Intel(R) Core(TM) i5-7300HQ CPU @ 2.50GHz
      Memory: 7.35 GB / 15.53 GB
      Shell: 4.4.20 - /bin/bash
    Binaries:
      Node: 12.13.0 - ~/.nvm/versions/node/v12.13.0/bin/node
      Yarn: 1.19.1 - /usr/bin/yarn
      npm: 6.12.0 - ~/.nvm/versions/node/v12.13.0/bin/npm
    npmPackages:
      react: 16.6.3 => 16.6.3
      react-native: 0.58.5 => 0.58.5
```

#### Devices
If the error seems to be occuring only on specific devices and/or platforms, report the device specs and OS version.

#### TypeScript/Flow
If you are using [TypeScript](https://www.typescriptlang.org/) or [Flow](https://flow.org) for static type checking, report your version. This can be found in your `package.json` dependencies, in your `.flowconfig` under the [`[version]`](https://flow.org/en/docs/config/version/) section (Flow only) or by running `tsc --v` (TypeScript only).

## Code Contributions and PRs
### Tests
This project uses [Jest](https://jestjs.io/) for unit testing. To run the complete test suite, run:

```bash
yarn test
```

#### What to Test
React Native In-App Browser is a wrapper around [Chrome Custom Tabs](https://developer.chrome.com/multidevice/android/customtabs) and [Safari View Controller](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller) and, because of that, the only meaningful things to test are functions that validate and sanitize arguments passed to [`InAppBrowser` methods](https://github.com/matei-radu/react-native-in-app-browser/wiki/InAppBrowser#methods).

Consequently, all tests are at the JavaScript-level and this keeps things simple. However, if you think that this project is missing some valuable native-level unit tests, feel free to [open a PR](https://github.com/matei-radu/react-native-in-app-browser/pulls).

### Code Styles
#### TypeScript
This project uses [ESLint](https://eslint.org/) to keep a consistent coding style.

It is recommended to use an IDE that can be _ESLint aware_ so that you can get live hints and errors while editing code.

Regardless if you use an IDE with ESLint integration or not, run the validation scripts before committing your changes:

```bash
# Runs ESLint on all src/ files
yarn validate:eslint

# Checks that TS types are correct
yarn validate:typescript
```

#### Kotlin
Android code is formatted with [Spotless](https://github.com/diffplug/spotless). Before committing your changes, run the validation script to check for formatting errors:

```
yarn validate:android
```
## License
By contributing your code, you agree to license your contribution under the [MIT License](https://github.com/matei-radu/react-native-in-app-browser/blob/main/LICENSE).
