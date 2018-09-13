/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules, Platform } from "react-native";
import { isUrlValid } from "./utils/validation";
import { sanitize, Settings } from "./settings";

function openInApp(url: string, settings?: Settings): Promise<{}> {
  return new Promise((resolve, reject) => {
    if (!isUrlValid(url)) {
      reject("Invalid URL");
      return;
    }

    NativeModules.RNInAppBrowser.openInApp(
      url,
      sanitize(Platform.OS, settings)
    );
    resolve();
  });
}

export default openInApp;
