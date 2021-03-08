import __deepMerge from '../object/deepMerge';
import __ResolveSettingsInterface from './interface/ResolveSettingsInterface';
import __fs from 'fs';
import __path from 'path';
import __isFile from '../is/file';
import __isFolder from '../is/folder';
import __packageRoot from '../path/packageRoot';
import __builtInNodeModules from './buildInNodeModules';
import __exportsMatch from './exportsMatch';
import __existsSync from '../fs/existsSync';

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
  builtInModules: boolean;
  preferExports: boolean;
}

export default async function resolve(
  moduleName: string,
  settings?: Partial<IResolveSettings>
) {
  const set = <IResolveSettings>__deepMerge(
    {
      ...__ResolveSettingsInterface.defaults()
    },
    settings || {}
  );

  // build in modules
  const builtInModulesArray = Object.keys(__builtInNodeModules);
  if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
    return moduleName;

  // loop on directories
  for (let i = 0; i < set.dirs.length; i++) {
    const dirPath = set.dirs[i];

    let moduleDirPath: string,
      internalModulePath: string,
      absPath: string,
      packageJson: any;

    // if moduleName starts with a "." or a "/"
    // this mean that we do not target a module in the "node_modules" folder
    if (!moduleName.match(/^[\.\/]/)) {
      // find the module directory by checking for the two first something/else
      const parts = moduleName.split('/');

      if (
        parts.length === 1 &&
        __existsSync(__path.resolve(dirPath, parts[0], 'package.json'))
      ) {
        packageJson = require(__path.resolve(
          dirPath,
          parts[0],
          'package.json'
        ));
        moduleDirPath = __path.resolve(dirPath, parts[0]);
      } else if (
        parts.length >= 2 &&
        __existsSync(
          __path.resolve(dirPath, parts[0], parts[1], 'package.json')
        )
      ) {
        packageJson = require(__path.resolve(
          dirPath,
          parts[0],
          parts[1],
          'package.json'
        ));
        absPath = __path.resolve(dirPath, moduleName);
        moduleDirPath = __path.resolve(dirPath, parts[0], parts[1]);
        internalModulePath = parts.slice(2).join('/');
      } else {
        throw new Error(
          `Sorry but the passed module path does not correspond to any existing modules in your "node_module" folder...`
        );
      }
    } else {
      // check if the passed moduleName is a node module
      if (__existsSync(__path.resolve(dirPath, moduleName, 'package.json'))) {
        packageJson = require(__path.resolve(
          dirPath,
          moduleName,
          'package.json'
        ));
        moduleDirPath = __path.resolve(dirPath, moduleName);
      } else {
        absPath = __path.resolve(dirPath, moduleName);
      }
    }

    // check if the file exists
    if (__isFile(absPath)) {
      return absPath;
    }

    if (packageJson) {
      // check exports if prefered over fields
      if (
        internalModulePath &&
        packageJson.exports !== undefined &&
        set.preferExports
      ) {
        return __exportsMatch(
          absPath,
          packageJson.exports,
          internalModulePath,
          {}
        );
      }
    }

    // if (__isFolder(absPath) && __isFile(`${absPath}/package.json`)) {
    //   const packageJson = require(`${absPath}/package.json`);

    //   // check exports if prefered over fields
    //   if (packageJson.exports !== undefined && set.preferExports) {
    //     return __exportsMatch(absPath, packageJson.exports, moduleName, {});
    //   }

    //   // check each fields one after the other
    //   for (let j = 0; j < set.fields.length; j++) {
    //     const field = set.fields[j];
    //     if (!packageJson[field]) continue;
    //     const filePath = __path.resolve(absPath, packageJson[field]);
    //     if (!__isFile(filePath)) continue;
    //     return filePath;
    //   }

    //   // check exports if not prefered over fields
    //   if (packageJson.exports !== undefined && !set.preferExports) {
    //   }
    // } else {
    //   // check extensions free path
    //   for (let j = 0; j < set.extensions.length; j++) {
    //     const ext = set.extensions[j];
    //     if (__isFile(`${absPath}.${ext}`)) {
    //       return `${absPath}.${ext}`;
    //     }
    //   }
    // }

    // nothing found
    throw new Error(
      `Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`
    );
  }
}
