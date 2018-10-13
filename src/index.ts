/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules, Platform } from "react-native";
import { isUrlValid } from "./utils/validation";
import { sanitize, Settings } from "./settings";

/**
 * Open a URL in app.
 *
 * @param {string} url http(s) URL to open.
 * @param {Object} settings platform-specific settings for the in-app browsers.
 *
 * @throws If the `url` is not a valid http(s) URL.
 */
async function openInApp(url: string, settings?: Settings) {
  if (!isUrlValid(url)) {
    throw "Invalid URL";
  }

  NativeModules.RNInAppBrowser.openInApp(url, sanitize(Platform.OS, settings));
}

export default openInApp;
