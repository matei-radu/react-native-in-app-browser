/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { getValidColorAndroid, acceptedColorKeywordsAndroid } from "./color";

describe("getValidColor", () => {
  it("accepts valid 3-digit hex rgb color", () => {
    expect(getValidColorAndroid("#a7b")).toBe("#aa77bb");
  });

  it("accepts valid 6-digit hex rgb color", () => {
    expect(getValidColorAndroid("#AA7bC3")).toBe("#AA7bC3");
  });

  it("accepts valid 4-digit hex argb color", () => {
    expect(getValidColorAndroid("#f333")).toBe("#ff333333");
  });

  it("accepts valid 8-digit hex argb color", () => {
    expect(getValidColorAndroid("#33AA56c0")).toBe("#33AA56c0");
  });

  it("accepts all color keywords", () => {
    acceptedColorKeywordsAndroid.map(color => {
      expect(getValidColorAndroid(color)).toBe(color);
    });
  });

  it("throws when color is not accepted keyword", () => {
    expect(() => getValidColorAndroid("rebeccapurple")).toThrowError();
  });

  it("throws when color is invalid hex value", () => {
    expect(() => getValidColorAndroid("#kk34b5")).toThrow();
  });

  it("throws when color is just nonsense", () => {
    expect(() => getValidColorAndroid("spaghetti")).toThrow();
  });
});
