"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const chokidar_1 = __importDefault(require("chokidar"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
const matchGlob_1 = __importDefault(require("../glob/matchGlob"));
const fs_1 = __importDefault(require("fs"));
function pool(input, settings) {
    const filesStack = {};
    return new s_promise_1.default(({ resolve, reject, emit, cancel, on }) => {
        var _a;
        const set = deepMerge_1.default({
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
        }, settings || {});
        if (!Array.isArray(input))
            input = [input];
        input = input.map((i) => {
            var _a;
            return (_a = i.path) !== null && _a !== void 0 ? _a : i;
        });
        input = replacePathTokens_1.default(input);
        // expand glob
        const expandedGlobs = expandGlob_1.default(input).map((l) => {
            return l
                .split(':')[0]
                .replace(set.cwd + '/', '')
                .replace(set.cwd, '');
        });
        // using chokidar to watch files
        const watcher = chokidar_1.default.watch(expandedGlobs, Object.assign(Object.assign({}, set), { 
            // persistent: true,
            // interval: 1,
            // binaryInterval: 1,
            // awaitWriteFinish: true,
            // usePolling: true,
            ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        watcher
            .on('add', (path) => {
            // if (event !== 'created') return;
            // console.log(path);
            if (filesStack[path] || !fs_1.default.existsSync(`${set.cwd}/${path}`))
                return;
            // if (
            //   !__matchGlob(path, input, {
            //     cwd: set.cwd
            //   })
            // )
            //   return;
            // console.log(path);
            // iii++;
            // console.log(iii);
            // make sure it's not exists already
            if (!filesStack[path]) {
                // console.log('NEW', path);
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
            }
            emit('add', filesStack[path]);
            emit('file', filesStack[path]);
            // iii++;
            // console.log('RAW', event, iii);
        })
            .on('change', (path) => {
            if (!fs_1.default.existsSync(`${set.cwd}/${path}`))
                return;
            // if (
            //   !__matchGlob(path, input, {
            //     cwd: set.cwd
            //   })
            // )
            //   return;
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
            }
            emit('update', filesStack[path]);
            emit('file', filesStack[path]);
        })
            .on('unlink', (path) => {
            // if (
            //   !__matchGlob(path, input, {
            //     cwd: set.cwd
            //   })
            // )
            //   return;
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
            // .on('raw', (event, path, details) => {
            //   // console.log('EEE', event, path);
            //   if (event !== 'created') return;
            // })
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
                return matchGlob_1.default(filePath, input, {
                    cwd: set.cwd
                });
            })
                .forEach((filePath) => {
                if (set.SFile)
                    finalFiles.push(s_file_1.default.new(`${set.cwd}/${filePath}`));
                else
                    finalFiles.push(filePath);
                emit('file', finalFiles[finalFiles.length - 1]);
                // save file in file stack
                filesStack[filePath] = finalFiles[finalFiles.length - 1];
            });
            emit('ready', finalFiles);
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
    }, {
        eventEmitter: {}
    });
}
exports.default = pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLDhFQUF3RDtBQUN4RCxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCxrRUFBNEM7QUFHNUMsNENBQXNCO0FBMEN0QixTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBaUM7SUFDcEQsTUFBTSxVQUFVLEdBQXFDLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztRQUN4QyxNQUFNLEdBQUcsR0FBa0IsbUJBQVcsQ0FDcEM7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUM7WUFDakQsYUFBYSxFQUFFLElBQUk7WUFDbkIsb0JBQW9CO1lBQ3BCLHFCQUFxQjtZQUNyQixtQkFBbUI7U0FDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOztZQUN0QixhQUFPLENBQUMsQ0FBQyxJQUFJLG1DQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssR0FBRywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztR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