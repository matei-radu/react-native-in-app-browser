/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { PlatformOSType, Image } from 'react-native';
import { TinyColor, ColorInput } from '@ctrl/tinycolor';

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
  toolbarColor?: ColorInput;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  preferredBarTintColor?: ColorInput;

  /**
   * The color to tint the control buttons on the navigation bar and the
   * toolbar.
   *
   * **Available on**: iOS >= 10.0.
   *
   * **Note**: if the color string is invalid or if the current iOS version
   * is < 10.0, this setting will be ignored.
   */
  preferredControlTintColor?: ColorInput;

  /**
   * **Available on**: iOS >= 11.0.
   *
   * **Note**: if the value is invalid or if the current iOS version
   * is < 11.0, this setting will be ignored.
   */
  barCollapsingEnabled?: boolean;

  /**
   * A value that specifies whether Safari should enter Reader mode, if it is available.
   *
   * **Available on**: iOS >= 11.0.
   *
   * **Note**: if the value is invalid or if the current iOS version
   * is < 11.0, this setting will be ignored.
   */
  entersReaderIfAvailable?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Default settings.
 *
 * These values can be augmented throgh initialization.
 */
export const defaultSettings: Required<Settings> = {
  android: {},
  ios: {},
};

function sanitizeAndroid(settings?: SettingsAndroid): SettingsAndroid {
  const sanitized = { ...defaultSettings.android };

  if (!settings) {
    return sanitized;
  }

  const toolbarColor = new TinyColor(settings.toolbarColor);
  if (toolbarColor.isValid) {
    sanitized.toolbarColor = toolbarColor.toHexString();
  }

  if (typeof settings.showTitle === 'boolean') {
    sanitized.showTitle = settings.showTitle;
  }

  if (settings.closeButtonIcon) {
    sanitized.closeButtonIcon = Image.resolveAssetSource(
      settings.closeButtonIcon
    ).uri;
  }

  if (typeof settings.addDefaultShareMenu === 'boolean') {
    sanitized.addDefaultShareMenu = settings.addDefaultShareMenu;
  }

  return sanitized;
}

function sanitizeIOS(settings?: SettingsIOS): SettingsIOS {
  const sanitized = { ...defaultSettings.ios };

  if (!settings) {
    return sanitized;
  }

  const colors = ['preferredBarTintColor', 'preferredControlTintColor'];
  colors.forEach(color => {
    const parsedColor = new TinyColor(settings[color]);
    if (parsedColor.isValid) {
      sanitized[color] = parsedColor.toHexString();
    }
  });

  if (typeof settings.barCollapsingEnabled === 'boolean') {
    sanitized.barCollapsingEnabled = settings.barCollapsingEnabled;
  }

  if (typeof settings.entersReaderIfAvailable === 'boolean') {
    sanitized.entersReaderIfAvailable = settings.entersReaderIfAvailable;
  }
  return sanitized;
}

/**
 * Sanitize the settings based on the running OS.
 *
 * Provided settings will be merged with the default ones.
 * Also, in case of same properties, provided ones have priority
 * over defaults.
 */
export function sanitize(os: 'android', settings?: Settings): SettingsAndroid;
export function sanitize(os: 'ios', settings?: Settings): SettingsIOS;
export function sanitize(os: PlatformOSType, settings?: Settings): {};
export function sanitize(
  os: PlatformOSType,
  settings?: Settings,
): SettingsAndroid | SettingsIOS {
  switch (os) {
    case 'android':
      return sanitizeAndroid(settings?.android);
    case 'ios':
      return sanitizeIOS(settings?.ios);
    // Other platforms in the future.
    default:
      return {};
  }
}

/**
 * Initializes the platform-specific settings for the in-app browser
 * experience.
 *
 * This utility function is useful when `openInApp` is used in several
 * portions of the application code base as it allows to provide the
 * settings only once instead of specifing them with each call.
 */
export function initialize(settings: Settings): void {
  // First, reset directly as `sanitize` will otherwise merge with
  // previous defaults: it would not be possible to remove properties.
  defaultSettings.android = {};
  defaultSettings.ios = {};

  defaultSettings.android = sanitize('android', settings);
  defaultSettings.ios = sanitize('ios', settings);
}
