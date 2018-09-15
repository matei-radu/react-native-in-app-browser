/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { PlatformOSType, Image } from "react-native";
import { getValidColorAndroid, sanitizeHexColor } from "./utils/color";

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
   * Provided color can be in a hexadecimal format:
   * - #RRGGBB
   * - #RGB
   * - #AARRGGBB
   * - #ARGB
   *
   * Alternatively, following color names are accepted:
   * - `red`
   * - `blue`
   * - `green`
   * - `black`
   * - `white`
   * - `gray`
   * - `cyan`
   * - `magenta`
   * - `yellow`
   * - `lightgray`
   * - `darkgray`
   * - `grey`
   * - `lightgrey`
   * - `darkgrey`
   * - `aqua`
   * - `fuchsia`
   * - `lime`
   * - `maroon`
   * - `navy`
   * - `olive`
   * - `purple`
   * - `silver`
   * - `teal`
   *
   * **Note**: if the color string is invalid, this setting will be ignored.
   */
  toolbarColor?: string;

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
}

export interface SettingsIOS {
  /**
   * The color to tint the background of the navigation bar and the toolbar.
   *
   * Provided color must be in a hexadecimal format:
   * - #RRGGBB
   * - #RGB
   * - #AARRGGBB
   * - #ARGB
   *
   * **Available on**: iOS >= 10.0.
   *
   * **Note**: if the color string is invalid or if the current iOS version
   * is < 10.0, this setting will be ignored.
   */
  preferredBarTintColor?: string;

  /**
   * The color to tint the control buttons on the navigation bar and the
   * toolbar.
   *
   * Provided color must be in a hexadecimal format:
   * - #RRGGBB
   * - #RGB
   * - #AARRGGBB
   * - #ARGB
   *
   * **Available on**: iOS >= 10.0.
   *
   * **Note**: if the color string is invalid or if the current iOS version
   * is < 10.0, this setting will be ignored.
   */
  preferredControlTintColor?: string;

  /**
   * **Available on**: iOS >= 11.0.
   *
   * **Note**: if the value is invalid or if the current iOS version
   * is < 11.0, this setting will be ignored.
   */
  barCollapsingEnabled?: boolean;
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

  if (typeof settings.showTitle === "boolean") {
    sanitizedSettings.showTitle = settings.showTitle;
  }

  if (settings.closeButtonIcon) {
    try {
      sanitizedSettings.closeButtonIcon = Image.resolveAssetSource(
        settings.closeButtonIcon
      ).uri;
    } catch (unusedError) {
      // Given icon image is invalid.
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

  if (typeof settings.barCollapsingEnabled === "boolean") {
    sanitizedSettings.barCollapsingEnabled = settings.barCollapsingEnabled;
  }

  return sanitizedSettings;
}
