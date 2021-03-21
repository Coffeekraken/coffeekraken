"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../shared/config/sugar"));
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const extension_1 = __importDefault(require("../../fs/extension"));
const filename_1 = __importDefault(require("../../fs/filename"));
const folderPath_1 = __importDefault(require("../../fs/folderPath"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZURlcGVuZGVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlRGVwZW5kZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlFQUF5RDtBQUN6RCxnREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxpRUFBOEM7QUFDOUMscUVBQStDO0FBRS9DLGlGQUEyRDtBQUMzRCw0Q0FBc0I7QUE0QnRCLFNBQVMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFdBQXVDLEVBQUU7O0lBQ3hFLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFlBQVksRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7UUFDeEQsSUFBSSxFQUFFLFNBQVM7S0FDaEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN6QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsMERBQTBEO0lBQzFELGFBQWE7SUFDYixJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQy9CLGFBQWE7UUFDYixRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBRUQsd0JBQXdCO0lBQ3hCLGFBQWE7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUcsTUFBQSxRQUFRLENBQUMsWUFBWSwwQ0FBRSxNQUFNLENBQUEsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0RCxhQUFhO1FBQ2IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLGtCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPLEdBQUcsR0FBRyxVQUFVLFFBQVEsUUFBUSxJQUFJLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sR0FBRyxHQUFHLFVBQVUsUUFBUSxRQUFRLEVBQUUsQ0FBQztTQUMzQztRQUNELE1BQU0sY0FBYyxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzFDLGFBQWE7WUFDYixHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDLENBQUM7UUFDSCxJQUFJLGNBQWMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQzNDLE9BQU8sY0FBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7S0FDRjtBQUNILENBQUM7QUFFRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9