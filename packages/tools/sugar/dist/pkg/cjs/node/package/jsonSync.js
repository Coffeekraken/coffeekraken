"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const objectHash_1 = __importDefault(require("../../shared/object/objectHash"));
const formatPackageJson_1 = __importDefault(require("../../shared/package/formatPackageJson"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const packageJson_1 = __importDefault(require("../npm/packageJson"));
const rootPath_1 = __importDefault(require("./rootPath"));
let __packageJsonCache = {};
function jsonSync(fromOrName = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, standardize: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // "cache"
    const hash = (0, objectHash_1.default)(Object.assign({ fromOrName }, (settings !== null && settings !== void 0 ? settings : {})));
    if (__packageJsonCache[hash]) {
        return __packageJsonCache[hash];
    }
    let json;
    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${(0, rootPath_1.default)(fromOrName, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!fs_1.default.existsSync(path))
            return false;
        json = (0, readJsonSync_1.default)(path);
        if (finalSettings.standardize) {
            json = (0, formatPackageJson_1.default)(json);
        }
    }
    else {
        json = (0, packageJson_1.default)(fromOrName);
    }
    // cache
    if (!__packageJsonCache[hash])
        __packageJsonCache[hash] = json;
    // return the json
    return json;
}
exports.default = jsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixnRkFBMEQ7QUFDMUQsK0ZBQXlFO0FBQ3pFLHNFQUFnRDtBQUNoRCxxRUFBK0M7QUFDL0MsMERBQXVDO0FBK0J2QyxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixTQUF3QixRQUFRLENBQzVCLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQzFCLFFBQTRDO0lBRTVDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxLQUFLLElBQ2YsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFVBQVU7SUFDVixNQUFNLElBQUksR0FBRyxJQUFBLG9CQUFZLGtCQUNyQixVQUFVLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztJQUNILElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQztJQUVELElBQUksSUFBSSxDQUFDO0lBRVQsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLEdBQUcsR0FBRyxJQUFBLGtCQUFhLEVBQUMsVUFBVSxFQUFFO1lBQ3RDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUNqQyxDQUFDLGVBQWUsQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV6QyxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztLQUNKO1NBQU07UUFDSCxJQUFJLEdBQUcsSUFBQSxxQkFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsUUFBUTtJQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0Qsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExQ0QsMkJBMENDIn0=