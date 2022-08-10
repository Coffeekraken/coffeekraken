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
function dependencyTree(filePath, settings) {
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
            const cachedValue;
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
exports.default = dependencyTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGlFQUEyQztBQUMzQyw4RUFBd0Q7QUFDeEQsNEVBQXNEO0FBQ3RELG9FQUE4QztBQTJDOUMsU0FBd0IsY0FBYyxDQUNsQyxRQUFnQixFQUNoQixRQUFtRDtJQUVuRCxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RELFdBQVc7UUFDWCxNQUFNLEdBQUcsR0FBb0MsSUFBQSxtQkFBVyxFQUNwRDtZQUNJLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUEsd0JBQWdCLEdBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5RCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCx3REFBd0QsUUFBUSxpQ0FBaUMsQ0FDcEcsQ0FBQztTQUNMO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLEVBQ3ZCLFdBQVcsR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVsRCx1QkFBdUI7UUFDdkIsTUFBTSxlQUFlLEdBQUcsR0FBRyxJQUFBLHdCQUFnQixHQUFFLGVBQWUsQ0FBQztRQUM3RCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbEMsa0JBQWtCLEdBQUcsWUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDL0Q7UUFFRCxhQUFhO1FBQ2IsaURBQWlEO1FBRWpELFlBQVk7UUFDWixNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDO1lBQzVCLGtCQUFrQjtZQUNsQixXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsY0FBYztRQUNkLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsS0FBSyxFQUFFLDJEQUEyRCxPQUFPLGFBQWE7YUFDekYsQ0FBQyxDQUFDO1lBRUgsV0FBVztZQUNYLGlEQUFpRDtZQUNqRCxNQUFNLFdBQVcsQ0FBQztZQUNsQixJQUFJLFdBQVcsRUFBRTtnQkFDYixrQkFBa0I7Z0JBQ2xCLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLG1CQUFtQjt3QkFDMUIsS0FBSyxFQUFFLDBEQUEwRCxPQUFPLFVBQVU7cUJBQ3JGLENBQUMsQ0FBQztvQkFFSCxnQ0FBZ0M7b0JBQ2hDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsS0FBSyxFQUFFLDBFQUEwRSxPQUFPLGFBQWE7U0FDeEcsQ0FBQyxDQUFDO1FBRUgsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxZQUFZO1FBQ1osd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxNQUFNO1FBRU4sT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVoQiwyQkFBMkI7UUFDM0IsTUFBTSxJQUFJLEdBQUcsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkMsTUFBTSxPQUFPLEdBQUcsSUFBQSx1QkFBZSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixLQUFLLEVBQUUsb0dBQW9HLE9BQU8sVUFBVTtTQUMvSCxDQUFDLENBQUM7UUFFSCx3QkFBd0I7UUFDeEIsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixLQUFLLEVBQUUsb0VBQW9FLE9BQU8sYUFBYTthQUNsRyxDQUFDLENBQUM7WUFFSCxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUN0QixJQUFJO2dCQUNKLFNBQVM7YUFDWixDQUFDLENBQUM7U0FDTjtRQUVELHFCQUFxQjtRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUEzR0QsaUNBMkdDIn0=