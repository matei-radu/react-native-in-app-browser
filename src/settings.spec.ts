/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import {
  sanitize,
  initialize,
  SettingsAndroid,
  Settings,
  defaultSettings
} from "./settings";

describe("Sanitize settings - Android", () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {}
    });
  });

  it("filters out invalid toolbarColor", () => {
    expect(
      sanitize("android", {
        android: { toolbarColor: "carbonara" }
      })
    ).toEqual({});
  });

  it("filters out undefined showTitle", () => {
    expect(
      sanitize("android", {
        android: { showTitle: undefined }
      })
    ).toEqual({});
  });

  it("returns empty Settings if none provided", () => {
    expect(sanitize("android")).toEqual({});
  });

  it("filters out null addDefaultShareMenu", () => {
    expect(
      sanitize("android", {
        android: { addDefaultShareMenu: null }
      })
    ).toEqual({});
  });

  it("filters out undefined addDefaultShareMenu", () => {
    expect(
      sanitize("android", {
        android: { addDefaultShareMenu: undefined }
      })
    ).toEqual({});
  });

  it("returns all valid properties", () => {
    expect(
      sanitize("android", {
        android: {
          toolbarColor: "#3fF",
          showTitle: null
        }
      })
    ).toEqual({
      toolbarColor: "#33ffFF"
    });
  });

  it("returns default settings for non provided ones", () => {
    const settings: Settings = {
      android: {
        toolbarColor: "red"
      }
    };
    initialize(settings);

    expect(
      sanitize("android", {
        android: {
          showTitle: true
        }
      })
    ).toEqual({
      toolbarColor: "red",
      showTitle: true
    });
  });
});

describe("Sanitize settings - iOS", () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {}
    });
  });

  it("filters out invalid preferredBarTintColor", () => {
    expect(
      sanitize("ios", {
        ios: { preferredBarTintColor: "carbonara" }
      })
    ).toEqual({});
  });

  it("filters out invalid preferredControlTintColor", () => {
    expect(
      sanitize("ios", {
        ios: { preferredControlTintColor: "spaghetti" }
      })
    ).toEqual({});
  });

  it("filters out invalid barCollapsingEnabled", () => {
    expect(
      sanitize("ios", {
        ios: { barCollapsingEnabled: null }
      })
    ).toEqual({});
  });

  it("returns empty Settings if none provided", () => {
    expect(sanitize("ios")).toEqual({});
  });

  it("returns all valid properties", () => {
    expect(
      sanitize("ios", {
        ios: {
          preferredBarTintColor: "#3fF",
          preferredControlTintColor: "3#fF",
          barCollapsingEnabled: true
        }
      })
    ).toEqual({
      preferredBarTintColor: "#33ffFF",
      barCollapsingEnabled: true
    });
  });

  it("returns default settings for non provided ones", () => {
    const settings: Settings = {
      ios: {
        preferredBarTintColor: "#3fF"
      }
    };
    initialize(settings);

    expect(
      sanitize("ios", {
        ios: {
          preferredControlTintColor: "#3fF",
          barCollapsingEnabled: true
        }
      })
    ).toEqual({
      preferredBarTintColor: "#33ffFF",
      preferredControlTintColor: "#33ffFF",
      barCollapsingEnabled: true
    });
  });
});

describe("Initialize", () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {}
    });
  });

  it("correctly initializes default settings", () => {
    const settings: Settings = {
      android: {
        toolbarColor: "red"
      },
      ios: {
        preferredBarTintColor: "#3fF"
      }
    };
    initialize(settings);

    expect(defaultSettings).toEqual({
      android: {
        toolbarColor: "red"
      },
      ios: {
        preferredBarTintColor: "#33ffFF"
      }
    });
  });
});
