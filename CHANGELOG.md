# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Compatibility with React Native `0.59.0`.

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

[1.2.4]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.2.1...v1.2.4
[1.2.1]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/matt-block/react-native-in-app-browser/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/matt-block/react-native-in-app-browser/compare/f06ef51f19295b73f8b51a8ba21932bf87fcb4a8...v1.0.0
