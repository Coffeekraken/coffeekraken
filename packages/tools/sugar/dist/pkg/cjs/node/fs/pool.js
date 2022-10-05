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
const glob_1 = require("@coffeekraken/sugar/glob");
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __pool(input, settings) {
    const filesStack = {};
    let whenReadyResolve;
    const promise = new s_promise_1.default(({ resolve, reject, emit, cancel, on }) => __awaiter(this, void 0, void 0, function* () {
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
                return (0, glob_1.__matchGlob)(filePath, input, {
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
    // add an "initialFiles" promise to have access to them if wanted
    promise.ready = new Promise((resolve, reject) => {
        whenReadyResolve = resolve;
    });
    return promise;
}
exports.default = __pool;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsbURBQXVEO0FBQ3ZELHdEQUFrQztBQUNsQyw0Q0FBc0I7QUFDdEIsOEVBQXdEO0FBQ3hELDhFQUF3RDtBQXVFeEQsU0FBd0IsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFpQztJQUNuRSxNQUFNLFVBQVUsR0FBcUMsRUFBRSxDQUFDO0lBRXhELElBQUksZ0JBQWdCLENBQUM7SUFFckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUMxQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1FBQzVDLE1BQU0sd0JBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUU1QixNQUFNLEdBQUcsR0FBa0IsSUFBQSxtQkFBVyxFQUNsQztZQUNJLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsY0FBYyxDQUFDO1NBQ3BELEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFFM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7WUFDcEIsT0FBTyxNQUFBLENBQUMsQ0FBQyxJQUFJLG1DQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxNQUFNLGFBQWEsR0FBYSxJQUFBLG9CQUFZLEVBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDMUQsT0FBTyxDQUFDO2lCQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQztpQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxrQ0FDdkMsR0FBRyxDQUFDLFFBQVEsS0FDZixPQUFPLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQUEsR0FBRyxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsSUFDbkQsQ0FBQztRQUVILE9BQU87YUFDRixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEIsSUFDSSxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUV0QyxPQUFPO1lBQ1gsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxDQUFDLEtBQUs7b0JBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUMxQixHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQ3ZCLENBQUM7O29CQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQUUsT0FBTztZQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQixJQUFJLEdBQUcsQ0FBQyxLQUFLO29CQUNULFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FDMUIsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUN2QixDQUFDOztvQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkIsYUFBYTtZQUNiLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQzNDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekM7aUJBQU0sSUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNoQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQ3RDO2dCQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVuQyxNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUM7WUFDaEMsTUFBTSxVQUFVLEdBQXlCLEVBQUUsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILFVBQVU7aUJBQ0wsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBQSxrQkFBVyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7b0JBQ2hDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztpQkFDZixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7aUJBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksR0FBRyxDQUFDLEtBQUs7b0JBQ1QsVUFBVSxDQUFDLElBQUksQ0FDWCxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMsQ0FDeEMsQ0FBQzs7b0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCwwQkFBMEI7Z0JBQzFCLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQ2hCLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBRVAsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxQixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQztZQUVGLGdCQUFnQjthQUNmLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFBLEVBQ0Q7UUFDSSxZQUFZLEVBQUUsRUFBRTtLQUNuQixDQUNKLENBQUM7SUFFRixpRUFBaUU7SUFDakUsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM1QyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBdklELHlCQXVJQyJ9