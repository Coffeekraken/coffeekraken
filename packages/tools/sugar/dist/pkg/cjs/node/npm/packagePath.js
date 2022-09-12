"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const path_1 = require("@coffeekraken/sugar/path");
const globalNodeModulesPath_1 = __importDefault(require("./globalNodeModulesPath"));
function packagePath(name, settings) {
    const set = (0, deepMerge_1.default)({
        rootDir: s_sugar_config_1.default.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let monoDir, globalDir;
    monoDir = `${(0, path_1.__packageRootDir)(process.cwd(), {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.rootDir}/${name}/package.json`)) {
        return `${set.rootDir}/${name}`;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        fs_1.default.existsSync(`${monoDir}/${name}/package.json`)) {
        return `${monoDir}/${name}`;
    }
    globalDir = (0, globalNodeModulesPath_1.default)();
    if (set.global && fs_1.default.existsSync(`${globalDir}/${name}/package.json`)) {
        return `${globalDir}/${name}`;
    }
}
exports.default = packagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFDeEQsbURBQTREO0FBQzVELG9GQUE4RDtBQStCOUQsU0FBd0IsV0FBVyxDQUMvQixJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLElBQUEsbUJBQVcsRUFBQztRQUMxQyxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDekMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLENBQUM7SUFFbEIsNERBQTREO0lBQzVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUN4RCxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUNuQztJQUVELElBQ0ksR0FBRyxDQUFDLFFBQVE7UUFDWixPQUFPLE1BQUssUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQTtRQUM3QixZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQ3BEO1FBQ0UsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUMvQjtJQUVELFNBQVMsR0FBRyxJQUFBLCtCQUF1QixHQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxPQUFPLEdBQUcsU0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ2pDO0FBQ0wsQ0FBQztBQWxDRCw4QkFrQ0MifQ==