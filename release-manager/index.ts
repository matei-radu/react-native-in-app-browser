/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import commander from 'commander';
import { publish } from './command';

commander.name('Release Management Tools');
commander.version('0.0.1');

const publishCommand = commander
  .command(publish.command)
  .description(publish.description)
  .action(publish.action);

publish.options.forEach((option) => {
  publishCommand.option(option.flags, option.description);
});

commander.parse(process.argv);
