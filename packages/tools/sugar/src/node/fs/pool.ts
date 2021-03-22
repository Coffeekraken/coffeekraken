import __deepMerge from '../../shared/object/deepMerge';
import __chokidar from 'chokidar';
import __expandGlob from '../../shared/glob/expandGlob';
import __SFile from './SFile';
import __SPromise from '@coffeekraken/s-promise';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name                pool
 * @namespace           sugar.ts.fs
 * @type                Function
 * @async
 *
 * This function simply take as parameter a glob (or array of globs) pattern(s)
 * and return an SPromise instance through which you can subscribe to events like:
 * - file: Emitted for each file founded (or added)
 * - files: Emitted with a list of founded (or added) files
 * - update: Emitted when a file has been updated
 * - unlink: Emitted when a file has been deleted
 * - add: Emitted when a file has been added
 *
 *
 * @param       {String|Array<String>}          input           The input glob(s)
 * @param       {IPoolSettings}             [settings={}]       Some settings to configure your pool. Support all the chokidar settings
 * @return      {SPromise}                                      An SPromise instance through which you can subscribe to events and cancel the pool
 *
 * @example         js
 * import pool from '@coffeekraken/sugar/node/fs/pool';
 * pool('/something/cool/** /*').on('file', file => {
 *      // do something with each files
 * }).on('update', (file) => {
 *      // do something with updated files
 * });
 *
 * @see             https://www.npmjs.com/package/chokidar
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IPoolSettings {
  SFile: boolean;
  updateTimeout: number;
  cwd: string;
  watch: boolean;
  [key: string]: any;
}
function pool(input, settings?: Partial<IPoolSettings>) {
  const filesStack: Record<string, string | __SFile> = {};

  return new __SPromise(
    ({ resolve, reject, emit, cancel, on }) => {
      const set = <IPoolSettings>__deepMerge(
        {
          SFile: true,
          updateTimeout: 500,
          cwd: process.cwd(),
          watch: false,
          ignored: ['**/node_modules/**/*', '**/.git/**/*'],
          ignoreInitial: true
        },
        settings || {}
      );

      if (!Array.isArray(input)) input = [input];
      input = __replacePathTokens(input);

      // expand glob
      const expandedGlobs: string[] = __expandGlob(input);

      // using chokidar to watch files
      const watcher = __chokidar.watch(expandedGlobs, {
        ...set
      });
      watcher
        .on('add', (path) => {
          if (filesStack[path]) return;
          // make sure it's not exists already
          if (!filesStack[path]) {
            if (set.SFile) filesStack[path] = __SFile.instanciate(path);
            else filesStack[path] = path;
          }
          emit('add', filesStack[path]);
        })
        .on('change', (path) => {
          if (!filesStack[path]) {
            if (set.SFile) filesStack[path] = __SFile.instanciate(path);
            else filesStack[path] = path;
          }
          emit('update', filesStack[path]);
        })
        .on('unlink', (path) => {
          // @ts-ignore
          if (filesStack[path] && filesStack[path].path) {
            // @ts-ignore
            emit('unlink', filesStack[path].path);
          } else if (filesStack[path] && typeof filesStack[path] === 'string') {
            emit('unlink', filesStack[path]);
          }
          delete filesStack[path];
        })
        .on('ready', () => {
          const files = watcher.getWatched();
          const filesPaths: string[] = [];
          const finalFiles: (__SFile | string)[] = [];
          Object.keys(files).forEach((path) => {
            files[path].forEach((fileName) => {
              filesPaths.push(`${path}/${fileName}`);
            });
          });
          filesPaths.forEach((filePath) => {
            if (set.SFile) finalFiles.push(__SFile.instanciate(filePath));
            else finalFiles.push(filePath);
            emit('file', finalFiles[finalFiles.length - 1]);
            // save file in file stack
            filesStack[filePath] = finalFiles[finalFiles.length - 1];
          });
          emit('files', finalFiles);
          if (!set.watch) {
            watcher.close();
            resolve(finalFiles);
          }
        });

      // handle cancel
      on('cancel', () => {
        watcher.close();
      });
    },
    {
      eventEmitter: {}
    }
  );
}

export default pool;
