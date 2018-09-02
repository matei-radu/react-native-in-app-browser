/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import fs from "fs-extra";
import tar from "tar";

// Read development version of package.json.
const packageJson = JSON.parse(fs.readFileSync("package.json").toString());

// Extract package made by `yarn pack`.
tar.extract({
  file: `matt-block-react-native-in-app-browser-v${packageJson.version}.tgz`,
  sync: true
});

// Remove unnecessary entries and reformat.
delete packageJson.scripts;
delete packageJson.husky;
delete packageJson.devDependencies;
const simplifiedPackageJson = JSON.stringify(packageJson, null, 2);

// Update the extracted version of package.json with simplified one.
fs.writeFileSync("package/package.json", simplifiedPackageJson, {
  encoding: "utf-8"
});

// Recreate package archive.
tar.create(
  {
    gzip: true,
    sync: true,
    file: `matt-block-react-native-in-app-browser-v${packageJson.version}.tgz`
  },
  ["package/"]
);

// Cleanup.
fs.removeSync("package");
fs.removeSync("android");
fs.removeSync("ios");
fs.removeSync("lib");
fs.removeSync("types");
