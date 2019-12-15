const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

if (process.env.PWD.match(/node_modules/)) {
  // move sources
  fse.moveSync("dist/js", "js");
  fse.moveSync("dist/scss", "scss");

  // clean repo
  fse.removeSync(".resources");
  fse.removeSync("demo");
  fse.removeSync("dist");
  fse.removeSync("scripts");
  fse.removeSync("src");
  fse.removeSync("tests");

  // update sass files at root
  fs.writeFileSync("_index.scss", '@import "scss/index";');
}
