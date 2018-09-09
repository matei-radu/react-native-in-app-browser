/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { getValidColorAndroid } from "./utils/color";

export interface SettingsAndroid {
  toolbarColor?: string;
}

export function sanitize(settings?: SettingsAndroid): SettingsAndroid {
  const sanitizedSettings: SettingsAndroid = {};

  if (settings == null) {
    return sanitizedSettings;
  }

  if (settings.toolbarColor && typeof settings.toolbarColor === "string") {
    try {
      sanitizedSettings.toolbarColor = getValidColorAndroid(
        settings.toolbarColor
      );
    } catch (unusedError) {
      // Given color is invalid.
      // Silently fail and proceed without it.
    }
  }

  return sanitizedSettings;
}
