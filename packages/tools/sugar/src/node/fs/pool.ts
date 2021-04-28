import __deepMerge from '../../shared/object/deepMerge';
import __chokidar from 'chokidar';
import __expandGlob from '../../shared/glob/expandGlob';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __replacePathTokens from '../path/replacePathTokens';
import __matchGlob from '../glob/matchGlob';
import __hotkey from '../keyboard/hotkey';
import __path from 'path';

/**
 * @name                pool
 * @namespace            ts.fs
 * @type                Function
 * @async
 *
 * This function simply take as parameter a glob (or array of globs) pattern(s)
 * and return an SPromise instance through which you can subscribe to events like:
 * - file: Emitted for each file founded, added or updated
 * - files: Emitted with a list of founded files
 * - update: Emitted when a file has been updated
 * - unlink: Emitted when a file has been deleted
 * - add: Emitted when a file has been added
 *
 *
 * @param       {String|Array<String>}          input           The input glob(s)
 * @param       {IPoolSettings}             [settings={}]       Some settings to configure your pool. Support all the chokidar settings
 * @return      {SPromise}                                      An SPromise instance through which you can subscribe to events and cancel the pool
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
  exclude: string[];
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
          exclude: [],
          ignored: ['**/node_modules/**/*', '**/.git/**/*'],
          ignoreInitial: true
          // usePolling: true,
          // useFsEvents: true,
          // persistent: true
        },
        settings || {}
      );

      if (!Array.isArray(input)) input = [input];
      input = input.map((i) => {
        return i.path ?? i;
      });
      input = __replacePathTokens(input);

      // expand glob
      const expandedGlobs: string[] = __expandGlob(input).map((l) => {
        return l
          .split(':')[0]
          .replace(set.cwd + '/', '')
          .replace(set.cwd, '');
      });

      // using chokidar to watch files
      const watcher = __chokidar.watch(expandedGlobs, {
        ...set,
        ignored: [...set.ignored, ...(set.exclude ?? [])]
      });
      watcher
        .on('add', (path) => {
          if (filesStack[path]) return;

          if (
            !__matchGlob(path, input, {
              cwd: set.cwd
            })
          )
            return;

          // make sure it's not exists already
          if (!filesStack[path]) {
            if (set.SFile) filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
            else filesStack[path] = path;
          }
          emit('add', filesStack[path]);
          emit('file', filesStack[path]);
        })
        .on('change', (path) => {
          if (
            !__matchGlob(path, input, {
              cwd: set.cwd
            })
          )
            return;
          if (!filesStack[path]) {
            if (set.SFile) filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
            else filesStack[path] = path;
          }
          emit('update', filesStack[path]);
          emit('file', filesStack[path]);
        })
        .on('unlink', (path) => {
          if (
            !__matchGlob(path, input, {
              cwd: set.cwd
            })
          )
            return;
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
          filesPaths
            .filter((filePath) => {
              return __matchGlob(filePath, input, {
                cwd: set.cwd
              });
            })
            .forEach((filePath) => {
              if (set.SFile)
                finalFiles.push(__SFile.new(`${set.cwd}/${filePath}`));
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
        })

        // handle cancel
        .on('cancel', () => {
          watcher.close();
        });
    },
    {
      eventEmitter: {}
    }
  );
}

export default pool;
