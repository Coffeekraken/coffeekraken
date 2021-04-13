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
function pool(input, settings) {
    const filesStack = {};
    return new s_promise_1.default(({ resolve, reject, emit, cancel, on }) => {
        const set = deepMerge_1.default({
            SFile: true,
            updateTimeout: 500,
            cwd: process.cwd(),
            watch: false,
            ignored: ['**/node_modules/**/*', '**/.git/**/*'],
            ignoreInitial: true
        }, settings || {});
        if (!Array.isArray(input))
            input = [input];
        input = input.map((i) => {
            var _a;
            return (_a = i.path) !== null && _a !== void 0 ? _a : i;
        });
        input = replacePathTokens_1.default(input);
        // expand glob
        const expandedGlobs = expandGlob_1.default(input);
        // using chokidar to watch files
        const watcher = chokidar_1.default.watch(expandedGlobs, Object.assign({}, set));
        watcher
            .on('add', (path) => {
            if (filesStack[path])
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
            if (!filesStack[path]) {
                if (set.SFile)
                    filesStack[path] = s_file_1.default.new(path);
                else
                    filesStack[path] = path;
            }
            emit('update', filesStack[path]);
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
            filesPaths.forEach((filePath) => {
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
        });
        // handle cancel
        on('cancel', () => {
            watcher.close();
        });
    }, {
        eventEmitter: {}
    });
}
exports.default = pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLDhFQUF3RDtBQUN4RCxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUE0RDtBQXdDNUQsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQWlDO0lBQ3BELE1BQU0sVUFBVSxHQUFxQyxFQUFFLENBQUM7SUFFeEQsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN4QyxNQUFNLEdBQUcsR0FBa0IsbUJBQVcsQ0FDcEM7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLGFBQWEsRUFBRSxHQUFHO1lBQ2xCLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDO1lBQ2pELGFBQWEsRUFBRSxJQUFJO1NBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDdEIsT0FBTyxNQUFBLENBQUMsQ0FBQyxJQUFJLG1DQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssR0FBRywyQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxjQUFjO1FBQ2QsTUFBTSxhQUFhLEdBQWEsb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRCxnQ0FBZ0M7UUFDaEMsTUFBTSxP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