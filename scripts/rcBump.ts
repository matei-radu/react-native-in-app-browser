/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import sh from "shelljs";
import { versionIsRC, getCurrentVersion, updatePackageJson } from "./utils";

const { stdout } = sh.exec("git rev-parse --abbrev-ref HEAD");
const currentBranch = stdout.slice(0, -1); // Last character is newline.

if (currentBranch.startsWith("release-")) {
  console.log("Bumping release candidate build...");

  const ver = getCurrentVersion();
  const newVer = versionIsRC(ver) ? bumpRCBuild(ver) : makeVersionRC(ver);
  updatePackageJson(newVer);

  console.log(`New build is ${newVer}.`);
} else {
  console.log("Not a release branch, ignoring build bump.");
}

function bumpRCBuild(version: string) {
  const rcBuild = version.substring(version.lastIndexOf("-rc.") + 4);
  return version.slice(0, -rcBuild.length).concat(`${+rcBuild + 1}`);
}

function makeVersionRC(version: string) {
  return version.concat("-rc.0");
}
