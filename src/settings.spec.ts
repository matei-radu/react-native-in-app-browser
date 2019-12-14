/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

// See https://github.com/facebook/react-native/issues/23943
// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.doMock('react-native', () => {});

import { sanitize, initialize, defaultSettings, Settings } from './settings';

describe('Sanitize settings - Android', () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {},
    });
  });

  it('filters out invalid toolbarColor', () => {
    expect(
      sanitize('android', {
        android: { toolbarColor: 'carbonara' },
      })
    ).toEqual({});
  });

  it('filters out undefined showTitle', () => {
    expect(
      sanitize('android', {
        android: { showTitle: undefined },
      })
    ).toEqual({});
  });

  it('returns empty Settings if none provided', () => {
    expect(sanitize('android')).toEqual({});
  });

  it('filters out null addDefaultShareMenu', () => {
    expect(
      sanitize('android', {
        android: { addDefaultShareMenu: null },
      } as unknown as Settings)
    ).toEqual({});
  });

  it('filters out undefined addDefaultShareMenu', () => {
    expect(
      sanitize('android', {
        android: { addDefaultShareMenu: undefined },
      })
    ).toEqual({});
  });

  it('returns all valid properties', () => {
    expect(
      sanitize('android', {
        android: {
          toolbarColor: '#3fF',
          showTitle: null,
        },
      } as unknown as Settings)
    ).toEqual({
      toolbarColor: '#33ffff',
    });
  });

  it('returns default settings for non provided ones', () => {
    const settings = {
      android: {
        toolbarColor: 'red',
      },
    };
    initialize(settings);

    expect(
      sanitize('android', {
        android: {
          showTitle: true,
        },
      })
    ).toEqual({
      toolbarColor: '#ff0000',
      showTitle: true,
    });
  });
});

describe('Sanitize settings - iOS', () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {},
    });
  });

  it('filters out invalid preferredBarTintColor', () => {
    expect(
      sanitize('ios', {
        ios: { preferredBarTintColor: 'carbonara' },
      })
    ).toEqual({});
  });

  it('filters out invalid preferredControlTintColor', () => {
    expect(
      sanitize('ios', {
        ios: { preferredControlTintColor: 'spaghetti' },
      })
    ).toEqual({});
  });

  it('filters out invalid barCollapsingEnabled', () => {
    expect(
      sanitize('ios', {
        ios: { barCollapsingEnabled: null },
      } as unknown as Settings)
    ).toEqual({});
  });

  it('returns empty Settings if none provided', () => {
    expect(sanitize('ios')).toEqual({});
  });

  it('returns all valid properties', () => {
    expect(
      sanitize('ios', {
        ios: {
          preferredBarTintColor: '#3fF',
          preferredControlTintColor: '3#fF',
          barCollapsingEnabled: true,
        },
      })
    ).toEqual({
      preferredBarTintColor: '#33ffff',
      barCollapsingEnabled: true,
    });
  });

  it('returns default settings for non provided ones', () => {
    const settings = {
      ios: {
        preferredBarTintColor: '#3fF',
      },
    };
    initialize(settings);

    expect(
      sanitize('ios', {
        ios: {
          preferredControlTintColor: '#3fF',
          barCollapsingEnabled: true,
        },
      })
    ).toEqual({
      preferredBarTintColor: '#33ffff',
      preferredControlTintColor: '#33ffff',
      barCollapsingEnabled: true,
    });
  });
});

describe('Initialize', () => {
  beforeEach(() => {
    initialize({
      android: {},
      ios: {},
    });
  });

  it('correctly initializes default settings', () => {
    const settings = {
      android: {
        toolbarColor: 'red',
      },
      ios: {
        preferredBarTintColor: '#3fF',
      },
    };
    initialize(settings);

    expect(defaultSettings).toEqual({
      android: {
        toolbarColor: '#ff0000',
      },
      ios: {
        preferredBarTintColor: '#33ffff',
      },
    });
  });
});
