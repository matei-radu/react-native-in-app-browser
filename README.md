# React Native In-App Browser

![license: mit][license_shield] [![code style: prettier][prettier_shield]][prettier]

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

| React Native | Library |
| :----------: | :-----: |
|    0.57.x    | latest  |

## Installation

Install the package via Yarn or npm:

```
yarn add @matt-block/react-native-in-app-browser

// or

npm install --save @matt-block/react-native-in-app-browser
```

Proceed to link the native module to your project:

```
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

- Individual example snippets

```javascript
import openInApp from '@matt-block/react-native-in-app-browser';


// Minimal setup.
openInApp("https://www.wikipedia.org/").catch(error => {
  console.log(error);
});


// With platform-specific optional settings.
openInApp("https://www.wikipedia.org/", {
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
    await openInApp("https://www.wikipedia.org/");
  } catch (error) {
    console.log(error);
  }
}
```

## Settings

The main method `openInApp` accepts an object with settings objects for each
platform:

```javascript
openInApp("https://www.wikipedia.org/", {
  android: {},
  ios: {}
});
```

The properties for each platform settings are described below.

### Android

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used.

| Setting               | Type                                                | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `toolbarColor`        | `string`                                            | `undefined` | The color to tint the background of the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>The following names are also accepted: `red`, `blue`, `green`, `black`, `white`, `gray`, `cyan`, `magenta`, `yellow`, `lightgray`, `darkgray`, `grey`, `lightgrey`, `darkgrey`, `aqua`, `fuchsia`, `lime`, `maroon`, `navy`, `olive`, `purple`, `silver`, and `teal`. |
| `showTitle`           | `boolean`                                           | `false`     | Flag to toggle if the page title should be shown in the custom tab.                                                                                                                                                                                                                                                                                                                                                                                  |
| `closeButtonIcon`     | `string` _(as resolved by importing an image file)_ | `undefined` | Custom close button icon.<br/><br/>Provided icon must be a `.png`, `.jpg`, or `.gif` file.                                                                                                                                                                                                                                                                                                                                                           |
| `addDefaultShareMenu` | `boolean`                                           | `false`     | Flag to toggle the default share menu.                                                                                                                                                                                                                                                                                                                                                                                                               |

### iOS

Each setting is optional. Furthermore, settings with invalid values will be
ignored and their default values will be used. Also, settings that are not
supported by the iOS version at runtime will be ignored as well.

| Setting                     | Type      | Default     | Description                                                                                                                                                                                                                               |
| --------------------------- | --------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preferredBarTintColor`     | `string`  | `undefined` | The color to tint the background of the navigation bar and the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>**Available on**: iOS >= 10.0.      |
| `preferredControlTintColor` | `string`  | `undefined` | The color to tint the control buttons on the navigation bar and the toolbar.<br/><br/>Provided color can be in a hexadecimal format: <br/><ul><li>#RRGGBB</li><li>#RGB</li><li>#AARRGGBB</li><li>#ARGB</ul>**Available on**: iOS >= 10.0. |
| `barCollapsingEnabled`      | `boolean` | `true`      | **Available on**: iOS >= 11.0.                                                                                                                                                                                                            |

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[chromecustomtabs]: https://developer.chrome.com/multidevice/android/customtabs
[sfsafariviewcontroller]: https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller
[license]: https://github.com/matt-block/react-native-in-app-browser/blob/master/LICENSE
[license_shield]: https://img.shields.io/badge/license-MIT-blue.svg
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
