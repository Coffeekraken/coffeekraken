import __dependencyTree from 'dependency-tree';
import __chokidar from 'chokidar';
import __SPromise, { ISPromise } from '@coffeekraken/s-promise';
import __fs from 'fs';
import __folderPath from '../folderPath';
import __minimatch from 'minimatch';

/**
 * @name            dependencyList
 * @namespace       node.fs
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to specify a file from which to get all the dependencies
 * tree.
 * You can also specify that you want to watch these dependencies to be notified
 * when some are updated.
 *
 * @param       {String}        filePath        The file path from which you want the dependencies tree
 * @param       {IDependencyListSettings}       [settings={}]       Some settings to configure your process
 * @return      {SPromise}                          An SPromise instance that will be resolved once the list has been getted and through which you can subscribe to some events if you want to watch these dependencies
 *
 * @example         js
 * import dependencyList from '@coffeekraken/sugar/node/fs/dependencyList';
 * await dependencyList('/my/cool/file.js');
 * const promise = dependencyList('/my/cool/file.js', {
 *      watch: true
 * });
 * promise.on('update', ({ path, list }) => {
 *      // do something when a dependency has been updated
 * });
 *
 * @see             https://www.npmjs.com/package/dependency-tree
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IDependencyListSettings {
    watch: boolean;
    exclude: string[];
    includeItself: boolean;
    ignoreInitial: boolean;
}
export interface IDependencyListResult {
    list: string[];
    path?: string;
}

export default function dependencyList(
    filePath: string,
    settings?: Partial<IDependencyListSettings>,
): any {
    return new __SPromise(({ resolve, reject, emit }) => {
        const set: IDependencyListSettings = {
            watch: false,
            includeItself: false,
            ignoreInitial: false,
            exclude: [],
            ...settings,
        };

        function getList() {
            // rebuild the list
            const list = __dependencyTree
                .toList({
                    filename: filePath,
                    directory: __folderPath(filePath),
                    filter: (path) => {
                        path = __fs.realpathSync(path);
                        for (let i = 0; i < set.exclude.length; i++) {
                            if (__minimatch(path, set.exclude[i])) return false;
                        }
                        return true;
                    },
                })
                .map((p) => __fs.realpathSync(p))
                .filter((path) => {
                    if (path === filePath && !set.includeItself) return false;
                    return true;
                });
            return list;
        }

        if (set.watch) {
            let depWatcher;

            // watch the file itself
            const watcher = __chokidar.watch(filePath, {}).on('change', () => {
                const list = getList();
                if (depWatcher) depWatcher.close();
                depWatcher = __chokidar.watch(list, {}).on('change', (path) => {
                    emit('update', {
                        path,
                        list,
                    });
                });
                emit('update', {
                    path: filePath,
                    list: getList(),
                });
            });

            if (!set.ignoreInitial) {
                emit('update', {
                    path: filePath,
                    list: getList(),
                });
            }
        } else {
            resolve({
                path: filePath,
                list: getList(),
            });
        }
    });
}
