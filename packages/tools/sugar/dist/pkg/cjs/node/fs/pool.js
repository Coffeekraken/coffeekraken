"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const matchGlob_1 = __importDefault(require("../glob/matchGlob"));
function pool(input, settings) {
    const filesStack = {};
    return new s_promise_1.default(({ resolve, reject, emit, cancel, on }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield s_sugar_config_1.default.load();
        const set = (0, deepMerge_1.default)({
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
        const expandedGlobs = (0, expandGlob_1.default)(input).map((l) => {
            return l
                .split(':')[0]
                .replace(set.cwd + '/', '')
                .replace(set.cwd, '');
        });
        // using chokidar to watch files
        const watcher = chokidar_1.default.watch(expandedGlobs, Object.assign(Object.assign({}, set.chokidar), { ignored: [...set.ignored, ...((_a = set.exclude) !== null && _a !== void 0 ? _a : [])] }));
        watcher
            .on('add', (path) => {
            if (filesStack[path] ||
                !fs_1.default.existsSync(`${set.cwd}/${path}`))
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
                return (0, matchGlob_1.default)(filePath, input, {
                    cwd: set.cwd,
                });
            })
                .forEach((filePath) => {
                if (set.SFile)
                    finalFiles.push(s_file_1.default.new(`${set.cwd}/${filePath}`));
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
exports.default = pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsd0RBQWtDO0FBQ2xDLDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFDeEQsOEVBQXdEO0FBQ3hELGtFQUE0QztBQTJFNUMsU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQWlDO0lBQ2xELE1BQU0sVUFBVSxHQUFxQyxFQUFFLENBQUM7SUFFeEQsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7UUFDNUMsTUFBTSx3QkFBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFrQixJQUFBLG1CQUFXLEVBQ2xDO1lBQ0ksS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixLQUFLLEVBQUUsS0FBSztZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUM7U0FDcEQsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUFDO1FBRUYsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOztZQUNwQixPQUFPLE1BQUEsQ0FBQyxDQUFDLElBQUksbUNBQUksQ0FBQyxDQUFDO1FBQ3ZCLENB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