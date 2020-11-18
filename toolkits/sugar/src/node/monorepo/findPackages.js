const __glob = require('glob');
const __folderPath = require('../fs/folderPath');

/**
 * @name            findPackages
 * @namespace       sugar.node.monorepo
 * @type            Function
 * @async
 *
 * This function simply let you search for packages (that are not dependencies) inside
 * the passed folder and returns a object with relative paths as keys and package.json
 * content value
 *
 * @param         {String}          [rootDir=process.cwd()]       The root directory from where to search for packages
 * @return        {Promise}                                       A promise that will be resolved once the process is finished with the resulting object
 *
 * @example       js
 * const findPackages = require('@coffeekraken/sugar/node/monorepo/findPackages');
 * const packages = await findPackages();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function findPackages(rootDir = process.cwd()) {
  return new Promise((resolve, reject) => {
    const packagesObj = {};
    const packagesPaths = __glob
      .sync('**/package.json', {
        cwd: rootDir,
        ignore: '**/node_modules/**'
      })
      .filter((path) => path !== 'package.json');
    packagesPaths.forEach((path) => {
      packagesObj[__folderPath(path)] = require(`${rootDir}/${path}`);
    });
    resolve(packagesObj);
  });
};
