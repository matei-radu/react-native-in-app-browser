/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import sh from "shelljs";
import { getCurrentVersion } from "./utils";

const tag = getPublishingTag(process.env.CIRCLE_BRANCH);

if (!tag) {
  console.warn("Current branch is not ment for publishing.");
  process.exit(0);
}

// Continue with publish process.
createTarball();
const tarballName = `matt-block-react-native-in-app-browser-v${getCurrentVersion()}.tgz`;
setupNpm();
publish(tarballName, tag);

function createTarball() {
  sh.exec("yarn pack");
}

function publish(tarball: string, tag: string) {
  // Temporarily se npm since yarn seems to have some issues
  // with npm auth tokens.
  sh.exec(`npm publish ${tarball} --tag ${tag} --access=public`);
}

function getPublishingTag(branchName: string) {
  if (branchName.startsWith("release-")) {
    return "next";
  }

  if (branchName === "master") {
    return "latest";
  }

  return undefined;
}

function setupNpm() {
  sh.exec(
    'echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/deploy/.npmrc'
  );
}
