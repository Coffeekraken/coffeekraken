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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import { __matchGlob } from '@coffeekraken/sugar/glob';
export default function __pool(input, settings) {
    const filesStack = {};
    return new __SPromise(({ resolve, reject, emit, cancel, on }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield __SSugarConfig.load();
        const set = __deepMerge({
            SFile: true,
            cwd: process.cwd(),
            watch: false,
            chokidar: {},
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
                    filesStack[path] = path;
            }
            emit('add', filesStack[path]);
            emit('file', filesStack[path]);
        })
            .on('change', (path) => {
            if (!__fs.existsSync(`${set.cwd}/${path}`))
                return;
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
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
            }
            else if (filesStack[path] &&
                typeof filesStack[path] === 'string') {
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
                    cwd: set.cwd,
                });
            })
                .forEach((filePath) => {
                if (set.SFile)
                    finalFiles.push(__SFile.new(`${set.cwd}/${filePath}`));
                else
                    finalFiles.push(filePath);
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
    }), {
        eventEmitter: {},
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBMkV2RCxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBaUM7SUFDbkUsTUFBTSxVQUFVLEdBQXFDLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1FBQzVDLE1BQU0sY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFrQixXQUFXLENBQ2xDO1lBQ0ksS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixLQUFLLEVBQUUsS0FBSztZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUM7U0FDcEQsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUFDO1FBRUYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxDQUFD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