import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob.js';
import __deepMerge from '../../shared/object/deepMerge.js';
import __matchGlobSync from '../glob/matchGlobSync.js';

/**
 * @name                pool
 * @namespace            node.fs
 * @type                Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function simply take as parameter a glob (or array of globs) pattern(s)
 * and return an SPromise instance through which you can subscribe to events like:
 * - ready: Emitted once the pool is ready
 * - add: Emitted when a file has been added
 * - change: Emitted when a file has been updated
 * - update: Alias of "change"
 * - unlink: Emitted when a file has been deleted
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
 * @setting             {Number}            [changeInterval=300]        Specify an interval to wait between two "change" event. If multiple change occured in this time frame, only 1 change will be emitted
 *
 * @event       ready       Emitted when the pool is ready
 * @event       add         Emitted when a new file has been added
 * @event       change      Emitted when a file has been changed
 * @event       update      Alias of the "change" event
 * @event       unlink      Emitted when a file has been deleted
 *
 * @snippet             __pool($1)
 * const pool = __pool($1).on('file', file => {
 *      $2
 * }).on('change', file => {
 *      $3
 * });
 * await pool.ready; // wait for pool to be ready
 * // pool.cancel();
 *
 * @example         js
 * import { __pool } from '@coffeekraken/sugar/fs';
 * const myPool = __pool('/something/cool/** /*', {
 *  watch: true
 * }):
 * __pool.on('file', file => {
 *      // do something with each files
 * })
 * __pool.on('change', (file) => {
 *      // do something with updated files
 * });
 * // when you want to stop your pool watching process
 * __pool.cancel();
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
    changeInterval: number;
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

export default function __pool(input, settings?: Partial<IPoolSettings>) {
    const filesStack: Record<string, string | __SFile> = {};

    let whenReadyResolve;

    const promise = new __SPromise(
        async ({ resolve, reject, emit, cancel, on }) => {
            // await __SSugarConfig.load();

            const set = <IPoolSettings>__deepMerge(
                {
                    SFile: true,
                    cwd: process.cwd(),
                    watch: false,
                    chokidar: {},
                    changeInterval: 300,
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

            // track the status of each files
            const statusStack = {};

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
                        else filesStack[path] = __path.resolve(set.cwd, path);
                    }

                    promise.files.push(filesStack[path]);
                    emit('add', filesStack[path]);
                })
                .on('change', (path) => {
                    if (statusStack[path] === 'change') {
                        return;
                    }
                    statusStack[path] = 'change';
                    setTimeout(() => {
                        delete statusStack[path];
                    }, set.changeInterval);

                    if (!__fs.existsSync(`${set.cwd}/${path}`)) return;
                    if (!filesStack[path]) {
                        if (set.SFile)
                            filesStack[path] = __SFile.new(
                                `${set.cwd}/${path}`,
                            );
                        else filesStack[path] = __path.resolve(set.cwd, path);
                    }
                    emit('change', filesStack[path]);
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

                    if (
                        filesStack[path] &&
                        promise.files.indexOf(filesStack[path]) !== -1
                    ) {
                        promise.files.splice(
                            promise.files.indexOf(filesStack[path]),
                            1,
                        );
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
                            return __matchGlobSync(filePath, input, {
                                cwd: set.cwd,
                            });
                        })
                        .forEach((filePath) => {
                            if (set.SFile)
                                finalFiles.push(
                                    __SFile.new(`${set.cwd}/${filePath}`),
                                );
                            else
                                finalFiles.push(
                                    __path.resolve(set.cwd, filePath),
                                );
                            emit('file', finalFiles[finalFiles.length - 1]);
                            // save file in file stack
                            filesStack[filePath] =
                                finalFiles[finalFiles.length - 1];
                        });

                    promise.files = finalFiles;
                    emit('ready', finalFiles);
                    whenReadyResolve(finalFiles);
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

    promise.files = [];

    // add an "initialFiles" promise to have access to them if wanted
    promise.ready = new Promise((resolve, reject) => {
        whenReadyResolve = resolve;
    });

    return promise;
}
