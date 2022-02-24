import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SPromise from '@coffeekraken/s-promise';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __require from '../esm/require';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import __matchGlob from '../glob/matchGlob';

/**
 * @name                pool
 * @namespace            node.fs
 * @type                Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function simply take as parameter a glob (or array of globs) pattern(s)
 * and return an SPromise instance through which you can subscribe to events like:
 * - ready: Emitted once the pool is ready
 * - file: Emitted for each file founded, added or updated
 * - files: Emitted with a list of founded files
 * - change: Emitted when a file has been updated (alias to update)
 * - update: Emitted when a file has been updated
 * - unlink: Emitted when a file has been deleted
 * - add: Emitted when a file has been added
 *
 *
 * @param       {String|Array<String>}          input           The input glob(s)
 * @param       {IPoolSettings}             [settings={}]       Some settings to configure your pool. Support all the chokidar settings
 * @return      {SPromise}                                      An SPromise instance through which you can subscribe to events and cancel the pool
 *
 * @setting             {Boolean}       [SFile=true]        Specify if you want to get back SFile instances or just string path
 * @setting             {String}        [cwd=process.cwd()]     Specify the cwd
 * @setting             {String[]}      [exclude=[]]            Specify some file(s), path(s) to exclude
 * @setting             {Boolean}       [watch=false]           Specify if you want to watch files or not
 * @setting             {IChokidarSettings}     [chokidar={}]       Specify some settings to pass to chokidar in order to watch files
 *
 * @example         js
 * import pool from '@coffeekraken/sugar/node/fs/pool';
 * const myPool = pool('/something/cool/** /*', {
 *  watch: true
 * }):
 * pool.on('file', file => {
 *      // do something with each files
 * })
 * pool.on('update', (file) => {
 *      // do something with updated files
 * });
 * // when you want to stop your pool watching process
 * pool.cancel();
 *
 * @see             https://www.npmjs.com/package/chokidar
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IPoolSettings {
    SFile: boolean;
    cwd: string;
    exclude: string[];
    watch: boolean;
    chokidar: Partial<IChokidarSettings>;
    [key: string]: any;
}

export interface IChokidarSettings {
    persistent: boolean;
    ignored: string;
    ignoreInitial: boolean;
    followSymlinks: boolean;
    cwd: string;
    disableGlobbing: boolean;
    usePolling: boolean;
    interval: number;
    binaryInterval: number;
    alwaysStat: boolean;
    depth: number;
    awaitWriteFinish: any;
    ignorePermissionErrors: boolean;
    atomic: boolean;
}

function pool(input, settings?: Partial<IPoolSettings>) {
    const filesStack: Record<string, string | __SFile> = {};

    return new __SPromise(
        async ({ resolve, reject, emit, cancel, on }) => {
            await __SSugarConfig.load();

            const set = <IPoolSettings>__deepMerge(
                {
                    SFile: true,
                    cwd: process.cwd(),
                    watch: false,
                    chokidar: {},
                    exclude: [],
                    ignored: ['**/node_modules/**/*', '**/.git/**/*'],
                },
                settings || {},
            );

            set.chokidar.cwd = set.cwd;

            if (!Array.isArray(input)) input = [input];
            input = input.map((i) => {
                return i.path ?? i;
            });

            // expand glob
            const expandedGlobs: string[] = __expandGlob(input).map((l) => {
                return l
                    .split(':')[0]
                    .replace(set.cwd + '/', '')
                    .replace(set.cwd, '');
            });

            // using chokidar to watch files
            const watcher = __chokidar.watch(expandedGlobs, {
                ...set.chokidar,
                ignored: [...set.ignored, ...(set.exclude ?? [])],
            });

            watcher
                .on('add', (path) => {
                    if (
                        filesStack[path] ||
                        !__fs.existsSync(`${set.cwd}/${path}`)
                    )
                        return;
                    // make sure it's not exists already
                    if (!filesStack[path]) {
                        if (set.SFile)
                            filesStack[path] = __SFile.new(
                                `${set.cwd}/${path}`,
                            );
                        else filesStack[path] = path;
                    }
                    emit('add', filesStack[path]);
                    emit('file', filesStack[path]);
                })
                .on('change', (path) => {
                    if (!__fs.existsSync(`${set.cwd}/${path}`)) return;
                    if (!filesStack[path]) {
                        if (set.SFile)
                            filesStack[path] = __SFile.new(
                                `${set.cwd}/${path}`,
                            );
                        else filesStack[path] = path;
                    }
                    emit('update', filesStack[path]);
                    emit('change', filesStack[path]);
                    emit('file', filesStack[path]);
                })
                .on('unlink', (path) => {
                    // @ts-ignore
                    if (filesStack[path] && filesStack[path].path) {
                        // @ts-ignore
                        emit('unlink', filesStack[path].path);
                    } else if (
                        filesStack[path] &&
                        typeof filesStack[path] === 'string'
                    ) {
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
                                cwd: set.cwd,
                            });
                        })
                        .forEach((filePath) => {
                            if (set.SFile)
                                finalFiles.push(
                                    __SFile.new(`${set.cwd}/${filePath}`),
                                );
                            else finalFiles.push(filePath);
                            emit('file', finalFiles[finalFiles.length - 1]);
                            // save file in file stack
                            filesStack[filePath] =
                                finalFiles[finalFiles.length - 1];
                        });

                    emit('ready', finalFiles);
                    if (finalFiles.length && !set.ignoreInitial) {
                        emit('files', finalFiles);
                    }
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
            eventEmitter: {},
        },
    );
}

export default pool;
