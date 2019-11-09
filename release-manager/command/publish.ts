/*
 * Copyright (c) 2018-present, Matei Bogdan Radu <opensource@mateiradu.dev>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import semver from 'semver';
import sh from 'shelljs';

import { Command } from './command';
import packageJson from '../../package.json';

const CURRENT_DIST_TAGS = ['latest' , 'next'] as const;
const LEGACY_DIST_TAGS = ['legacy', 'legacy-next'] as const;

type CurrentDistTag = typeof CURRENT_DIST_TAGS[number];
type LegacyDistTag = typeof LEGACY_DIST_TAGS[number];
type DistTag = CurrentDistTag | LegacyDistTag;

type Access = 'public' | 'restricted'

function parseDistTag(tag: string): DistTag {
  const possibleDistTags = [...CURRENT_DIST_TAGS, ...LEGACY_DIST_TAGS];

  const foundTag = possibleDistTags.find((distTag) => distTag === tag);

  if (!foundTag) {
    throw new Error(`${tag} is not an allowed npm distribution tag`);
  }

  return foundTag;
}

function validateVersion(): boolean {
  const { version } = packageJson;

  if (!version) {
    throw new Error('No version property defined in package.json');
  }

  if (!semver.valid(version)) {
    throw new Error(`${version} is not a valid semver version`);
  }

  return true;
}

function publish(
  tag: DistTag,
  access: Access = 'public',
  dryRun = false,
): void {
  const cmd = 'npm publish ' +
              `--tag ${tag} ` +
              `--access=${access}` +
              (dryRun ? ' --dry-run' : '');

  sh.exec(cmd);
}

function publishAction(tag: string, { dryRun }: { dryRun?: boolean }): void {
  try {
    const validatedTag = parseDistTag(tag);
    validateVersion();

    publish(validatedTag, 'public', dryRun ? dryRun : false);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

export const publishCommand: Command = {
  command: 'publish <tag>',
  description: 'Publish the current library to the registry with the given <tag>.',
  action: publishAction,
  options: [
    {
      flags: '--dry-run',
      description: 'Does everything npm publish would do except actually ' +
                   'publishing to the registry. Reports the details of what ' +
                   'would have been published.',
    },
  ],
};
