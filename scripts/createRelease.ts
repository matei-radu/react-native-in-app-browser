/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from "fs-extra";
import sh from "shelljs";
import { replacer } from "./rcBump";

const releaseVersion = getReleaseVersion(process);

sh.exec("git fetch");
sh.exec("git checkout development");
const { stderr } = sh.exec(`git checkout -b release-${releaseVersion}`);

if (stderr.startsWith("fatal:")) {
  process.exit(-1);
}

updatePackageJson(releaseVersion);
sh.exec("git add package.json");

// The commit will trigger the pre-commit hook.
bumpCommit(releaseVersion);

function getReleaseVersion(process: NodeJS.Process) {
  if (process.argv.length >= 3) {
    const proposedVersion = extractVersionValue(process.argv[2]);

    if (!versionIsSemVer(proposedVersion)) {
      console.error(`${proposedVersion} is not a valid semver version!`);
      process.exit(-1);
    }

    return proposedVersion;
  } else {
    return bumpMinor(getCurrentVersion());
  }
}

function extractVersionValue(versionArg: string) {
  const argName = versionArg.substring(0, versionArg.lastIndexOf("="));
  if (argName !== "--version") {
    console.error(`"${argName}" is not recognized, use "--version".`);
    process.exit(-1);
  }
  return versionArg.substring(versionArg.lastIndexOf("=") + 1);
}

function versionIsSemVer(version: string) {
  // https://github.com/semver/semver/issues/232
  const semverRegex = RegExp(
    "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-(0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(\\.(0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\\+[0-9a-zA-Z-]+(\\.[0-9a-zA-Z-]+)*)?$"
  );
  return semverRegex.test(version);
}

function bumpMinor(version: string) {
  const [major, minor] = version.split(".");
  return `${major}.${Number(minor) + 1}.0`;
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  return packageJson.version as string;
}

function updatePackageJson(version: string) {
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  const updatedPackageJson = JSON.stringify(packageJson, replacer(version), 2);
  fs.writeFileSync("package.json", updatedPackageJson, { encoding: "utf-8" });
}

function bumpCommit(version: string) {
  if (userHasSigningKey()) {
    sh.exec(`git commit -S -m "Bump version to ${version}"`);
  } else {
    sh.exec(`git commit -m "Bump version to ${version}"`);
  }
}

function userHasSigningKey() {
  const { stdout } = sh.exec("git config --list | grep user.signingkey");
  return stdout === "" ? false : true;
}
