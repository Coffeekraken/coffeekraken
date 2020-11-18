const __fs = require('fs');
const __path = require('path');
const __SPromise = require('../promise/SPromise');
const __findPackages = require('./findPackages');
const __childProcess = require('child_process');
const __ensureDirSync = require('../fs/ensureDirSync');

/**
 * @name            linkPackages
 * @namespace       sugar.node.monorepo
 * @type            Function
 * @async
 *
 * This function simply check all the packages available in the monorepo
 * and link then together using symbolic links in each node_modules folders
 *
 * @param       {Object}        [settings={}]         A settings object to configure your linking process
 * @return      {SPromise}                            A promise that will be resolved once the process is finished
 *
 * @setting     {String}      [rootDir=process.cwd()]       Specify the root directory from where to start the process
 *
 *
 * @todo        document settings
 *
 * @example       js
 * const linkPackages = require('@coffeekraken/sugar/node/monorepo/linkPackages');
 * await linkPackages();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function linkPackages(settings = {}) {
  settings = {
    rootDir: process.cwd(),
    ...settings
  };
  return new __SPromise(async (resolve, reject, trigger, cancel) => {
    // make sure we are in a package
    if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
      return reject(
        `Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`
      );
    }
    // read the package json
    // const json = require(`${settings.rootDir}/package.json`);
    // search for packages of the monorepo
    const packagesObj = await __findPackages(settings.rootDir);
    // loop on each packages
    Object.keys(packagesObj).forEach((packagePath) => {
      // get json
      const packageJson = packagesObj[packagePath];
      // logs
      trigger('log', {
        value: `<yellow>${packageJson.name}</yellow> (<cyan>${packageJson.version}</cyan>)`
      });
      // loop again in the packagesObj to create symlink in every
      // node_modules packages folders
      Object.keys(packagesObj).forEach((path) => {
        if (packagePath === path) return; // avoid linking itself
        const json = packagesObj[path];
        const currentModulePath = `${settings.rootDir}/${packagePath}`;
        const destinationModulePath = `${settings.rootDir}/${path}`;
        const nodeModulesPath = `${currentModulePath}/node_modules`;
        let symlinkFolderPath = nodeModulesPath;
        const splitedName = json.name.split('/');
        let groupFolder = splitedName.length === 2 ? splitedName[0] : null;
        if (groupFolder) {
          __ensureDirSync(`${nodeModulesPath}/${groupFolder}`);
          symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
        }
        let nameFolder =
          splitedName.length === 2 ? splitedName[1] : splitedName[0];
        const relPathToDestinationModule = __path.relative(
          symlinkFolderPath,
          destinationModulePath
        );
        __childProcess.execSync(
          `cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`
        );
        // logs
        trigger('log', {
          value: `- Symlink to <green>${json.name}</green> package`
        });
      });
    });
    // resolvee
    resolve();
  });
};
