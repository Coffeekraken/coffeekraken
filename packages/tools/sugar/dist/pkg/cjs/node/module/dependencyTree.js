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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const md5_1 = __importDefault(require("../../shared/crypt/md5"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
const extractImport_1 = __importDefault(require("./extractImport"));
function __dependencyTree(filePath, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        // settings
        const set = (0, deepMerge_1.default)({
            deep: false,
            cache: false,
        }, settings || {});
        const logPath = path_1.default.relative((0, packageRootDir_1.default)(), filePath);
        // check filename existence
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`);
        }
        // integrity parts
        let packageJsonMtimeMs = -1, fileMtimeMs = fs_1.default.statSync(filePath).mtimeMs;
        // package.json mtimeMs
        const packageJsonPath = `${(0, packageRootDir_1.default)()}/package.json`;
        if (fs_1.default.existsSync(packageJsonPath)) {
            packageJsonMtimeMs = fs_1.default.statSync(packageJsonPath).mtimeMs;
        }
        // init cache
        // const cache = new __SCache('dependency-tree');
        // integrity
        const integrity = md5_1.default.encrypt({
            packageJsonMtimeMs,
            fileMtimeMs,
        });
        // check cache
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`,
            });
            // cache id
            // const cachedValue = await cache.get(filePath);
            let cachedValue;
            if (cachedValue) {
                // check integrity
                if (cachedValue.integrity === integrity) {
                    emit('log', {
                        group: `s-dependency-tree`,
                        value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`,
                    });
                    // return the actual valid value
                    return resolve(cachedValue.tree);
                }
            }
        }
        emit('log', {
            group: `s-dependency-tree`,
            value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`,
        });
        // actually dependency tree generation
        // const tree = __dependencyTree({
        //   ...set,
        //   filename: filePath,
        //   directory: __folderPath(filePath)
        // });
        // tree
        const tree = {};
        // create an SFile instance
        const file = s_file_1.default.new(filePath);
        const imports = (0, extractImport_1.default)(file.content);
        emit('log', {
            group: `s-dependency-tree`,
            value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`,
        });
        // caching tee if needed
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`,
            });
            yield cache.set(filePath, {
                tree,
                integrity,
            });
        }
        // returning the tree
        resolve(tree);
    }));
}
exports.default = __dependencyTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGlFQUEyQztBQUMzQyw4RUFBd0Q7QUFDeEQsNEVBQXNEO0FBQ3RELG9FQUE4QztBQTJDOUMsU0FBd0IsZ0JBQWdCLENBQ3BDLFFBQWdCLEVBQ2hCLFFBQW1EO0lBRW5ELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsV0FBVztRQUNYLE1BQU0sR0FBRyxHQUFvQyxJQUFBLG1CQUFXLEVBQ3BEO1lBQ0ksSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMsSUFBQSx3QkFBZ0IsR0FBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUNYLHdEQUF3RCxRQUFRLGlDQUFpQyxDQUNwRyxDQUFDO1NBQ0w7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFDdkIsV0FBVyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRWxELHVCQUF1QjtRQUN2QixNQUFNLGVBQWUsR0FBRyxHQUFHLElBQUEsd0JBQWdCLEdBQUUsZUFBZSxDQUFDO1FBQzdELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNsQyxrQkFBa0IsR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUMvRDtRQUVELGFBQWE7UUFDYixpREFBaUQ7UUFFakQsWUFBWTtRQUNaLE1BQU0sU0FBUyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUM7WUFDNUIsa0JBQWtCO1lBQ2xCLFdBQVc7U0FDZCxDQUFDLENBQUM7UUFFSCxjQUFjO1FBQ2QsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixLQUFLLEVBQUUsMkRBQTJELE9BQU8sYUFBYTthQUN6RixDQUFDLENBQUM7WUFFSCxXQUFXO1lBQ1gsaURBQWlEO1lBQ2pELElBQUksV0FBVyxDQUFDO1lBQ2hCLElBQUksV0FBVyxFQUFFO2dCQUNiLGtCQUFrQjtnQkFDbEIsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixLQUFLLEVBQUUsMERBQTBELE9BQU8sVUFBVTtxQkFDckYsQ0FBQyxDQUFDO29CQUVILGdDQUFnQztvQkFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixLQUFLLEVBQUUsMEVBQTBFLE9BQU8sYUFBYTtTQUN4RyxDQUFDLENBQUM7UUFFSCxzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLFlBQVk7UUFDWix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLE1BQU07UUFFTixPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDJCQUEyQjtRQUMzQixNQUFNLElBQUksR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBRyxJQUFBLHVCQUFlLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEtBQUssRUFBRSxvR0FBb0csT0FBTyxVQUFVO1NBQy9ILENBQUMsQ0FBQztRQUVILHdCQUF3QjtRQUN4QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLEtBQUssRUFBRSxvRUFBb0UsT0FBTyxhQUFhO2FBQ2xHLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLElBQUk7Z0JBQ0osU0FBUzthQUNaLENBQUMsQ0FBQztTQUNOO1FBRUQscUJBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNHRCxtQ0EyR0MifQ==