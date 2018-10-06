/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from "fs-extra";
import sh from "shelljs";

const { stdout } = sh.exec("git rev-parse --abbrev-ref HEAD");
const currentBranch = stdout.slice(0, -1); // Last character is newline.

if (currentBranch.startsWith("release-")) {
  console.log("Bumping release candidate build...");

  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  const ver: string = packageJson.version;

  const newVer = versionIsRC(ver) ? bumpRCBuild(ver) : makeVersionRC(ver);

  const updatedPackageJson = JSON.stringify(packageJson, replacer(newVer), 2);
  fs.writeFileSync("package.json", updatedPackageJson, { encoding: "utf-8" });

  console.log(`New build is ${newVer}.`);
} else {
  console.log("Not a release branch, ignoring build bump.");
}

function versionIsRC(version: string) {
  return new RegExp("rc.[0-9]{1,}$").test(version);
}

function bumpRCBuild(version: string) {
  const rcBuild = version.substring(version.lastIndexOf("-rc.") + 4);
  return version.slice(0, -rcBuild.length).concat(`${+rcBuild + 1}`);
}

function makeVersionRC(version: string) {
  return version.concat("-rc.0");
}

export function replacer(newVersion: string) {
  return function(key: string, value: any): any {
    return key === "version" ? newVersion : value;
  };
}
