# React Native In-App Browser

[![npm (scoped)][npm_shield]][npm] [![CircleCI][circleci_shield]][circleci] ![license: mit][license_shield]

In-App browser support for React Native, using [Chrome Custom Tabs][chromecustomtabs]
on Android
and [Safari View Controller][sfsafariviewcontroller] on iOS.

### Features

- [x] Typescript and Flow definitions
- [x] Actively developed

## Compatibility

This library will always target the most recent React Native package. If you are
using an older release of React Native, use the correct version of this library
from the compatibility table below (if available):

|   React Native    |                  Library                  |   Status   | End-of-Life |
| :---------------: | :---------------------------------------: | :--------: | :---------: |
|    `>= 0.60.0`    |    [![npm (scoped)][npm_shield]][npm]     | **Active** | Not planned |
| `0.57.x - 0.59.x` | [![npm v2 (scoped)][npm_2_shield]][npm_2] | **Active** | 2020-01-03  |

**Using Expo?** Check out [WebBrowser](https://docs.expo.io/versions/latest/sdk/webbrowser/).

## Installation

Install the package via Yarn or npm:

```sh
yarn add @matt-block/react-native-in-app-browser

# or
npm install --save @matt-block/react-native-in-app-browser
```

## Linking

### React Native `0.60.0` and later

Packages are [autolinked](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md),
however an extra step for iOS projects is needed:

```sh
cd ios && pod install && cd ..
```

### React Native `0.59.x` and below

Manually link the native module to your project:

```sh
react-native link @matt-block/react-native-in-app-browser
```

### Note for iOS projects

In order for Xcode projects to build when using Swift-based libraries, your
main app project must contain Swift code and a bridging header. If your app
project does not contain any Swift code, add a single empty `.swift` file and an
empty bridging header to your app.

If your Xcode project already makes use of Swift code you can safely ignore this
note.

## Usage

> ⚠️ Still using an older version ? Check out the [migration guides](https://github.com/matei-radu/react-native-in-app-browser/wiki/Migration-Guides).

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";


// Minimal setup.
InAppBrowser.open("https://www.wikipedia.org/").catch(error => {
  console.log(error);
});


// With platform-specific optional settings.
InAppBrowser.open("https://www.wikipedia.org/", {
  android: {
    //...,
  },
  ios: {
    //...,
  },
}).catch(error => {
  console.log(error);
});


// Using async/await.
async onClickHandler() {
  try {
    await InAppBrowser.open("https://www.wikipedia.org/");
  } catch (error) {
    console.log(error);
  }
}
```

### Startup optimizations (Android only)

Chrome Custom Tabs exposes methods to reduce the start time of a custom tab activity.

For information on how these work, check [Custom Tabs - Example and Usage Optimization](https://chromium.googlesource.com/external/github.com/GoogleChrome/custom-tabs-client/+/08e2c9155aff7296428aae854769c30b4060ae88/README.md#optimization)

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

InAppBrowser.warmup();
InAppBrowser.mayLaunchUrl("https://wikipedia.org");
```

### Programmatically close (iOS only)

It is possible to manually dismiss the iOS in-app instance by calling the method `close`.

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

InAppBrowser.close();
```

This is not possible on Android since Chrome Custom Tabs do not expose such functionality and [Activity workarounds][customtabsmanualclose] would bring this package way out of scope.

## Settings

The main method `open` accepts an object with settings objects for each
platform:

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

InAppBrowser.open("https://www.wikipedia.org/", {
  android: {},
  ios: {}
});
```

Settings can also be initialized separately with `configure` so that each `open` call won't need to specify them each time:

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

// Somewhere in your app initialization logic.
InAppBrowser.configure({
  android: {},
  ios: {}
});

// Other part of your code base.
// Previously initialized settings will apply.
InAppBrowser.open("https://www.wikipedia.org/");
```

Note that `open` will still accept settings as always but will effectively perform a merge between the initialized properties and the provided settings object (which will have priority over the initialized properties):

```javascript
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";

// Somewhere in your app initialization logic.
InAppBrowser.configure({
  android: {
    toolbarColor: "red",
    showTitle: true
  }
});

// Other part of your code base.
// Merged settings for this call will result in:
//
// - toolbarColor: "blue",
// - showTitle: true
InAppBrowser.open("https://www.wikipedia.org/", {
  android: {
    toolbarColor: "blue"
  }
});
```

The properties for each platform settings are described below.

### Android

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used.

| Setting               | Type                                                | Default     | Description                                                                                                                |
| --------------------- | --------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `toolbarColor`        | `string`                                            | `undefined` | The color to tint the background of the toolbar.<br/>Provided color can be in any [TinyColor][tinycolor] supported format. |
| `showTitle`           | `boolean`                                           | `false`     | Flag to toggle if the page title should be shown in the custom tab.                                                        |
| `closeButtonIcon`     | `string` _(as resolved by importing an image file)_ | `undefined` | Custom close button icon.<br/><br/>Provided icon must be a `.png`, `.jpg`, or `.gif` file.                                 |
| `addDefaultShareMenu` | `boolean`                                           | `false`     | Flag to toggle the default share menu.                                                                                     |

### iOS

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used. Also, settings that are not
supported by the iOS version at runtime will be ignored as well.

| Setting                     | Type      | Default     | Description                                                                                                                                                                                    |
| --------------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preferredBarTintColor`     | `string`  | `undefined` | The color to tint the background of the navigation bar and the toolbar.<br/>Provided color can be in any [TinyColor][tinycolor] supported format.<br/><br/>**Available on**: iOS >= 10.0.      |
| `preferredControlTintColor` | `string`  | `undefined` | The color to tint the control buttons on the navigation bar and the toolbar.<br/>Provided color can be in any [TinyColor][tinycolor] supported format.<br/><br/>**Available on**: iOS >= 10.0. |
| `barCollapsingEnabled`      | `boolean` | `true`      | **Available on**: iOS >= 11.0.                                                                                                                                                                 |

## Example

An example project showcasing the various configurations can be found in the
`example` directory.
Simply clone this repository, navigate into `example`, install the dependencies
and run the app.

```sh
git clone https://github.com/matei-radu/react-native-in-app-browser.git
cd react-native-in-app-browser/example
npm install #or yarn install
$ react-native run-android #or react-native run-ios
```

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[chromecustomtabs]: https://developer.chrome.com/multidevice/android/customtabs
[customtabsmanualclose]: https://stackoverflow.com/a/41596629/1887860
[sfsafariviewcontroller]: https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller
[license]: https://github.com/matei-radu/react-native-in-app-browser/blob/master/LICENSE
[license_shield]: https://img.shields.io/badge/license-MIT-blue.svg
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
[npm]: https://www.npmjs.com/package/@matt-block/react-native-in-app-browser
[npm_shield]: https://img.shields.io/npm/v/@matt-block/react-native-in-app-browser/latest
[npm_2]: https://www.npmjs.com/package/@matt-block/react-native-in-app-browser/v/2.1.2
[npm_2_shield]: https://img.shields.io/npm/v/@matt-block/react-native-in-app-browser/legacy
[circleci]: https://circleci.com/gh/matei-radu/react-native-in-app-browser/tree/master
[circleci_shield]: https://circleci.com/gh/matei-radu/react-native-in-app-browser/tree/master.svg?style=shield
[tinycolor]: https://github.com/bgrins/TinyColor
