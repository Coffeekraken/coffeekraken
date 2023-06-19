"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
function composerPath(name, settings) {
    const set = (0, deepMerge_1.default)({
        cwd: process.cwd(),
        monorepo: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    let monoDir;
    monoDir = `${(0, packageRootDir_1.default)(set.cwd, {
        highest: true,
    })}/vendor`;
    // if the package.json exists in rootDir node_modules folder
    if (fs_1.default.existsSync(`${set.cwd}/vendor/${name}/composer.json`)) {
        return fs_1.default.realpathSync(`${set.cwd}/vendor/${name}`);
    }
    if (set.monorepo &&
        monoDir !== (settings === null || settings === void 0 ? void 0 : settings.cwd) &&
        fs_1.default.existsSync(`${monoDir}/${name}/composer.json`)) {
        return fs_1.default.realpathSync(`${monoDir}/${name}`);
    }
}
exports.default = composerPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLDhFQUF3RDtBQUN4RCw0RUFBc0Q7QUE4QnRELFNBQXdCLFlBQVksQ0FDaEMsSUFBWSxFQUNaLFFBQXlDO0lBRXpDLE1BQU0sR0FBRyxHQUEwQixJQUFBLG1CQUFXLEVBQzFDO1FBQ0ksR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLE9BQU8sQ0FBQztJQUVaLE9BQU8sR0FBRyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxPQUFPLEVBQUUsSUFBSTtLQUNoQixDQUFDLFNBQVMsQ0FBQztJQUVaLDREQUE0RDtJQUM1RCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxXQUFXLElBQUksZ0JBQWdCLENBQUMsRUFBRTtRQUM1RCxPQUFPLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7S0FDekQ7SUFFRCxJQUNJLEdBQUcsQ0FBQyxRQUFRO1FBQ1osT0FBTyxNQUFLLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLENBQUE7UUFDekIsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLGdCQUFnQixDQUFDLEVBQ3JEO1FBQ0UsT0FBTyxZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEQ7QUFDTCxDQUFDO0FBOUJELCtCQThCQyJ9