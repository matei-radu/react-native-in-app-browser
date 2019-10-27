/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource92@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from 'fs';

fs.copyFileSync('src/index.js.flow', 'lib/index.js.flow');
