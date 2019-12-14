/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules, Platform } from 'react-native';
import { isUrlValid } from './utils/validation';
import { sanitize, initialize, Settings } from './settings';

/**
 * In-app browser functionalities.
 */
class InAppBrowser {
  /**
   * Open a URL in app.
   *
   * @param {string} url http(s) URL to open.
   * @param {Object} settings platform-specific settings for the in-app
   * browsers.
   *
   * @throws If the `url` is not a valid http(s) URL.
   */
  static async open(url: string, settings?: Settings): Promise<void> {
    if (!isUrlValid(url)) {
      throw 'Invalid URL';
    }

    NativeModules.RNInAppBrowser.openInApp(
      url,
      sanitize(Platform.OS, settings)
    );
  }

  /**
   * Close the current in app browser instance.
   *
   * This feature is iOS only as Chrome Custom Tabs does not support
   * programmatic dismissal.
   */
  static close(): void {
    if (Platform.OS === 'ios') {
      NativeModules.RNInAppBrowser.closeInApp();
    }
  }

  /**
   * Warm up the browser process.
   *
   * Allows the browser application to pre-initialize itself in the background.
   * Significantly speeds up URL opening in the browser. This is asynchronous
   * and can be called several times.
   *
   * This feature is Android only.
   */
  static async warmup(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        return NativeModules.RNInAppBrowser.warmup();
      } catch (e) {
        return false;
      }
    }

    return false;
  }

  /**
   * Tell the browser of a likely future navigation to a URL.
   *
   * The method `warmup()` has to be called beforehand.
   *
   * Optionally, a list of other likely URLs can be provided. They are treated
   * as less likely than the first one, and have to be sorted in decreasing
   * priority order. These additional URLs may be ignored.All previous calls to
   * this method will be deprioritized.
   *
   * This feature is Android only.
   */
  static async mayLaunchUrl(
    url: string,
    additionalUrls?: string[]
  ): Promise<boolean> {
    if (Platform.OS === 'android') {
      return NativeModules.RNInAppBrowser.mayLaunchUrl(
        url,
        additionalUrls ?? []
      );
    }

    return false;
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

export { InAppBrowser };
