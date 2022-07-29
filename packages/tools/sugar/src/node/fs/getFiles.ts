// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __chokidar from 'chokidar';
import __onProcessExit from '../process/onProcessExit';

/**
 * @name        getFiles
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          stable
 *
 * This function wrap the AMAZING chokidar to make use of it even simplier with some default values and support for
 * things like multiple globs, etc...
 *
 * @param       {String|String[]}       paths       The path(s)/glob(s) you want to get files from
 * @param       {Partial<IGetFilesSettings>}        Some settings to configure your file search/watch process
 * @return      {SPromise}                           A promise that will be resolved when the getFiles is completed, or that will diaptch some events to let you know of new files, etc...
 *
 * @example       js
 * import getFiles from '@coffeekraken/node/fs/getFiles';
 * await getFiles('** /*.txt');
 * const watcher = getFiles('** /*.txt', {
 *  watch: true
 * });
 * watcher.on('add', (file) => {
 *  // do something with your file
 * });
 *
 * @see             https://github.com/paulmillr/chokidar
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IGetFilesSettings {
    cwd: string;
    watch: boolean;
    sFile: boolean;
    ignoreInitial: boolean;
    exclude: string[];
}

export interface IGetFilesResult {
    cwd: string;
    sFile: boolean;
    exclude: string[];
    files: (string | __SFile)[];
}

export default function getFiles(
    paths: string | string[],
    settings?: Partial<IGetFilesSettings>,
) {
    return new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings: IGetFilesSettings = {
            cwd: process.cwd(),
            watch: false,
            ignoreInitial: false,
            sFile: false,
            exclude: __SSugarConfig.get('storage.exclude'),
            ...(settings ?? {}),
        };

        let foundFiles: string[] = [],
            watchersReady: any[] = [],
            buildPromises: Promise<any>[] = [];

        // function used only when the finalSettings.watch is false
        // and keeping track on the watchers ready state.
        // when all the watchers are in ready state, this mean that the
        // buildPromises array is full of build promises and we can resolve
        // this process when they are all resolved
        function onWatcherReady(watcher: any) {
            watchersReady.push(watcher);
            if (watchersReady.length === globs.length) {
                // when all promises are resolved, resolve the promise
                Promise.all(buildPromises).then(() => {
                    resolve(<ISTypescriptBuilderResult>{
                        cwd: finalSettings.cwd,
                        sFile: finalSettings.sFile,
                        exclude: finalSettings.exclude,
                        files: foundFiles.map((filePath) => {
                            return finalSettings.sFile
                                ? __SFile.new(filePath)
                                : filePath;
                        }),
                    });
                });
            }
        }

        const globs = Array.isArray(paths) ? paths : [paths];

        // loop on each glob(s) and build the files
        globs.forEach((glob) => {
            // listen for file update and add
            const watcher = __chokidar.watch(glob, {
                cwd: finalSettings.cwd,
                ignored: finalSettings.exclude,
                ignoreInitial:
                    finalSettings.watch && finalSettings.ignoreInitial,
            });

            // make sure we close the watching process
            __onProcessExit(() => {
                return watcher.close();
            });

            // keep track on the watchers ready state
            // to know when we can watch for all the buildPromises
            // state and resolve the process at them end...
            if (!finalSettings.watch) {
                watcher.on('ready', () => {
                    onWatcherReady(watcher);
                });
            }

            ['add', 'change', 'unlink'].forEach((listener) => {
                watcher.on(listener, async (relPath) => {
                    const filePath = `${finalSettings.cwd}/${relPath}`;

                    let file = filePath;
                    if (finalSettings.sFile) {
                        file = __SFile.new(filePath);
                    }

                    // emit an event
                    emit(listener, file);

                    if (listener === 'add' && !foundFiles.includes(file)) {
                        foundFiles.push(file);
                    }
                });
            });
        });
    });
}
