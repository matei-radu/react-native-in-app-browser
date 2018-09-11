/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules, Platform } from "react-native";
import { isUrlValid } from "./utils/validation";
import { sanitize, SettingsAndroid, SettingsIOS } from "./settings";

function openInApp(
  url: string,
  settingsAndroid?: SettingsAndroid,
  settingsIOS?: SettingsIOS
): Promise<{}> {
  return new Promise((resolve, reject) => {
    if (!isUrlValid(url)) {
      reject("Invalid URL");
      return;
    }

    if (Platform.OS === "android") {
      NativeModules.RNInAppBrowser.openInApp(url, sanitize(settingsAndroid));
    } else {
      // TODO: sanitize settings.
      NativeModules.RNInAppBrowser.openInApp(url, settingsIOS);
    }

    resolve();
  });
}
export default openInApp;
