/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { NativeModules } from "react-native";

function openInApp(url: string): void {
  NativeModules.RNInAppBrowser.openInApp(url);
}

export default openInApp;
