/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules, Platform } from "react-native";
import { isUrlValid } from "./utils/validation";
import { sanitize, initialize, Settings } from "./settings";

/**
 * In-app browser functionalities.
 */
class InAppBrowser {
  /**
   * Open a URL in app.
   *
   * @param {string} url http(s) URL to open.
   * @param {Object} settings platform-specific settings for the in-app browsers.
   *
   * @throws If the `url` is not a valid http(s) URL.
   */
  static async open(url: string, settings?: Settings) {
    if (!isUrlValid(url)) {
      throw "Invalid URL";
    }

    NativeModules.RNInAppBrowser.openInApp(
      url,
      sanitize(Platform.OS, settings)
    );
  }

  /**
   * Close the current in app browser instance.
   *
   * This feature is iOS only as Chrome Custom Tabs does not support programmatic
   * dismissal.
   */
  static close() {
    if (Platform.OS === "ios") {
      NativeModules.RNInAppBrowser.closeInApp();
    }
  }

  /**
   * Configure the platform-specific settings for the in-app browser
   * experience.
   *
   * This utility function is useful when `InAppBrowser.open` is used in several
   * portions of the application code base as it allows to provide the
   * settings only once instead of specifing them with each call.
   */
  static configure = initialize;
}

/**
 * Open a URL in app.
 *
 * @param {string} url http(s) URL to open.
 * @param {Object} settings platform-specific settings for the in-app browsers.
 *
 * @throws If the `url` is not a valid http(s) URL.
 * @deprecated
 */
async function openInApp(url: string, settings?: Settings) {
  if (!isUrlValid(url)) {
    throw "Invalid URL";
  }

  NativeModules.RNInAppBrowser.openInApp(url, sanitize(Platform.OS, settings));
}

/**
 * Close the current in app browser instance.
 *
 * This feature is iOS only as Chrome Custom Tabs does not support programmatic
 * dismissal.
 *
 * @deprecated
 */
function closeInAppInstance() {
  if (Platform.OS === "ios") {
    NativeModules.RNInAppBrowser.closeInApp();
  }
}

export { openInApp as default, closeInAppInstance, initialize, InAppBrowser };
