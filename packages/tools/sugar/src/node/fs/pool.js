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
            ignoreInitial: true,
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
        input = replacePathTokens_1.default(input);
        // expand glob
        const expandedGlobs = expandGlob_1.default(input).map((l) => {
            return l
                .split(':')[0]
                .replace(set.cwd + '/', '')
                .replace(set.cwd, '');
        });
        // using chokidar to watch files
        const watcher = chokidar_1.default.watch(expandedGlobs, Object.assign(Object.assign({}, set), { ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        watcher
            .on('add', (path) => {
            if (filesStack[path] || !fs_1.default.existsSync(`${set.cwd}/${path}`))
                return;
            // make sure it's not exists already
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(`${set.cwd}/${path}`);
                else
                    filesStack[path] = path;
            }
            emit('add', filesStack[path]);
            emit('file', filesStack[path]);
        })
            .on('change', (path) => {
            if (!fs_1.default.existsSync(`${set.cwd}/${path}`))
                return;
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
            if (finalFiles.length) {
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
exports.default = pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLDhFQUF3RDtBQUN4RCxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCxrRUFBNEM7QUFHNUMsNENBQXNCO0FBMkN0QixTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBaUM7SUFDcEQsTUFBTSxVQUFVLEdBQXFDLEVBQUUsQ0FBQztJQUV4RCxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztRQUN4QyxNQUFNLEdBQUcsR0FBa0IsbUJBQVcsQ0FDcEM7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUM7WUFDakQsYUFBYSxFQUFFLElBQUk7WUFDbkIsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLG1CQUFtQjtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3RCLE9BQU8sTUFBQSxDQUFDLENBQUMsSUFBSSxtQ0FBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLEdBQUcs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