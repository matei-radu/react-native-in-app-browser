/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

/**
 * Checks if a url is HTTP or HTTPS.
 *
 * Other protocols are not supported by both platforms.
 */
export function isUrlValid(url: string): boolean {
  return RegExp(/^(http|https):\/\//).test(url);
}
