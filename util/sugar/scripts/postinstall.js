const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

if (process.env.PWD.match(/node_modules/)) {
  // move sources
  fse.moveSync("src/scss", "scss");
  fse.moveSync("dist/js", "js");
  fse.moveSync("src/node", "node");

  // clean repo
  fse.removeSync("_toMigrate");
  fse.removeSync(".resources");
  fse.removeSync("demo");
  fse.removeSync("dist");
  fse.removeSync("scripts");
  fse.removeSync("src");
  fse.removeSync("tests");

  // update sass files at root
  fs.writeFileSync("_index.scss", '@import "scss/sugar";');
}
