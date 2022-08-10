"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const globalNodeModulesPath_1 = __importDefault(require("./globalNodeModulesPath"));
function packagePath(name, settings) {
    const set = (0, deepMerge_1.default)({
        rootDir: s_sugar_config_1.default.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let monoDir, globalDir;
    monoDir = `${(0, packageRoot_1.default)(process.cwd(), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFDeEQsc0VBQWdEO0FBQ2hELG9GQUE4RDtBQStCOUQsU0FBd0IsV0FBVyxDQUMvQixJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLElBQUEsbUJBQVcsRUFBQztRQUMxQyxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFFdkIsT0FBTyxHQUFHLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN0QyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLGVBQWUsQ0FBQztJQUVsQiw0REFBNEQ7SUFDNUQsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ3hELE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQ25DO0lBRUQsSUFDSSxHQUFHLENBQUMsUUFBUTtRQUNaLE9BQU8sTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFBO1FBQzdCLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDcEQ7UUFDRSxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO0tBQy9CO0lBRUQsU0FBUyxHQUFHLElBQUEsK0JBQXVCLEdBQUUsQ0FBQztJQUV0QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ3BFLE9BQU8sR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7S0FDakM7QUFDTCxDQUFDO0FBbENELDhCQWtDQyJ9