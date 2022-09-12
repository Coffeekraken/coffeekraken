"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const objectHash_1 = __importDefault(require("../../shared/object/objectHash"));
const formatPackageJson_1 = __importDefault(require("../../shared/package/formatPackageJson"));
const fs_2 = require("@coffeekraken/sugar/fs");
const packageJson_1 = __importDefault(require("../npm/packageJson"));
const rootPath_1 = __importDefault(require("./rootPath"));
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
        const path = `${(0, rootPath_1.default)(fromOrName, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!fs_1.default.existsSync(path))
            return false;
        json = (0, fs_2.__readJsonSync)(path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixnRkFBMEQ7QUFDMUQsK0ZBQXlFO0FBQ3pFLCtDQUF3RDtBQUN4RCxxRUFBK0M7QUFDL0MsMERBQXVDO0FBK0J2QyxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixTQUF3QixpQkFBaUIsQ0FDckMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDMUIsUUFBNEM7SUFFNUMsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxLQUFLLEVBQ2QsV0FBVyxFQUFFLEtBQUssSUFDZixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsVUFBVTtJQUNWLE1BQU0sSUFBSSxHQUFHLElBQUEsb0JBQVksa0JBQ3JCLFVBQVUsSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO0lBQ0gsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxHQUFHLElBQUEsa0JBQWEsRUFBQyxVQUFVLEVBQUU7WUFDdEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO1NBQ2pDLENBQUMsZUFBZSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXpDLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQzNCLElBQUksR0FBRyxJQUFBLDJCQUFtQixFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0o7U0FBTTtRQUNILElBQUksR0FBRyxJQUFBLHFCQUFhLEVBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFDRCxvQ0EwQ0MifQ==