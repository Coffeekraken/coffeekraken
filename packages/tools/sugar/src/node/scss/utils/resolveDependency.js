"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = resolveDependency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZURlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQStDO0FBQy9DLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsbUVBQTZDO0FBQzdDLGlFQUE4QztBQUM5QyxxRUFBK0M7QUFFL0MsdUVBQWlEO0FBQ2pELDRDQUFzQjtBQTRCdEIsU0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBdUMsRUFBRTs7SUFDeEUsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsWUFBWSxFQUFFLGVBQWEsQ0FBQywyQkFBMkIsQ0FBQztRQUN4RCxJQUFJLEVBQUUsU0FBUztLQUNoQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCwwREFBMEQ7SUFDMUQsYUFBYTtJQUNiLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDL0IsYUFBYTtRQUNiLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG9CQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDNUQ7SUFFRCx3QkFBd0I7SUFDeEIsYUFBYTtJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBRyxRQUFRLENBQUMsWUFBWSwwQ0FBRSxNQUFNLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0RCxhQUFhO1FBQ2IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLGtCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLEdBQUcsR0FBRyxVQUFVLFFBQVEsUUFBUSxJQUFJLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sR0FBRyxHQUFHLFVBQVUsUUFBUSxRQUFRLEVBQUUsQ0FBQztTQUMzQztRQUNELE1BQU0sY0FBYyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzFDLGFBQWE7WUFDYixHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDLENBQUM7UUFDSCxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzNDLE9BQU8sY0FBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7S0FDRjtBQUNILENBQUM7QUFFRCxpQkFBUyxpQkFBaUIsQ0FBQyJ9