# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Bump `@ctrl/tinycolor` to version `3.1.2`.
- Bump other devDependencies.

## [3.2.1] - 2020-05-17

### Changed
- Bump Kotlin to version `1.3.72`.
- Bump most JS/TS dependencies.

## [3.2.0] - 2020-02-29

### Added

- iOS specific: `entersReaderIfAvailable` setting to instruct Safari to enter in Reader mode, if available (thanks to [@fonov](https://github.com/fonov)).
- iOS specific: `dismissButtonStyle` setting to change the label of the dismiss button.

## [3.1.4] - 2020-01-12

### Changed

- `tinycolor2` was replaced with the fork `@ctrl/tinycolor` because the the former has not received any update since 2016.

## [3.1.3] - 2019-12-14

### Fixed

- The React peer dependency is now `16.8.6` as needed by RN 0.60.0 and upwards.

### Changed

- Bump TypeScript to version `3.7.3`.

## [3.1.2] - 2019-10-19

### Added

- Compatibility with React Native `0.61.0`.
- Flow typings for Android `warmup` and `mayLaunchUrl` methods.

### Fixed

- On iOS, `threading violation` exception thrown while invoking `closeInApp` (thanks to [@fonov](https://github.com/fonov)).

## [3.1.1] - 2019-09-01

### Fixed

- On Android, crash on app launch when there are no Custom Tabs compatible browsers available.

## [3.1.0] - 2019-08-06

### Added

- Android specific `warmup` and `mayLaunchUrl` methods to reduce custom tab activity start time.

## [3.0.0] - 2019-07-13

### Added

- Compatibility with React Native `0.60.0` and, with it, [autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md): no need to manually link anymore.

### Removed

- Compatibility with React Native versions below `0.60.0`. If you need to use an older version of React Native, check the [compatibility table](https://github.com/matei-radu/react-native-in-app-browser#compatibility) to use the appropriate package.

### Changed

- iOS podspec file has been updated to support React Native `0.60.0`.
- Bump Kotlin to version `1.3.31`.
- Remove explicit Android Build Tools version from Gradle configuration.

## [2.0.0] - 2019-06-01

### Removed

The following deprecated functions have been removed. Please see
[Migrating from 1.x to 2.x](https://github.com/matt-block/react-native-in-app-browser/wiki/Migrating-from-1.x-to-2.x) for more details.

- `openInApp`, use `InAppBrowser.open` instead.
- `initialize`, use `InAppBrowser.configure` instead.
- `closeInAppInstance`, use `InAppBrowser.close` instead.

## [1.4.1] - 2019-04-19

### Fixed

- Packaging script typo that prevended NPM interoperability (thanks to [@a6kme](https://github.com/a6kme)).

### Changed

- Android `getBitmapFromUriOrDrawable` has been refactored for better maintainability.
- Android `convertDpToPixel` has been replaced with Facebook's `PixelUtil.toPixelFromDIP` since it's more tested and reliable.

## [1.4.0] - 2019-03-01

### Added

- Object `InAppBrowser` with methods:
  - `open` as a drop-in replacement for `openInApp`,
  - `configure` as a drop-in replacement for `initialize`,
  - `close` as a drop-in replacement for `closeInAppInstance`.

### Deprecated

The following functions have been deprecated. Please see
[Migrating from 1.x to 2.x](https://github.com/matt-block/react-native-in-app-browser/wiki/Migrating-from-1.x-to-2.x) for more details.

- `openInApp`, use `InAppBrowser.open` instead.
- `initialize`, use `InAppBrowser.configure` instead.
- `closeInAppInstance`, use `InAppBrowser.close` instead.

## [1.3.0] - 2019-02-27

### Added

- Example project in the `example` directory.

### Changed

- Color properties (`toolbarColor`, `preferredBarTintColor` and `preferredControlTintColor`) now
  accept more color formats. Please refer to TinyColor's [Accepted String Input](https://github.com/bgrins/TinyColor#accepted-string-input) to see all available formats.
- The iOS `.podspec` will now automatically stay in sync with `package.json` (thanks to [@ericlewis](https://github.com/ericlewis)).

## [1.2.7] - 2019-02-21

### Added

- Compatibility with React Native `0.59.0`.

### Fixed

- Missing Flow definitions for `closeInAppInstance`.
- Outdated iOS podspec file.

### Changed

- Bump Kotlin to version `1.3.21`.
- Minor refactoring of `settings.ts`.

## [1.2.4] - 2019-01-29

### Added

- Compatibility with React Native `0.58.0`.

### Fixed

- Possible iOS crashes due to thread clashing (thanks to [@yoneapp](https://github.com/yoneapp))

### Changed

- Bump Android target from `26` to `27` (same as React Native `0.58.0`).
- Bump Android build tools from `27.0.3` to `28.0.2` (same as React Native `0.58.0`).
- Bump Android compile vesion from `27` to `28` (same as React Native `0.58.0`).
- Bump Android Gradle tools from `3.1.4` to `3.2.0` (same as React Native `0.58.0`).

## [1.2.1] - 2019-01-10

### Fixed

- Typo in the iOS `openInApp` function that prevented compilation.

## [1.2.0] - 2019-01-08

### Added

- `closeInAppInstance`: programmatically close the in-app browser (works for iOS only).

## [1.1.2] - 2018-12-05

### Changed

- Relax Xcode project compatibility version to `8.0`.

## [1.1.1] - 2018-10-30

### Changed

- Bump Kotlin to version `1.3.0`.
- Update other dependencies.

## [1.1.0] - 2018-10-14

### Added

- `initialize`: initialize the settings of the in-app browser so that each `openInApp` call won't need to specify them each time.

### Changed

- Minor refactoring.

## [1.0.1] - 2018-10-07

### Changed

- Test release necessary to evaluate the CircleCI integration and auto publishing to NPM.

## [1.0.0] - 2018-10-03

### Added

- `openInApp`: open a valid http(s) URL with an in-app browser.

[Unreleased]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.2.1...HEAD
[3.2.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.1.4...v3.2.0
[3.1.4]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.1.3...v3.1.4
[3.1.3]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.1.2...v3.1.3
[3.1.2]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.1.1...v3.1.2
[3.1.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.4.1...v2.0.0
[1.4.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.2.7...v1.3.0
[1.2.7]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.2.4...v1.2.7
[1.2.4]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.2.1...v1.2.4
[1.2.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/matei-radu/react-native-in-app-browser/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/matei-radu/react-native-in-app-browser/compare/f06ef51f19295b73f8b51a8ba21932bf87fcb4a8...v1.0.0
