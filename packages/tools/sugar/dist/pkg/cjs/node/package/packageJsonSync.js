"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const objectHash_js_1 = __importDefault(require("../../shared/object/objectHash.js"));
const formatPackageJson_js_1 = __importDefault(require("../../shared/package/formatPackageJson.js"));
const readJsonSync_js_1 = __importDefault(require("../fs/readJsonSync.js"));
const packageJsonSync_js_1 = __importDefault(require("../npm/packageJsonSync.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
let __packageJsonCache = {};
function packageJsonSync(fromOrName = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, standardize: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // "cache"
    const hash = (0, objectHash_js_1.default)(Object.assign({ fromOrName }, (settings !== null && settings !== void 0 ? settings : {})));
    if (__packageJsonCache[hash]) {
        return __packageJsonCache[hash];
    }
    let json;
    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${(0, packageRootDir_js_1.default)(fromOrName, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!fs_1.default.existsSync(path))
            return false;
        json = (0, readJsonSync_js_1.default)(path);
        if (finalSettings.standardize) {
            json = (0, formatPackageJson_js_1.default)(json);
        }
    }
    else {
        json = (0, packageJsonSync_js_1.default)(fromOrName);
    }
    // cache
    if (!__packageJsonCache[hash])
        __packageJsonCache[hash] = json;
    // return the json
    return json;
}
exports.default = packageJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixzRkFBNkQ7QUFDN0QscUdBQTRFO0FBQzVFLDRFQUFtRDtBQUNuRCxtRkFBMEQ7QUFDMUQsa0ZBQXlEO0FBaUN6RCxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixTQUF3QixlQUFlLENBQ25DLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQzFCLFFBQTRDO0lBRTVDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxLQUFLLElBQ2YsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFVBQVU7SUFDVixNQUFNLElBQUksR0FBRyxJQUFBLHVCQUFZLGtCQUNyQixVQUFVLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztJQUNILElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQztJQUVELElBQUksSUFBSSxDQUFDO0lBRVQsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFBLDJCQUFnQixFQUFDLFVBQVUsRUFBRTtZQUN6QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87U0FDakMsQ0FBQyxlQUFlLENBQUM7UUFFbEIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFekMsSUFBSSxHQUFHLElBQUEseUJBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUU1QixJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxHQUFHLElBQUEsOEJBQW1CLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7S0FDSjtTQUFNO1FBQ0gsSUFBSSxHQUFHLElBQUEsNEJBQWlCLEVBQUMsVUFBVSxDQUFDLENBQUM7S0FDeEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTVDRCxrQ0E0Q0MifQ==