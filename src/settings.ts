/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { PlatformOSType } from "react-native";
import { getValidColorAndroid, sanitizeHexColor } from "./utils/color";

export interface Settings {
  android?: SettingsAndroid;
  ios?: SettingsIOS;
}

export interface SettingsAndroid {
  toolbarColor?: string;
}

export interface SettingsIOS {
  preferredBarTintColor?: string;
  preferredControlTintColor?: string;
}

/**
 * Sanitize the settings based on the running OS.
 */
export function sanitize(os: PlatformOSType, settings?: Settings) {
  if (!settings) {
    return {};
  }

  switch (os) {
    case "android":
      return sanitizeAndroid(settings.android);
    case "ios":
      return sanitizeIOS(settings.ios);
    // Other platforms in the future.
    default:
      return {};
  }
}

function sanitizeAndroid(settings?: SettingsAndroid): SettingsAndroid {
  const sanitizedSettings: SettingsAndroid = {};

  if (!settings) {
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

function sanitizeIOS(settings?: SettingsIOS): SettingsIOS {
  const sanitizedSettings: SettingsIOS = {};

  if (!settings) {
    return sanitizedSettings;
  }

  if (
    settings.preferredBarTintColor &&
    typeof settings.preferredBarTintColor === "string"
  ) {
    try {
      sanitizedSettings.preferredBarTintColor = sanitizeHexColor(
        settings.preferredBarTintColor
      );
    } catch (unusedError) {
      // Given color is invalid.
      // Silently fail and proceed without it.
    }
  }

  if (
    settings.preferredControlTintColor &&
    typeof settings.preferredControlTintColor === "string"
  ) {
    try {
      sanitizedSettings.preferredControlTintColor = sanitizeHexColor(
        settings.preferredControlTintColor
      );
    } catch (unusedError) {
      // Given color is invalid.
      // Silently fail and proceed without it.
    }
  }

  return sanitizedSettings;
}
