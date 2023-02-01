"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const npm_1 = require("@coffeekraken/sugar/npm");
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
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.cwd}/node_modules/${name}/package.json`)) {
        return `${set.cwd}/node_modules/${name}`;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        fs_1.default.existsSync(`${monoDir}/${name}/package.json`)) {
        return `${monoDir}/${name}`;
    }
    globalDir = (0, npm_1.__globalNodeModulesPath)();
    if (set.global && fs_1.default.existsSync(`${globalDir}/${name}/package.json`)) {
        return `${globalDir}/${name}`;
    }
}
exports.default = packagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQWtFO0FBQ2xFLHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQsNENBQXNCO0FBK0J0QixTQUF3QixXQUFXLENBQy9CLElBQVksRUFDWixRQUF3QztJQUV4QyxNQUFNLEdBQUcsR0FBeUIsSUFBQSxvQkFBVyxFQUN6QztRQUNJLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxFQUFFLFNBQVMsQ0FBQztJQUV2QixPQUFPLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixFQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLENBQUM7SUFFbEIsNERBQTREO0lBQzVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7S0FDNUM7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUE7UUFDN0IsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLE9BQU8sR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7S0FDL0I7SUFFRCxTQUFTLEdBQUcsSUFBQSw2QkFBdUIsR0FBRSxDQUFDO0lBRXRDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQUU7UUFDcEUsT0FBTyxHQUFHLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUNqQztBQUNMLENBQUM7QUFyQ0QsOEJBcUNDIn0=