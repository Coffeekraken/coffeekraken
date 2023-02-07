"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const objectHash_1 = __importDefault(require("../../shared/object/objectHash"));
const formatPackageJson_1 = __importDefault(require("../../shared/package/formatPackageJson"));
const packageJson_1 = __importDefault(require("../npm/packageJson"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
let __packageJsonCache = {};
function __packageJsonSync(fromOrName = process.cwd(), settings) {
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
        const path = `${(0, packageRootDir_1.default)(fromOrName, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!fs_2.default.existsSync(path))
            return false;
        json = (0, fs_1.__readJsonSync)(path);
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
exports.default = __packageJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF3RDtBQUN4RCw0Q0FBc0I7QUFDdEIsZ0ZBQTBEO0FBQzFELCtGQUF5RTtBQUN6RSxxRUFBK0M7QUFDL0MsNEVBQXNEO0FBK0J0RCxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixTQUF3QixpQkFBaUIsQ0FDckMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDMUIsUUFBNEM7SUFFNUMsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxLQUFLLEVBQ2QsV0FBVyxFQUFFLEtBQUssSUFDZixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsVUFBVTtJQUNWLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVksa0JBQ3JCLFVBQVUsSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO0lBQ0gsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsVUFBVSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUNqQyxDQUFDLGVBQWUsQ0FBQztRQUVsQixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV6QyxJQUFJLEdBQUcsSUFBQSxtQkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztLQUNKO1NBQU07UUFDSCxJQUFJLEdBQUcsSUFBQSxxQkFBYSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsUUFBUTtJQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0Qsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE1Q0Qsb0NBNENDIn0=