// @ts-nocheck

import IFindUp, { IFindUpSettings } from './interface/IFindUp';
import __findUp from 'find-up';
import __glob from 'glob';
import __isGlob from '../../shared/is/glob';
import __fs from 'fs';
import __SFile from './SFile';

/**
 * @name            findUp
 * @namespace       sugar.node.fs
 * @type            Function
 * @async
 *
 * This function simply walk across upper folders to search for a file
 * and returns you the first finded
 *
 * @param       {IFindUpSearch}         search          The name of the file you search
 * @param       {IFindUpSettings}       [settings={}]       An object of settings to configure your research
 * @return      {SFile|null}                                 An SFile instance or null if nothings founded
 *
 * @example         js
 * import findUp from '@coffeekraken/sugar/node/fs/findUp';
 * const file = await findUp('myCoolFile.json', {});
 * console.log(file.path);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn: IFindUp = function findUp(
  search: string,
  settings: IFindUpSettings
): Promise<string | string[] | null> {
  settings = {
    symlinks: true,
    cwd: process.cwd(),
    stopWhenFound: true,
    SFile: true,
    ...settings
  };

  return new Promise(async ({ resolve, reject }) => {
    const cwd = settings.cwd;
    let currentPath = cwd.split('/').filter((p) => p.trim() !== '');
    let foundedFiles = [];

    while (currentPath.length > 0) {
      const path = `/${currentPath.join('/')}`;
      if (__isGlob(search)) {
        let files = __glob.sync(search, {
          cwd: path,
          symlinks: settings.symlinks
        });
        if (files && files.length) {
          files = files.map((f) => {
            return `${path}/${f}`;
          });
          foundedFiles = [...foundedFiles, ...files];
        }
      } else if (__fs.existsSync(`${path}/${search}`)) {
        foundedFiles.push(`${path}/${search}`);
      }
      // check if we need to stop when found
      if (settings.stopWhenFound && foundedFiles.length) {
        break;
      }
      // update the currentPath
      currentPath = currentPath.slice(0, -1);
    }

    if (settings.SFile === true) {
      // wrap into an SFile
      foundedFiles = foundedFiles.map((path) => {
        return new __SFile(path);
      });
    }

    // resolve at the end
    return resolve(foundedFiles);
  });
};

export default fn;
