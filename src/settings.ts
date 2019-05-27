/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { PlatformOSType, Image } from "react-native";
import tinycolor, { ColorInputWithoutInstance } from "tinycolor2";

export interface Settings {
  /**
   * Android specific settings.
   *
   * All settings are optional and invalid ones will be ignored.
   *
   * The implementation uses Chrome Custom Tabs.
   */
  android?: SettingsAndroid;

  /**
   * iOS specific settings.
   *
   * All settings are optional and invalid ones will be ignored.
   *
   * The implementation uses Safari View Manager.
   */
  ios?: SettingsIOS;
}

export interface SettingsAndroid {
  /**
   * The color to tint the background of the toolbar.
   *
   * **Note**: if the color string is invalid, this setting will be ignored.
   */
  toolbarColor?: ColorInputWithoutInstance;

  /**
   * Flag to toggle if the title should be shown in the custom tab.
   *
   * **Note**: if the value is invalid, this setting will be ignored.
   */
  showTitle?: boolean;

  /**
   * Custom close button icon.
   *
   * Provided icon must be a `.png`, `.jpg`, or `.gif` file.
   *
   * **Note**: if icon asset is invalid, this setting will be ignored.
   */
  closeButtonIcon?: any;

  /**
   * Flag to toggle the default share menu.
   *
   * **Note**: if the value is invalid, this setting will be ignored.
   */
  addDefaultShareMenu?: boolean;
}

export interface SettingsIOS {
  /**
   * The color to tint the background of the navigation bar and the toolbar.
   *
   * **Available on**: iOS >= 10.0.
   *
   * **Note**: if the color string is invalid or if the current iOS version
   * is < 10.0, this setting will be ignored.
   */
  preferredBarTintColor?: ColorInputWithoutInstance;

  /**
   * The color to tint the control buttons on the navigation bar and the
   * toolbar.
   *
   * **Available on**: iOS >= 10.0.
   *
   * **Note**: if the color string is invalid or if the current iOS version
   * is < 10.0, this setting will be ignored.
   */
  preferredControlTintColor?: ColorInputWithoutInstance;

  /**
   * **Available on**: iOS >= 11.0.
   *
   * **Note**: if the value is invalid or if the current iOS version
   * is < 11.0, this setting will be ignored.
   */
  barCollapsingEnabled?: boolean;

  [key: string]: any;
}

/**
 * Default settings.
 *
 * These values can be augmented throgh initialization.
 */
export const defaultSettings: Settings = {
  android: {},
  ios: {}
};

/**
 * Initializes the platform-specific settings for the in-app browser
 * experience.
 *
 * This utility function is useful when `openInApp` is used in several
 * portions of the application code base as it allows to provide the
 * settings only once instead of specifing them with each call.
 */
export function initialize(settings: Settings) {
  // First, reset directly as `sanitize` will otherwise merge with
  // previous defaults: it would not be possible to remove properties.
  defaultSettings.android = {};
  defaultSettings.ios = {};

  defaultSettings.android = sanitize("android", settings) as SettingsAndroid;
  defaultSettings.ios = sanitize("ios", settings) as SettingsIOS;
}

/**
 * Sanitize the settings based on the running OS.
 *
 * Provided settings will be merged with the default ones.
 * Also, in case of same properties, provided ones have priority
 * over defaults.
 */
export function sanitize(os: PlatformOSType, settings?: Settings) {
  switch (os) {
    case "android":
      return sanitizeAndroid(settings ? settings.android : {});
    case "ios":
      return sanitizeIOS(settings ? settings.ios : {});
    // Other platforms in the future.
    default:
      return {};
  }
}

function sanitizeAndroid(settings?: SettingsAndroid): SettingsAndroid {
  const sanitized = { ...defaultSettings.android! };

  if (!settings) {
    return sanitized;
  }

  if (tinycolor(settings.toolbarColor).isValid()) {
    sanitized.toolbarColor = tinycolor(settings.toolbarColor).toHexString();
  }

  if (typeof settings.showTitle === "boolean") {
    sanitized.showTitle = settings.showTitle;
  }

  try {
    sanitized.closeButtonIcon = Image.resolveAssetSource(
      settings.closeButtonIcon
    ).uri;
  } catch (unusedError) {
    // Given icon image is invalid.
    // Silently fail and proceed without it.
  }

  if (typeof settings.addDefaultShareMenu === "boolean") {
    sanitized.addDefaultShareMenu = settings.addDefaultShareMenu;
  }

  return sanitized;
}

function sanitizeIOS(settings?: SettingsIOS): SettingsIOS {
  const sanitized = { ...defaultSettings.ios! };

  if (!settings) {
    return sanitized;
  }

  const colors = ["preferredBarTintColor", "preferredControlTintColor"];
  colors.forEach(color => {
    if (tinycolor(settings[color]).isValid()) {
      sanitized[color] = tinycolor(settings[color]).toHexString();
    }
  });

  if (typeof settings.barCollapsingEnabled === "boolean") {
    sanitized.barCollapsingEnabled = settings.barCollapsingEnabled;
  }

  return sanitized;
}
