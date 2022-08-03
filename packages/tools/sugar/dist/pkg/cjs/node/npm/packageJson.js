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
function packageJson(name, settings) {
    const set = (0, deepMerge_1.default)({
        rootDir: s_sugar_config_1.default.get('npm.rootDir'),
        monorepo: true,
        global: true,
    });
    let json, monoDir, globalDir;
    monoDir = `${(0, packageRoot_1.default)(process.cwd(), {
        highest: true,
    })}/node_modules`;
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.rootDir}/${name}/package.json`)) {
        json = JSON.parse(fs_1.default.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'));
        return json;
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.rootDir) &&
        fs_1.default.existsSync(`${monoDir}/${name}/package.json`)) {
        json = JSON.parse(fs_1.default.readFileSync(`${monoDir}/${name}/package.json`, 'utf8'));
        return json;
    }
    globalDir = (0, globalNodeModulesPath_1.default)();
    if (set.global && fs_1.default.existsSync(`${globalDir}/${name}/package.json`)) {
        json = JSON.parse(fs_1.default.readFileSync(`${globalDir}/${name}/package.json`, 'utf8'));
        return json;
    }
}
exports.default = packageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFDeEQsc0VBQWdEO0FBQ2hELG9GQUE4RDtBQStCOUQsU0FBd0IsV0FBVyxDQUMvQixJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLElBQUEsbUJBQVcsRUFBQztRQUMxQyxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7SUFFSCxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBRTdCLE9BQU8sR0FBRyxHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDdEMsT0FBTyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxlQUFlLENBQUM7SUFFbEIsNERBQTREO0lBQzVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFBRTtRQUN4RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDYixZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FDbkUsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUE7UUFDN0IsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUNwRDtRQUNFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNiLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQy9ELENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsU0FBUyxHQUFHLElBQUEsK0JBQXVCLEdBQUUsQ0FBQztJQUV0QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsSUFBSSxJQUFJLGVBQWUsQ0FBQyxFQUFFO1FBQ3BFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNiLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQ2pFLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztLQUNmO0FBQ0wsQ0FBQztBQTNDRCw4QkEyQ0MifQ==