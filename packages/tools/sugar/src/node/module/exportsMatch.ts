import __minimatch from 'minimatch';
import __isNode from '../is/node';
import __isPlainObject from '../is/plainObject';
import __sugarConfig from '../config/sugar';
import __fs from 'fs';
import __path from 'path';
import __extension from '../fs/extension';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';

/**
 * @name        exportsMatch
 * @namespace   sugar.node.module
 * @type        Function
 *
 * This function take as parameter the content of the "exports" package.json field
 * and the requested "module" string/path. With these informations, it will search
 * for a matching export file path and return it back.
 *
 * @param       {String}        packageDir      The path to the package directory
 * @param       {Object}        exports         The "exports" field content
 * @param       {String}        modulePath      The "module" path you want to get
 * @param       {IExportsMatchSettings}     [settings={}]           Some settings to configure your exports match process
 *
 * @example         js
 * import exportMatch from '@coffeekraken/sugar/module/exportsMatch';
 * exportsMatch('/something/@coffeekraken/sugar', {...}, '@coffeekraken/sugar/class/SClass');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IExportsMatchSettings {
  method: 'require' | 'import';
  target: 'node' | 'default';
  extensions: string;
}
export default function exportsMatch(
  packageDir: string,
  exportsObj: any,
  modulePath: string,
  settings?: Partial<IExportsMatchSettings>
): string | undefined {
  let modulesSubpaths = exportsObj;

  const set: IExportsMatchSettings = {
    method: 'import',
    target: __isNode() ? 'node' : 'default',
    extensions: __sugarConfig('module.resolve.extensions'),
    ...(settings || {})
  };

  // loop on exports keys
  const keys: string[] = Object.keys(exportsObj);

  if (keys.indexOf('node') !== -1 || keys.indexOf('default') !== -1) {
    if (keys.length > 2)
      throw new Error(
        `Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "node" and "default" at the same level...`
      );
  }
  if (keys.indexOf('require') !== -1 || keys.indexOf('import') !== -1) {
    if (keys.length > 2)
      throw new Error(
        `Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "require" and "import" at the same level...`
      );
  }

  let founded = false;
  while (!founded) {
    if (
      Object.keys(modulesSubpaths).indexOf('node') !== -1 ||
      Object.keys(modulesSubpaths).indexOf('default') !== -1
    ) {
      // check "node" and "default" keys
      if (set.target === 'node' && modulesSubpaths.node !== undefined) {
        modulesSubpaths = modulesSubpaths.node;
      } else if (modulesSubpaths.default) {
        modulesSubpaths = modulesSubpaths.default;
      }
    }
    if (
      Object.keys(modulesSubpaths).indexOf('import') !== -1 ||
      Object.keys(modulesSubpaths).indexOf('require') !== -1
    ) {
      // check "import" and "require" method
      if (set.method === 'import' && modulesSubpaths.import !== undefined) {
        modulesSubpaths = modulesSubpaths.import;
      } else if (modulesSubpaths.require) {
        modulesSubpaths = modulesSubpaths.require;
      }
    }
    if (__isPlainObject(modulesSubpaths)) {
      // check if a key match
      for (let key in modulesSubpaths) {
        if (__minimatch(modulePath, key.replace(/^\.\//, ''))) {
          // console.log('MATCH', modulePath, key);
          const matchStr = key.replace(/^\.\//, '').replace(/\/\*$/, '');

          const modulePathExt = __extension(modulePath);
          const internalPackageSubPathExt = __extension(modulesSubpaths[key]);

          // check extension match
          if (
            internalPackageSubPathExt &&
            modulePathExt &&
            internalPackageSubPathExt !== modulePathExt
          )
            continue;

          const internalPath = modulesSubpaths[key]
            .replace(/^\.\//, '')
            .replace(/\/\*(\.[a-zA-Z0-9]+)?/, '');

          const realPath = modulePath
            .replace(`${matchStr}/`, '')
            .replace(matchStr, '');

          let potentialPath: string;

          // check if a file exists
          if (internalPackageSubPathExt) {
            const potentialPathArray = [packageDir];
            if (internalPath && internalPath.trim() !== '')
              potentialPathArray.push(internalPath);
            if (realPath && realPath.trim() !== '')
              potentialPathArray.push(realPath);
            potentialPath = potentialPathArray.join('/');
            if (!modulePathExt)
              potentialPath += `.${internalPackageSubPathExt}`;
          } else {
            // if modulePath has extension
            const potentialPathArray = [packageDir];
            if (internalPath && internalPath.trim() !== '')
              potentialPathArray.push(internalPath);
            if (realPath && realPath.trim() !== '')
              potentialPathArray.push(realPath);
            potentialPath = potentialPathArray.join('/');

            // try to get a file that correspond to this path
            potentialPath = __checkPathWithMultipleExtensions(
              potentialPath,
              set.extensions
            );
          }

          if (!potentialPath) return undefined;

          // check if the potential image exists and return it
          if (__fs.existsSync(potentialPath)) return potentialPath;

          modulesSubpaths = matchStr;
          break;
        }
      }
    }

    // check if we have finished checking these fields
    if (
      (modulesSubpaths.node === undefined &&
        modulesSubpaths.default === undefined &&
        modulesSubpaths.import === undefined &&
        modulesSubpaths.require === undefined) ||
      !__isPlainObject(modulesSubpaths)
    ) {
      founded = true;
    }
  }

  if (typeof modulesSubpaths === 'string') {
    const potentialPath = __path.resolve(packageDir, modulesSubpaths);
    // check is the file exists inside the package
    if (__fs.existsSync(potentialPath)) return potentialPath;
  }

  // nothing has been found so we return undefined
  return undefined;
}
