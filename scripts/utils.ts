/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from "fs-extra";
import sh from "shelljs";

export function versionIsRC(version: string) {
  return new RegExp("rc.[0-9]{1,}$").test(version);
}

export function replacer(newVersion: string) {
  return function(key: string, value: any): any {
    return key === "version" ? newVersion : value;
  };
}

export function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  return packageJson.version as string;
}

export function updatePackageJson(version: string) {
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  const updatedPackageJson = JSON.stringify(packageJson, replacer(version), 2);
  fs.writeFileSync("package.json", updatedPackageJson, { encoding: "utf-8" });
}

export function userHasSigningKey() {
  const { stdout } = sh.exec("git config --list | grep user.signingkey");
  return stdout === "" ? false : true;
}
