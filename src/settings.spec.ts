/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { sanitize } from "./settings";

describe("Sanitize settings - Android", () => {
  it("filters out invalid toolbarColor", () => {
    expect(
      sanitize("android", {
        android: { toolbarColor: "carbonara" }
      })
    ).toEqual({});
  });

  it("returns empty Settings if none provided", () => {
    expect(sanitize("android")).toEqual({});
  });

  it("keeps all valid properties", () => {
    expect(
      sanitize("android", {
        android: { toolbarColor: "#3fF" }
      })
    ).toEqual({
      toolbarColor: "#33ffFF"
    });
  });
});

describe("Sanitize settings - iOS", () => {
  it("filters out invalid preferredBarTintColor", () => {
    expect(
      sanitize("ios", {
        ios: { preferredBarTintColor: "carbonara" }
      })
    ).toEqual({});
  });

  it("returns empty Settings if none provided", () => {
    expect(sanitize("ios")).toEqual({});
  });

  it("keeps all valid properties", () => {
    expect(
      sanitize("ios", {
        ios: { preferredBarTintColor: "#3fF" }
      })
    ).toEqual({
      preferredBarTintColor: "#33ffFF"
    });
  });
});
