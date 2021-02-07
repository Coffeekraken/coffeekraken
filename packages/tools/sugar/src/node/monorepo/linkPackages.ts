// @ts-nocheck

import _ensureDirSync from '../fs/ensureDirSync';
import _path from 'path';
import _SPromise from '../promise/SPromise';
import _findPackages from './findPackages';
import _childProcess from 'child_process';
import _fs from 'fs';

/**
 * @name            linkPackages
 * @namespace       sugar.node.monorepo
 * @type            Function
 * @async
 * @status              beta
 *
 * This function simply check all the packages available in the monorepo
 * and link then together using symbolic links in each node_modules folders
 *
 * @param       {Object}        [settings={}]         A settings object to configure your linking process
 * @return      {SPromise}                           A promise that will be resolved once the process is finished
 *
 * @setting     {String}      [rootDir=process.cwd()]       Specify the root directory from where to start the process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import linkPackages from '@coffeekraken/sugar/node/monorepo/linkPackages';
 * await linkPackages();
 *
 * @since       2.0.0
 * @author      Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface ILinkPackagesResolveRejectFn {
  (value: any): void;
}
interface ILinkPackagesEmitFn {
  (stack: string, value: any): any;
}
interface ILinkPackagesCancelFn {
  (value: any): any;
}
export = function linkPackages(settings = {}): Promise<null> {
  settings = {
    rootDir: process.cwd(),
    ...settings
  };
  return new _SPromise(
    async (
      resolve: ILinkPackagesResolveRejectFn,
      reject: ILinkPackagesResolveRejectFn,
      emit: ILinkPackagesEmitFn
    ) => {
      // make sure we are in a package
      if (!_fs.existsSync(`${settings.rootDir}/package.json`)) {
        return reject(
          `Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`
        );
      }
      // search for packages of the monorepo
      const packagesObj = await _findPackages(settings.rootDir);
      // loop on each packages
      Object.keys(packagesObj).forEach((packagePath) => {
        // get json
        const packageJson = packagesObj[packagePath];
        // logs
        emit('log', {
          value: `<yellow>${packageJson.name}</yellow> (<cyan>${packageJson.version}</cyan>)`
        });
        // loop again in the packagesObj to create symlink in every
        // node_modules packages folders
        Object.keys(packagesObj).forEach((path) => {
          if (packagePath === path) return; // avoid linking itself
          const json = packagesObj[path];
          if (
            (packageJson.dependencies &&
              Object.keys(packageJson.dependencies).includes(json.name)) ||
            (packageJson.devDependencies &&
              Object.keys(packageJson.devDependencies).includes(json.name))
          ) {
          } else return;
          const currentModulePath = `${settings.rootDir}/${packagePath}`;
          const destinationModulePath = `${settings.rootDir}/${path}`;
          const nodeModulesPath = `${currentModulePath}/node_modules`;
          let symlinkFolderPath = nodeModulesPath;
          const splitedName = json.name.split('/');
          const groupFolder = splitedName.length === 2 ? splitedName[0] : null;
          if (groupFolder) {
            _ensureDirSync(`${nodeModulesPath}/${groupFolder}`);
            symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
          }
          const nameFolder =
            splitedName.length === 2 ? splitedName[1] : splitedName[0];
          const relPathToDestinationModule = _path.relative(
            symlinkFolderPath,
            destinationModulePath
          );
          _childProcess.execSync(
            `cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`
          );
          // logs
          emit('log', {
            value: `- Symlinked package <green>${json.name}</green>`
          });
        });
      });
      // resolvee
      resolve();
    }
  );
};
