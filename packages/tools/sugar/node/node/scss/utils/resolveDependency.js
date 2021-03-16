"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const extension_1 = __importDefault(require("../../fs/extension"));
const filename_1 = __importDefault(require("../../fs/filename"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function resolveDependency(path, settings = {}) {
    var _a;
    settings = deepMerge_1.default({
        includePaths: sugar_1.default('scss.compile.includePaths'),
        from: undefined
    }, settings);
    if (fs_1.default.existsSync(path)) {
        return path;
    }
    // add the "from" folder path in the includePaths if exist
    // @ts-ignore
    if (settings.from !== undefined) {
        // @ts-ignore
        settings.includePaths.unshift(folderPath_1.default(settings.from));
    }
    // loop on include paths
    // @ts-ignore
    for (let i = 0; i < ((_a = settings.includePaths) === null || _a === void 0 ? void 0 : _a.length); i++) {
        // @ts-ignore
        const includePath = settings.includePaths[i];
        const extension = extension_1.default(path);
        const filename = filename_1.default(path);
        const folderPath = folderPath_1.default(path);
        let pattern;
        if (!extension) {
            pattern = `${folderPath}/?(_)${filename}.*`;
        }
        else {
            pattern = `${folderPath}/?(_)${filename}`;
        }
        const potentialPaths = glob_1.default.sync(pattern, {
            // @ts-ignore
            cwd: includePath
        });
        if (potentialPaths && potentialPaths.length) {
            return path_1.default.resolve(includePath, potentialPaths[0]);
        }
    }
}
exports.default = resolveDependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZURlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9zY3NzL3V0aWxzL3Jlc29sdmVEZXBlbmRlbmN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQStDO0FBQy9DLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsbUVBQTZDO0FBQzdDLGlFQUE4QztBQUM5QyxxRUFBK0M7QUFFL0MsdUVBQWlEO0FBQ2pELDRDQUFzQjtBQTRCdEIsU0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBdUMsRUFBRTs7SUFDeEUsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsWUFBWSxFQUFFLGVBQWEsQ0FBQywyQkFBMkIsQ0FBQztRQUN4RCxJQUFJLEVBQUUsU0FBUztLQUNoQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCwwREFBMEQ7SUFDMUQsYUFBYTtJQUNiLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDL0IsYUFBYTtRQUNiLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDNUQ7SUFFRCx3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRyxNQUFBLFFBQVEsQ0FBQyxZQUFZLDBDQUFFLE1BQU0sQ0FBQSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RELGFBQWE7UUFDYixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsTUFBTSxRQUFRLEdBQUcsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxvQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxDQUFDO1FBQ1osSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU8sR0FBRyxHQUFHLFVBQVUsUUFBUSxRQUFRLElBQUksQ0FBQztTQUM3QzthQUFNO1lBQ0wsT0FBTyxHQUFHLEdBQUcsVUFBVSxRQUFRLFFBQVEsRUFBRSxDQUFDO1NBQzNDO1FBQ0QsTUFBTSxjQUFjLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDMUMsYUFBYTtZQUNiLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUMsQ0FBQztRQUNILElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7WUFDM0MsT0FBTyxjQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RDtLQUNGO0FBQ0gsQ0FBQztBQUVELGtCQUFlLGlCQUFpQixDQUFDIn0=