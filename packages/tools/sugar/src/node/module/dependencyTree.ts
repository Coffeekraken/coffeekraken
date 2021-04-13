import __SPromise from '@coffeekraken/s-promise';
import __SCache from '@coffeekraken/s-cache';
import __dependencyTree from 'dependency-tree';
import __deepMerge from '../../shared/object/deepMerge';
import __fs from 'fs';
import __packageRoot from '../path/packageRoot';
import __md5 from '../../shared/crypt/md5';
import __folderPath from '../fs/folderPath';
import __path from 'path';
import __SFile from '@coffeekraken/s-file';
import __extractImport from './extractImport';

/**
 * @name                dependencyTree
 * @namespace           sugar.node.module
 * @type                Function
 * @async
 *
 * Async wrapper around the amazing dependency-tree module made by mrjoelkemp.
 * This wrapper add some capabilities like caching already parsed dependencies.
 *
 * @param       {String}                    filePath                The absolute file path you want to get the dependency tree from
 * @param       {IDependencyTreeExtendedSettings}       [settings={}]       Some settings (like all the dependency-tree supported ones (excluding filename and directory)), and some additional like caching.
 * @return      {SPromise}                               An SPromise instance through which you can get logs, and that will be resolved once the process is over
 *
 * @example         js
 * import dependencyTree from '@coffeekraken/sugar/node/module/dependencyTree';
 * await dependencyTree('/something/cool.js', {
 *      cache: true,
 *      // etc...
 * });
 *
 * @see             https://www.npmjs.com/package/dependency-tree
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IDependencyTreeNodeModulesConfig {
  entry: string;
}
export interface IDependencyTreeExtendedSettings {
  requireConfig?: string;
  webpackConfig?: string;
  tsConfig?: string;
  nodeModulesConfig?: IDependencyTreeNodeModulesConfig;
  filter?(path: string): number;
  nonExistent?: string[];
  detective?: any;
  cache?: boolean | string;
  deep?: boolean;
}

export default function dependencyTree(
  filePath: string,
  settings?: Partial<IDependencyTreeExtendedSettings>
): any {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    // settings
    const set = <IDependencyTreeExtendedSettings>__deepMerge(
      {
        deep: false,
        cache: false
      },
      settings || {}
    );

    const logPath = __path.relative(__packageRoot(), filePath);

    // check filename existence
    if (!__fs.existsSync(filePath)) {
      throw new Error(
        `dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`
      );
    }

    // integrity parts
    let packageJsonMtimeMs = -1,
      fileMtimeMs = __fs.statSync(filePath).mtimeMs;

    // package.json mtimeMs
    const packageJsonPath = `${__packageRoot()}/package.json`;
    if (__fs.existsSync(packageJsonPath)) {
      packageJsonMtimeMs = __fs.statSync(packageJsonPath).mtimeMs;
    }

    // init cache
    const cache = new __SCache('dependency-tree');

    // integrity
    const integrity = __md5.encrypt({
      packageJsonMtimeMs,
      fileMtimeMs
    });

    // check cache
    if (set.cache) {
      emit('log', {
        value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
      });

      // cache id
      const cachedValue = await cache.get(filePath);
      if (cachedValue) {
        // check integrity
        if (cachedValue.integrity === integrity) {
          emit('log', {
            value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
          });

          // return the actual valid value
          return resolve(cachedValue.tree);
        }
      }
    }

    emit('log', {
      value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`
    });

    // actually dependency tree generation
    // const tree = __dependencyTree({
    //   ...set,
    //   filename: filePath,
    //   directory: __folderPath(filePath)
    // });

    // tree
    const tree = {};

    // create an SFile instance
    const file = __SFile.new(filePath);

    const imports = __extractImport(file.content);

    emit('log', {
      value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
    });

    // caching tee if needed
    if (set.cache) {
      emit('log', {
        value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`
      });

      await cache.set(filePath, {
        tree,
        integrity
      });
    }

    // returning the tree
    resolve(tree);
  });
}
