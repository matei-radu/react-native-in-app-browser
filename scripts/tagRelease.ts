/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import sh from "shelljs";
import {
  getCurrentVersion,
  versionIsRC,
  updatePackageJson,
  userHasSigningKey
} from "./utils";

// Amend: remove rc.X from package.json
const currentVersion = getCurrentVersion();

if (!versionIsRC(currentVersion)) {
  console.error(
    `Current version "${currentVersion}" is not a release candidate. Are you sure to be in a release branch?`
  );
  process.exit(-1);
}

const finalReleaseVersion = removeRCBuild(currentVersion);

updatePackageJson(finalReleaseVersion);
sh.exec("git add package.json");
amendCommit();

// Tag last commit with version.
tagCommit(finalReleaseVersion);

console.log(
  "Commit has been amended and tagged: your local release branch is ready to be merged!"
);
console.log(
  'Remember to "git push --force" the amended commit and "git push --tags" before merging the PR.'
);

function removeRCBuild(version: string) {
  const rcBuild = version.substring(version.lastIndexOf("-rc."));
  return version.slice(0, -rcBuild.length);
}

// Use flag --no-verify so that the release pre-commit is not triggered,
// otherwise it would append again `-rc.0`.
//
// See https://git-scm.com/docs/git-commit#git-commit---no-verify
function amendCommit() {
  if (userHasSigningKey()) {
    sh.exec(`git commit -S --amend --no-verify --no-edit`);
  } else {
    sh.exec(`git commit --amend --no-verify --no-edit`);
  }
}

function tagCommit(version: string) {
  if (userHasSigningKey()) {
    sh.exec(`git tag -s v${version} -m 'Release ${version}'`);
  } else {
    sh.exec(`git tag -a v${version} -m 'Release ${version}'`);
  }
}
