var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
// import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __expandGlob from '../../shared/glob/expandGlob.js';
import __deepMerge from '../../shared/object/deepMerge.js';
import __matchGlobSync from '../glob/matchGlobSync.js';
export default function __pool(input, settings) {
    const filesStack = {};
    let whenReadyResolve;
    const promise = new __SPromise(({ resolve, reject, emit, cancel, on }) => __awaiter(this, void 0, void 0, function* () {
        // await __SSugarConfig.load();
        var _a;
        const set = __deepMerge({
            SFile: true,
            cwd: process.cwd(),
            watch: false,
            chokidar: {},
            changeInterval: 300,
            exclude: [],
            ignored: ['**/node_modules/**/*', '**/.git/**/*'],
        }, settings || {});
        set.chokidar.cwd = set.cwd;
        if (!Array.isArray(input))
            input = [input];
        input = input.map((i) => {
            var _a;
            return (_a = i.path) !== null && _a !== void 0 ? _a : i;
        });
        // expand glob
        const expandedGlobs = __expandGlob(input).map((l) => {
            return l
                .split(':')[0]
                .replace(set.cwd + '/', '')
                .replace(set.cwd, '');
        });
        // using chokidar to watch files
        const watcher = __chokidar.watch(expandedGlobs, Object.assign(Object.assign({}, set.chokidar), { ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        // track the status of each files
        const statusStack = {};
        watcher
            .on('add', (path) => {
            if (filesStack[path] ||
                !__fs.existsSync(`${set.cwd}/${path}`))
                return;
            // make sure it's not exists already
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = __path.resolve(set.cwd, path);
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
            if (!__fs.existsSync(`${set.cwd}/${path}`))
                return;
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = __path.resolve(set.cwd, path);
            }
            emit('change', filesStack[path]);
        })
            .on('unlink', (path) => {
            // @ts-ignore
            if (filesStack[path] && filesStack[path].path) {
                // @ts-ignore
                emit('unlink', filesStack[path].path);
            }
            else if (filesStack[path] &&
                typeof filesStack[path] === 'string') {
                emit('unlink', filesStack[path]);
            }
            if (filesStack[path] &&
                promise.files.indexOf(filesStack[path]) !== -1) {
                promise.files.splice(promise.files.indexOf(filesStack[path]), 1);
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
                return __matchGlobSync(filePath, input, {
                    cwd: set.cwd,
                });
            })
                .forEach((filePath) => {
                if (set.SFile)
                    finalFiles.push(__SFile.new(`${set.cwd}/${filePath}`));
                else
                    finalFiles.push(__path.resolve(set.cwd, filePath));
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
    }), {
        eventEmitter: {},
    });
    promise.files = [];
    // add an "initialFiles" promise to have access to them if wanted
    promise.ready = new Promise((resolve, reject) => {
        whenReadyResolve = resolve;
    });
    return promise;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELDZEQUE2RDtBQUM3RCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFlBQVksTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLGVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQXlGdkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQWlDO0lBQ25FLE1BQU0sVUFBVSxHQUFxQyxFQUFFLENBQUM7SUFFeEQsSUFBSSxnQkFBZ0IsQ0FBQztJQUVyQixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDMUIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzVDLCtCQUErQjs7UUFFL0IsTUFBTSxHQUFHLEdBQWtCLFdBQVcsQ0FDbEM7WUFDSSxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixjQUFjLEVBQUUsR0FBRztZQUNuQixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQztTQUNwRCxFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FB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