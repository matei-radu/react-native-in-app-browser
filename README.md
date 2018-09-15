# React Native in-app Browser

[![code style: prettier][prettier_shield]][prettier]

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

## License

Copyright (c) 2018-present Matei Bogdan Radu.

This source code is licensed under the MIT license found in the
[LICENSE][license] file in the root directory of this source tree.

<!-- Sources -->

[license]: https://github.com/matt-block/react-native-in-app-browser/blob/master/LICENSE
[prettier_shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier]: https://github.com/prettier/prettier
