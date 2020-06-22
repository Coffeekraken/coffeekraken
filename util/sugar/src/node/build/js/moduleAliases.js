const __moduleAlias = require('module-alias');
const __glob = require('glob');
const __path = require('path');
const __fs = require('fs');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name          moduleAliases
 * @namespace     sugar.node.build.js
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
module.exports = function moduleAliases(
  rootDir = __packageRoot(process.cwd(), true)
) {
  const globPattern = `${rootDir}/*/**/package.json`;

  const modulePathes = __glob.sync(globPattern, {
    ignore: '**/node_modules/**'
  });

  modulePathes.forEach((path) => {
    const packageJson = require(path);
    const name = packageJson.name;
    const folderPath = path.split('/').slice(0, -1).join('/');
    __moduleAlias.addAlias(name, __path.resolve(folderPath));
  });
};
