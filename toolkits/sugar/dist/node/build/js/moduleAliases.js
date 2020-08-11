"use strict";

var __moduleAlias = require('module-alias');

var __glob = require('glob');

var __path = require('path');

var __fs = require('fs');

var __packageRoot = require('../../path/packageRoot');
/**
 * @name          moduleAliases
 * @namespace           node.build.js
 * @type          Function
 *
 * This function simply check for all the packages inside the passed rootDir
 * and create an alias for each of them so you can work inside a monorepo
 * on all your packages without having to link them together using a weird trick
 *
 * @param       {String}        [rootDir=__packageRoot(process.cwd(), true)]      Specify the root directory to check for packages
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function moduleAliases(rootDir) {
  if (rootDir === void 0) {
    rootDir = __packageRoot(process.cwd(), true);
  }

  var globPattern = "".concat(rootDir, "/*/**/package.json");

  var modulePathes = __glob.sync(globPattern, {
    ignore: '**/node_modules/**'
  });

  modulePathes.forEach(path => {
    var packageJson = require(path);

    var name = packageJson.name;
    var folderPath = path.split('/').slice(0, -1).join('/');

    __moduleAlias.addAlias(name, __path.resolve(folderPath));
  });
};