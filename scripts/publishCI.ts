/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import sh from "shelljs";
import { getCurrentVersion, versionIsRC, getTarballName } from "./utils";

const tag = getPublishingTag(process.env.CIRCLE_BRANCH!);

// Continue with publish process.
createTarball();
const tarballName = getTarballName();
setupNpm();
publish(tarballName, getCurrentVersion(), tag);

function createTarball() {
  sh.exec("yarn pack");
}

function publish(tarball: string, version: string, tag: string) {
  // If version is not a release candidate and we are in release branch,
  // skip publishing as this is just a tag and amend commit.
  if (!versionIsRC(version) && tag === "next") {
    console.log("Final tag and amend release commit, skipping publish.");
    process.exit(0);
  }

  sh.exec(
    `yarn publish ${tarball} --new-version ${version} --tag ${tag} --access=public`
  );
}

function getPublishingTag(branchName: string) {
  if (branchName.startsWith("release-")) {
    return "next";
  }

  if (branchName === "master") {
    return "latest";
  }

  console.warn("Current branch is not ment for publishing.");
  process.exit(0);
  return "";
}

function setupNpm() {
  sh.exec('echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc');
}
