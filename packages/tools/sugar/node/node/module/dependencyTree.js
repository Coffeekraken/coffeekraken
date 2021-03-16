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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const md5_1 = __importDefault(require("../crypt/md5"));
const path_1 = __importDefault(require("path"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const extractImport_1 = __importDefault(require("./extractImport"));
function dependencyTree(filePath, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        // settings
        const set = deepMerge_1.default({
            deep: false,
            cache: false
        }, settings || {});
        const logPath = path_1.default.relative(packageRoot_1.default(), filePath);
        // check filename existence
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`);
        }
        // integrity parts
        let packageJsonMtimeMs = -1, fileMtimeMs = fs_1.default.statSync(filePath).mtimeMs;
        // package.json mtimeMs
        const packageJsonPath = `${packageRoot_1.default()}/package.json`;
        if (fs_1.default.existsSync(packageJsonPath)) {
            packageJsonMtimeMs = fs_1.default.statSync(packageJsonPath).mtimeMs;
        }
        // init cache
        const cache = new s_cache_1.default('dependency-tree');
        // integrity
        const integrity = md5_1.default.encrypt({
            packageJsonMtimeMs,
            fileMtimeMs
        });
        // check cache
        if (set.cache) {
            emit('log', {
                value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
            });
            // cache id
            const cachedValue = yield cache.get(filePath);
            if (cachedValue) {
                // check integrity
                if (cachedValue.integrity === integrity) {
                    emit('log', {
                        value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
                    });
                    // return the actual valid value
                    return resolve(cachedValue.tree);
                }
            }
        }
        emit('log', {
            value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`
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
        const file = SFile_1.default.instanciate(filePath);
        const imports = extractImport_1.default(file.content);
        emit('log', {
            value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
        });
        // caching tee if needed
        if (set.cache) {
            emit('log', {
                value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`
            });
            yield cache.set(filePath, {
                tree,
                integrity
            });
        }
        // returning the tree
        resolve(tree);
    }));
}
exports.default = dependencyTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9tb2R1bGUvZGVwZW5kZW5jeVRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3RUFBaUQ7QUFDakQsb0VBQTZDO0FBRTdDLG9FQUE4QztBQUM5Qyw0Q0FBc0I7QUFDdEIsc0VBQWdEO0FBQ2hELHVEQUFpQztBQUVqQyxnREFBMEI7QUFDMUIsd0RBQWtDO0FBQ2xDLG9FQUE4QztBQXlDOUMsU0FBd0IsY0FBYyxDQUNwQyxRQUFnQixFQUNoQixRQUFtRDtJQUVuRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3hELFdBQVc7UUFDWCxNQUFNLEdBQUcsR0FBb0MsbUJBQVcsQ0FDdEQ7WUFDRSxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1NBQ2IsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxjQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFhLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUzRCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYix3REFBd0QsUUFBUSxpQ0FBaUMsQ0FDbEcsQ0FBQztTQUNIO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQ3pCLFdBQVcsR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVoRCx1QkFBdUI7UUFDdkIsTUFBTSxlQUFlLEdBQUcsR0FBRyxxQkFBYSxFQUFFLGVBQWUsQ0FBQztRQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDcEMsa0JBQWtCLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDN0Q7UUFFRCxhQUFhO1FBQ2IsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFOUMsWUFBWTtRQUNaLE1BQU0sU0FBUyxHQUFHLGFBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsa0JBQWtCO1lBQ2xCLFdBQVc7U0FDWixDQUFDLENBQUM7UUFFSCxjQUFjO1FBQ2QsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsMkRBQTJELE9BQU8sYUFBYTthQUN2RixDQUFDLENBQUM7WUFFSCxXQUFXO1lBQ1gsTUFBTSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLElBQUksV0FBVyxFQUFFO2dCQUNmLGtCQUFrQjtnQkFDbEIsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixLQUFLLEVBQUUsMERBQTBELE9BQU8sVUFBVTtxQkFDbkYsQ0FBQyxDQUFDO29CQUVILGdDQUFnQztvQkFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsQzthQUNGO1NBQ0Y7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxFQUFFLDBFQUEwRSxPQUFPLGFBQWE7U0FDdEcsQ0FBQyxDQUFDO1FBRUgsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxZQUFZO1FBQ1osd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxNQUFNO1FBRU4sT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVoQiwyQkFBMkI7UUFDM0IsTUFBTSxJQUFJLEdBQUcsZUFBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzQyxNQUFNLE9BQU8sR0FBRyx1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxFQUFFLG9HQUFvRyxPQUFPLFVBQVU7U0FDN0gsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLG9FQUFvRSxPQUFPLGFBQWE7YUFDaEcsQ0FBQyxDQUFDO1lBRUgsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsSUFBSTtnQkFDSixTQUFTO2FBQ1YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxxQkFBcUI7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckdELGlDQXFHQyJ9