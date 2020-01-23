const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const replaceAll = require('replace-in-files');

if (process.env.PWD.match(/node_modules/)) {
  // move sources
  fse.moveSync("src/scss", "scss");
  fse.moveSync("dist/js", "js");
  fse.moveSync("src/node", "node");

  // clean repo
  fse.removeSync("_toMigrate");
  fse.removeSync(".resources");
  fse.removeSync("demo");
  // fse.removeSync("dist");
  fse.removeSync("scripts");
  // fse.removeSync("src");
  fse.removeSync("tests");

  // replace all needed paths in node files
  replaceAll({
    files: 'node/**/*.js',
    from: /..\/..\/..\/dist\/js/g,
    to: '../../js'
  });

  // update sass files at root
  fs.writeFileSync("_index.scss", '@import "src/scss/sugar";');
}
