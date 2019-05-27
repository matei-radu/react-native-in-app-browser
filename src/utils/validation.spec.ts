/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { isUrlValid } from "./validation";

describe("isValidUrl", () => {
  it("accepts strings starting with http://", () => {
    expect(isUrlValid("http://www.google.com")).toBe(true);
  });

  it("accepts strings starting with https://", () => {
    expect(isUrlValid("https://www.google.com")).toBe(true);
  });

  it("rejects strings containing, but not starting, with https://", () => {
    expect(isUrlValid("asdhttps://www.google.com")).toBe(false);
  });

  it("rejects invalid strings", () => {
    expect(isUrlValid("lasagna")).toBe(false);
  });
});
