const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

if (process.env.PWD.match(/node_modules/)) {
  // // move sources
  // fse.moveSync("dist/js", "js");
  // fse.moveSync("dist/css", "css");
  // fse.moveSync("dist/img", "img");

  // clean repo
  fse.removeSync(".resources");
  fse.removeSync("demo");
  fse.removeSync("scripts");
  fse.removeSync("src");
  fse.removeSync("tests");
}
