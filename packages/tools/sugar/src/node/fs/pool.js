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
            return l.split(':')[0];
        });
        // using chokidar to watch files
        const watcher = chokidar_1.default.watch(expandedGlobs, Object.assign(Object.assign({}, set), { ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        watcher
            .on('add', (path) => {
            if (filesStack[path])
                return;
            if (!matchGlob_1.default(path, input))
                return;
            // make sure it's not exists already
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(path);
                else
                    filesStack[path] = path;
            }
            emit('add', filesStack[path]);
        })
            .on('change', (path) => {
            if (!matchGlob_1.default(path, input))
                return;
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(path);
                else
                    filesStack[path] = path;
            }
            emit('update', filesStack[path]);
        })
            .on('unlink', (path) => {
            if (!matchGlob_1.default(path, input))
                return;
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
                return matchGlob_1.default(filePath, input);
            })
                .forEach((filePath) => {
                if (set.SFile)
                    finalFiles.push(s_file_1.default.new(filePath));
                else
                    finalFiles.push(filePath);
                emit('file', finalFiles[finalFiles.length - 1]);
                // save file in file stack
                filesStack[filePath] = finalFiles[finalFiles.length - 1];
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLDhFQUF3RDtBQUN4RCxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCxrRUFBNEM7QUEwQzVDLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFpQztJQUNwRCxNQUFNLFVBQVUsR0FBcUMsRUFBRSxDQUFDO0lBRXhELE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1FBQ3hDLE1BQU0sR0FBRyxHQUFrQixtQkFBVyxDQUNwQztZQUNFLEtBQUssRUFBRSxJQUFJO1lBQ1gsYUFBYSxFQUFFLEdBQUc7WUFDbEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQztZQUNqRCxhQUFhLEVBQUUsSUFBSTtZQUNuQixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLG1CQUFtQjtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3RCLE9BQU8sTUFBQSxDQUFDLENBQUMsSUFBSSxtQ0FBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLEdBQUcsMkJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkMsY0FB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