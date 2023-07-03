"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const globalNodeModulesPath_1 = __importDefault(require("../npm/globalNodeModulesPath"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
function packagePathSync(name, settings) {
    const set = (0, deepMerge_1.default)({
        cwd: process.cwd(),
        monorepo: true,
        global: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir, globalDir;
    monoDir = `${(0, packageRootDir_1.default)(set.cwd, {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.cwd}/node_modules/${name}/package.json`)) {
        return fs_1.default.realpathSync(`${set.cwd}/node_modules/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        fs_1.default.existsSync(`${monoDir}/${name}/package.json`)) {
        return fs_1.default.realpathSync(`${monoDir}/${name}`);
    }
    globalDir = (0, globalNodeModulesPath_1.default)();
    if (set.global && fs_1.default.existsSync(`${globalDir}/${name}/package.json`)) {
        return fs_1.default.realpathSync(`${globalDir}/${name}`);
    }
}
exports.default = packagePathSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLDhFQUF3RDtBQUN4RCx5RkFBbUU7QUFDbkUsNEVBQXNEO0FBaUN0RCxTQUF3QixlQUFlLENBQ25DLElBQVksRUFDWixRQUF3QztJQUV4QyxNQUFNLEdBQUcsR0FBeUIsSUFBQSxtQkFBVyxFQUN6QztRQUNJLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLElBQUksT0FBTyxFQUFFLFNBQVMsQ0FBQztJQUV2QixPQUFPLEdBQUcsR0FBRyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDbkMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLENBQUM7SUFFbEIsNERBQTREO0lBQzVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ2pFLE9BQU8sWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsSUFDSSxHQUFHLENBQUMsUUFBUTtRQUNaLE9BQU8sTUFBSyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRyxDQUFBO1FBQ3pCLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDcEQ7UUFDRSxPQUFPLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNsRDtJQUVELFNBQVMsR0FBRyxJQUFBLCtCQUF1QixHQUFFLENBQUM7SUFFdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUNwRSxPQUFPLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRDtBQUNMLENBQUM7QUFyQ0Qsa0NBcUNDIn0=