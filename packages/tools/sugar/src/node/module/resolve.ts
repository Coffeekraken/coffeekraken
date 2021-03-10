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
import __extension from '../fs/extension';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';

/**
 * @name            resolve
 * @namespace       sugar.node.module
 * @type            Function
 *
 * This function take as parameter a module path to resolve and returns back the
 * correct path to this module. It check for package.json file and fields like "main", "module", etc...
 *
 * @feature     Main entry point export     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath exports     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath patterns      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditional exports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Nested conditions       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditions Definitions      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 *
 * @todo        Exports sugar         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath folder mappings         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath imports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
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
  method: 'import' | 'require';
  target: 'node' | 'default';
}

export default function resolve(
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

  let moduleDirPath: string,
    internalModulePath: string,
    absPath: string,
    packageJson: any;

  // loop on directories
  for (let i = 0; i < set.dirs.length; i++) {
    const dirPath = set.dirs[i];

    // if moduleName starts with a "." or a "/"
    // this mean that we do not target a module in the "node_modules" folder
    if (!moduleName.match(/^[\.\/]/)) {
      // find the module directory by checking for the two first something/else
      const parts = moduleName.split('/');

      if (
        parts.length >= 1 &&
        __existsSync(__path.resolve(dirPath, parts[0], 'package.json'))
      ) {
        packageJson = require(__path.resolve(
          dirPath,
          parts[0],
          'package.json'
        ));
        moduleDirPath = __path.resolve(dirPath, parts[0]);
        internalModulePath = parts.slice(1).join('/');
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
        moduleDirPath = __path.resolve(dirPath, parts[0], parts[1]);
        internalModulePath = parts.slice(2).join('/');
      }
    } else {
      // check if is a file in the dir using the extensions
      const filePath = __checkPathWithMultipleExtensions(
        __path.resolve(dirPath, moduleName),
        set.extensions
      );
      if (filePath) return filePath;

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
  }

  // abs path
  if (absPath && __isFile(absPath)) return absPath;

  if (packageJson && moduleDirPath) {
    function exportsMatch() {
      const matchPath = __exportsMatch(
        moduleDirPath,
        packageJson.exports,
        internalModulePath,
        {
          extensions: set.extensions,
          method: set.method,
          target: set.target
        }
      );
      if (matchPath) return matchPath;
    }

    // exports field with an internalModulePath
    if (packageJson.exports !== undefined && set.preferExports) {
      const exportsRes = exportsMatch();
      if (exportsRes) return exportsRes;
    }

    // "fields" check
    for (let j = 0; j < set.fields.length; j++) {
      const field = set.fields[j];
      if (!packageJson[field]) continue;
      const filePath = __path.resolve(moduleDirPath, packageJson[field]);
      if (!__isFile(filePath)) continue;
      return filePath;
    }

    // exports field with an internalModulePath
    if (packageJson.exports !== undefined && !set.preferExports) {
      const exportsRes = exportsMatch();
      if (exportsRes) return exportsRes;
    }
  }

  // console.log('packageJson', packageJson);
  // console.log('internalModulePath', internalModulePath);
  // console.log('moduleDirPath', moduleDirPath);
  // console.log('absPath', absPath);

  // nothing found
  throw new Error(
    `Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`
  );
}
