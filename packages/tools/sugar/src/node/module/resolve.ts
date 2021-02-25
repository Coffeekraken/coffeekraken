import __deepMerge from '../object/deepMerge';
import __ResolveSettingsInterface from './interface/ResolveSettingsInterface';
import __fs from 'fs';
import __path from 'path';
import __isFile from '../is/file';
import __isFolder from '../is/folder';

/**
 * @name            resolve
 * @namespace       sugar.node.module
 * @type            Function
 *
 * This function take as parameter a module path to resolve and returns back the
 * correct path to this module. It check for package.json file and fields like "main", "module", etc...
 *
 * @param       {String}        module          The module to resolve
 * @param       {IResolveSettings}      [settings={}]       Some settings to configure your resolve process
 * @return      {String}                                The path to the module to actually load
 *
 * @example         js
 * import resolve from '@coffeekraken/sugar/node/module/resolve';
 * resolve('@coffeekraken/sugar'); // => /something/node_modules/@coffeekraken/sugar/index.js
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IResolveSettings {
  dirs: string[];
  extensions: string[];
  fields: string[];
}

export default function resolve(
  module: string,
  settings?: Partial<IResolveSettings>
) {
  const set = <IResolveSettings>__deepMerge(
    {
      ...__ResolveSettingsInterface.defaults()
    },
    settings || {}
  );

  // loop on directories
  for (let i = 0; i < set.dirs.length; i++) {
    const dirPath = set.dirs[i];
    const absPath = __path.resolve(dirPath, module);
    // check if the file exists
    if (__isFile(absPath)) {
      return absPath;
    } else if (__isFolder(absPath) && __isFile(`${absPath}/package.json`)) {
      const packageJson = require(`${absPath}/package.json`);
      // check each fields one after the other
      for (let j = 0; j < set.fields.length; j++) {
        const field = set.fields[j];
        if (!packageJson[field]) continue;
        const filePath = __path.resolve(absPath, packageJson[field]);
        if (!__isFile(filePath)) continue;
        return filePath;
      }
    } else {
      // check extensions free path
      for (let j = 0; j < set.extensions.length; j++) {
        const ext = set.extensions[j];
        if (__isFile(`${absPath}.${ext}`)) {
          return `${absPath}.${ext}`;
        }
      }
    }

    // nothing found
    throw new Error(
      `Sorry but the requested module "<yellow>${module}</yellow>" cannot be resolved correctly...`
    );
  }
}
