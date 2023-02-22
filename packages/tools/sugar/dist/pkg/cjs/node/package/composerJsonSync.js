"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const objectHash_1 = __importDefault(require("../../shared/object/objectHash"));
const packageJson_1 = __importDefault(require("../npm/packageJson"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
let _composerJsonCache = {};
function __composerJsonSync(fromOrName = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // "cache"
    const hash = (0, objectHash_1.default)(Object.assign({ fromOrName }, (settings !== null && settings !== void 0 ? settings : {})));
    if (_composerJsonCache[hash]) {
        return _composerJsonCache[hash];
    }
    let json;
    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${(0, packageRootDir_1.default)(fromOrName, {
            highest: finalSettings.highest,
        })}/composer.json`;
        if (!fs_2.default.existsSync(path))
            return false;
        json = (0, fs_1.__readJsonSync)(path);
    }
    else {
        json = (0, packageJson_1.default)(fromOrName);
    }
    // cache
    if (!_composerJsonCache[hash])
        _composerJsonCache[hash] = json;
    // return the json
    return json;
}
exports.default = __composerJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF3RDtBQUN4RCw0Q0FBc0I7QUFDdEIsZ0ZBQTBEO0FBQzFELHFFQUErQztBQUMvQyw0RUFBc0Q7QUE4QnRELElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLFNBQXdCLGtCQUFrQixDQUN0QyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUMxQixRQUE2QztJQUU3QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssSUFDWCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsVUFBVTtJQUNWLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVksa0JBQ3JCLFVBQVUsSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO0lBQ0gsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsVUFBVSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUNqQyxDQUFDLGdCQUFnQixDQUFDO1FBRW5CLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXpDLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7U0FBTTtRQUNILElBQUksR0FBRyxJQUFBLHFCQUFhLEVBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZDRCxxQ0F1Q0MifQ==