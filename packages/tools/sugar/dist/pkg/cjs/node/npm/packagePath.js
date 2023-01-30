"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
function packagePath(name, settings) {
    const set = (0, object_1.__deepMerge)({
        cwd: process.cwd(),
        monorepo: true,
        global: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir, globalDir;
    monoDir = `${(0, path_1.__packageRootDir)(set.cwd, {
        highest: true,
    })}/node_modules`;
    console.log('mono', monoDir);
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.cwd}/node_modules/${name}/package.json`)) {
        return `${set.cwd}/node_modules/${name}`;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        fs_1.default.existsSync(`${monoDir}/${name}/package.json`)) {
        return `${monoDir}/${name}`;
    }
    // globalDir = __globalNodeModulesPath();
    // if (set.global && __fs.existsSync(`${globalDir}/${name}/package.json`)) {
    //     return `${globalDir}/${name}`;
    // }
}
exports.default = packagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUErQnRCLFNBQXdCLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUF5QixJQUFBLG9CQUFXLEVBQ3pDO1FBQ0ksR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEIsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsSUFBSTtLQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBRUYsSUFBSSxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBRXZCLE9BQU8sR0FBRyxHQUFHLElBQUEsdUJBQWdCLEVBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsQ0FBQztJQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUU3Qiw0REFBNEQ7SUFDNUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsaUJBQWlCLElBQUksZUFBZSxDQUFDLEVBQUU7UUFDakUsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztLQUM1QztJQUVELElBQ0ksR0FBRyxDQUFDLFFBQVE7UUFDWixPQUFPLE1BQUssUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQTtRQUM3QixZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQ3BEO1FBQ0UsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUMvQjtJQUVELHlDQUF5QztJQUV6Qyw0RUFBNEU7SUFDNUUscUNBQXFDO0lBQ3JDLElBQUk7QUFDUixDQUFDO0FBdkNELDhCQXVDQyJ9