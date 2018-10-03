/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from "fs-extra";
import path from "path";

// The React Native `link` does not seem to discover native modules if the
// respective Android and iOS project folders are not in the module root.
// However, Android and iOS projects are placed under `src` since they are
// actual source code.
// Move the two folder at the the top level before packing.

fs.removeSync("android");
fs.copySync("src/android", "android");

fs.removeSync("ios");
fs.copySync("src/ios", "ios");

// Copy Flow definitions.
fs.copyFileSync("src/index.js.flow", "lib/index.js.flow");

// Separate Typescript definitions into dedicated folder.
fs.removeSync("types");
moveDefinitionsFrom("lib");

function moveDefinitionsFrom(startPath: string, filter = ".d.ts"): void {
  if (!fs.existsSync(startPath)) {
    return;
  }

  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const fileName = path.join(startPath, file);
    const fileStatus = fs.lstatSync(fileName);

    if (fileStatus.isDirectory()) {
      moveDefinitionsFrom(fileName, filter);
    } else if (fileName.indexOf(filter) >= 0) {
      moveDefinition(fileName);
    }
  }
}

/**
 * Move a single type definition file.
 */
function moveDefinition(filename: string): void {
  const pathToFile = path.dirname(filename).slice(4);
  createDirectoryIfNecessary("types/" + pathToFile);

  const relativePath = path.join("types/", filename.slice(4));
  fs.rename(filename, relativePath, error => {
    if (error) throw error;
  });
}

function createDirectoryIfNecessary(newPath: string): void {
  if (!fs.existsSync(path.dirname(newPath))) {
    // Create sub directory.
    createDirectoryIfNecessary(path.dirname(newPath));
  }
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }
}
