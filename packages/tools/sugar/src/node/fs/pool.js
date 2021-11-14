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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SPromise from '@coffeekraken/s-promise';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __expandGlob from '../../shared/glob/expandGlob';
import __deepMerge from '../../shared/object/deepMerge';
import __matchGlob from '../glob/matchGlob';
function pool(input, settings) {
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
export default pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLFlBQVksTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLFdBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQTJFNUMsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQWlDO0lBQ2xELE1BQU0sVUFBVSxHQUFxQyxFQUFFLENBQUM7SUFFeEQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztRQUM1QyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLEdBQUcsR0FBa0IsV0FBVyxDQUNsQztZQUNJLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDO1NBQ3BELEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFFM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FB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