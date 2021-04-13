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
        const file = s_file_1.default.new(filePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5VHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFFN0MsOEVBQXdEO0FBQ3hELDRDQUFzQjtBQUN0QixzRUFBZ0Q7QUFDaEQsaUVBQTJDO0FBRTNDLGdEQUEwQjtBQUMxQixrRUFBMkM7QUFDM0Msb0VBQThDO0FBeUM5QyxTQUF3QixjQUFjLENBQ3BDLFFBQWdCLEVBQ2hCLFFBQW1EO0lBRW5ELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsV0FBVztRQUNYLE1BQU0sR0FBRyxHQUFvQyxtQkFBVyxDQUN0RDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLGNBQU0sQ0FBQyxRQUFRLENBQUMscUJBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTNELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLHdEQUF3RCxRQUFRLGlDQUFpQyxDQUNsRyxDQUFDO1NBQ0g7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFDekIsV0FBVyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRWhELHVCQUF1QjtRQUN2QixNQUFNLGVBQWUsR0FBRyxHQUFHLHFCQUFhLEVBQUUsZUFBZSxDQUFDO1FBQzFELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNwQyxrQkFBa0IsR0FBRyxZQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUM3RDtRQUVELGFBQWE7UUFDYixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUU5QyxZQUFZO1FBQ1osTUFBTSxTQUFTLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixrQkFBa0I7WUFDbEIsV0FBVztTQUNaLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSwyREFBMkQsT0FBTyxhQUFhO2FBQ3ZGLENBQUMsQ0FBQztZQUVILFdBQVc7WUFDWCxNQUFNLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2Ysa0JBQWtCO2dCQUNsQixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSwwREFBMEQsT0FBTyxVQUFVO3FCQUNuRixDQUFDLENBQUM7b0JBRUgsZ0NBQWdDO29CQUNoQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEVBQUUsMEVBQTBFLE9BQU8sYUFBYTtTQUN0RyxDQUFDLENBQUM7UUFFSCxzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLFlBQVk7UUFDWix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLE1BQU07UUFFTixPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDJCQUEyQjtRQUMzQixNQUFNLElBQUksR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBRyx1QkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxFQUFFLG9HQUFvRyxPQUFPLFVBQVU7U0FDN0gsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLG9FQUFvRSxPQUFPLGFBQWE7YUFDaEcsQ0FBQyxDQUFDO1lBRUgsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsSUFBSTtnQkFDSixTQUFTO2FBQ1YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxxQkFBcUI7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckdELGlDQXFHQyJ9