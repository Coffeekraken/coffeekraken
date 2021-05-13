import __deepMerge from '../../shared/object/deepMerge';
import __chokidar from 'chokidar';
import __expandGlob from '../../shared/glob/expandGlob';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __replacePathTokens from '../path/replacePathTokens';
import __matchGlob from '../glob/matchGlob';
import __fs from 'fs';
function pool(input, settings) {
    const filesStack = {};
    return new __SPromise(({ resolve, reject, emit, cancel, on }) => {
        var _a;
        const set = __deepMerge({
            SFile: true,
            updateTimeout: 500,
            cwd: process.cwd(),
            watch: false,
            exclude: [],
            ignored: ['**/node_modules/**/*', '**/.git/**/*'],
            ignoreInitial: false,
            watchDependencies: true
            // usePolling: true,
            // useFsEvents: true,
            // persistent: true
        }, settings || {});
        if (!Array.isArray(input))
            input = [input];
        input = input.map((i) => {
            var _a;
            return (_a = i.path) !== null && _a !== void 0 ? _a : i;
        });
        input = __replacePathTokens(input);
        // expand glob
        const expandedGlobs = __expandGlob(input).map((l) => {
            return l
                .split(':')[0]
                .replace(set.cwd + '/', '')
                .replace(set.cwd, '');
        });
        // using chokidar to watch files
        const watcher = __chokidar.watch(expandedGlobs, Object.assign(Object.assign({}, set), { ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        watcher
            .on('add', (path) => {
            if (filesStack[path] || !__fs.existsSync(`${set.cwd}/${path}`))
                return;
            // make sure it's not exists already
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
            }
            emit('add', filesStack[path]);
            emit('file', filesStack[path]);
        })
            .on('change', (path) => {
            console.log('change', path);
            if (!__fs.existsSync(`${set.cwd}/${path}`))
                return;
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
            }
            emit('update', filesStack[path]);
            emit('file', filesStack[path]);
        })
            .on('unlink', (path) => {
            // @ts-ignore
            if (filesStack[path] && filesStack[path].path) {
                // @ts-ignore
                emit('unlink', filesStack[path].path);
            }
            else if (filesStack[path] && typeof filesStack[path] === 'string') {
                emit('unlink', filesStack[path]);
            }
            delete filesStack[path];
        })
            .on('ready', () => {
            const files = watcher.getWatched();
            const filesPaths = [];
            const finalFiles = [];
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
                else
                    finalFiles.push(filePath);
                emit('file', finalFiles[finalFiles.length - 1]);
                // save file in file stack
                filesStack[filePath] = finalFiles[finalFiles.length - 1];
            });
            // filesPaths.forEach(async (filePath) => {
            //   // watch dependencies
            //   if (set.watchDependencies) {
            //     console.log('watch ', filePath);
            //     const depListPromise = __dependencyList(filePath, {
            //       watch: true,
            //       exclude: ['**/node_modules/**']
            //     });
            //     depListPromise.on('update', ({ path, list }) => {
            //       console.log('UP', path, list);
            //     });
            //     // console.log(await depListPromise);
            //   }
            // });
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
    }, {
        eventEmitter: {}
    });
}
export default pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sWUFBWSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sbUJBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFHNUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBMkN0QixTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBaUM7SUFDcEQsTUFBTSxVQUFVLEdBQXFDLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksVUFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1FBQ3hDLE1BQU0sR0FBRyxHQUFrQixXQUFXLENBQ3BDO1lBQ0UsS0FBSyxFQUFFLElBQUk7WUFDWCxhQUFhLEVBQUUsR0FBRztZQUNsQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDO1lBQ2pELGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixtQkFBbUI7U0FDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFL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