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
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const md5_1 = __importDefault(require("../../shared/crypt/md5"));
const path_1 = __importDefault(require("path"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
            });
            // cache id
            const cachedValue = yield cache.get(filePath);
            if (cachedValue) {
                // check integrity
                if (cachedValue.integrity === integrity) {
                    emit('log', {
                        group: `s-dependency-tree`,
                        value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
                    });
                    // return the actual valid value
                    return resolve(cachedValue.tree);
                }
            }
        }
        emit('log', {
            group: `s-dependency-tree`,
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
        const file = s_file_1.default.new(filePath);
        const imports = extractImport_1.default(file.content);
        emit('log', {
            group: `s-dependency-tree`,
            value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
        });
        // caching tee if needed
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5VHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFFN0MsOEVBQXdEO0FBQ3hELDRDQUFzQjtBQUN0QixzRUFBZ0Q7QUFDaEQsaUVBQTJDO0FBRTNDLGdEQUEwQjtBQUMxQixrRUFBMkM7QUFDM0Msb0VBQThDO0FBeUM5QyxTQUF3QixjQUFjLENBQ3BDLFFBQWdCLEVBQ2hCLFFBQW1EO0lBRW5ELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsV0FBVztRQUNYLE1BQU0sR0FBRyxHQUFvQyxtQkFBVyxDQUN0RDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMscUJBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTNELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLHdEQUF3RCxRQUFRLGlDQUFpQyxDQUNsRyxDQUFDO1NBQ0g7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFDekIsV0FBVyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRWhELHVCQUF1QjtRQUN2QixNQUFNLGVBQWUsR0FBRyxHQUFHLHFCQUFhLEVBQUUsZUFBZSxDQUFDO1FBQzFELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNwQyxrQkFBa0IsR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUM3RDtRQUVELGFBQWE7UUFDYixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QyxZQUFZO1FBQ1osTUFBTSxTQUFTLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixrQkFBa0I7WUFDbEIsV0FBVztTQUNaLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLEtBQUssRUFBRSwyREFBMkQsT0FBTyxhQUFhO2FBQ3ZGLENBQUMsQ0FBQztZQUVILFdBQVc7WUFDWCxNQUFNLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSxtQkFBbUI7d0JBQzFCLEtBQUssRUFBRSwwREFBMEQsT0FBTyxVQUFVO3FCQUNuRixDQUFDLENBQUM7b0JBRUgsZ0NBQWdDO29CQUNoQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEtBQUssRUFBRSwwRUFBMEUsT0FBTyxhQUFhO1NBQ3RHLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxrQ0FBa0M7UUFDbEMsWUFBWTtRQUNaLHdCQUF3QjtRQUN4QixzQ0FBc0M7UUFDdEMsTUFBTTtRQUVOLE9BQU87UUFDUCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFFaEIsMkJBQTJCO1FBQzNCLE1BQU0sSUFBSSxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHLHVCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEtBQUssRUFBRSxvR0FBb0csT0FBTyxVQUFVO1NBQzdILENBQUMsQ0FBQztRQUVILHdCQUF3QjtRQUN4QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLEtBQUssRUFBRSxvRUFBb0UsT0FBTyxhQUFhO2FBQ2hHLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLElBQUk7Z0JBQ0osU0FBUzthQUNWLENBQUMsQ0FBQztTQUNKO1FBRUQscUJBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFHRCxpQ0EwR0MifQ==