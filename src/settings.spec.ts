/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import { sanitize } from "./settings";

describe("Settings sanitize Android", () => {
  it("filters out invalid toolbarColor", () => {
    expect(sanitize({ toolbarColor: "carbonara" })).toEqual({});
  });

  it("returns empty Settings if none provided", () => {
    expect(sanitize()).toEqual({});
  });

  it("keeps all valid properties", () => {
    expect(
      sanitize({
        toolbarColor: "#3fF"
      })
    ).toEqual({
      toolbarColor: "#33ffFF"
    });
  });
});
