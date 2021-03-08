"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const ResolveSettingsInterface_1 = __importDefault(require("./interface/ResolveSettingsInterface"));
const path_1 = __importDefault(require("path"));
const file_1 = __importDefault(require("../is/file"));
const buildInNodeModules_1 = __importDefault(require("./buildInNodeModules"));
const exportsMatch_1 = __importDefault(require("./exportsMatch"));
const existsSync_1 = __importDefault(require("../fs/existsSync"));
function resolve(moduleName, settings) {
    return __awaiter(this, void 0, void 0, function* () {
        const set = deepMerge_1.default(Object.assign({}, ResolveSettingsInterface_1.default.defaults()), settings || {});
        // build in modules
        const builtInModulesArray = Object.keys(buildInNodeModules_1.default);
        if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
            return moduleName;
        // loop on directories
        for (let i = 0; i < set.dirs.length; i++) {
            const dirPath = set.dirs[i];
            let moduleDirPath, internalModulePath, absPath, packageJson;
            // if moduleName starts with a "." or a "/"
            // this mean that we do not target a module in the "node_modules" folder
            if (!moduleName.match(/^[\.\/]/)) {
                // find the module directory by checking for the two first something/else
                const parts = moduleName.split('/');
                if (parts.length === 1 &&
                    existsSync_1.default(path_1.default.resolve(dirPath, parts[0], 'package.json'))) {
                    packageJson = require(path_1.default.resolve(dirPath, parts[0], 'package.json'));
                    moduleDirPath = path_1.default.resolve(dirPath, parts[0]);
                }
                else if (parts.length >= 2 &&
                    existsSync_1.default(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    packageJson = require(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'));
                    absPath = path_1.default.resolve(dirPath, moduleName);
                    moduleDirPath = path_1.default.resolve(dirPath, parts[0], parts[1]);
                    internalModulePath = parts.slice(2).join('/');
                }
                else {
                    throw new Error(`Sorry but the passed module path does not correspond to any existing modules in your "node_module" folder...`);
                }
            }
            else {
                // check if the passed moduleName is a node module
                if (existsSync_1.default(path_1.default.resolve(dirPath, moduleName, 'package.json'))) {
                    packageJson = require(path_1.default.resolve(dirPath, moduleName, 'package.json'));
                    moduleDirPath = path_1.default.resolve(dirPath, moduleName);
                }
                else {
                    absPath = path_1.default.resolve(dirPath, moduleName);
                }
            }
            // check if the file exists
            if (file_1.default(absPath)) {
                return absPath;
            }
            if (packageJson) {
                // check exports if prefered over fields
                if (internalModulePath &&
                    packageJson.exports !== undefined &&
                    set.preferExports) {
                    return exportsMatch_1.default(absPath, packageJson.exports, internalModulePath, {});
                }
            }
            // if (__isFolder(absPath) && __isFile(`${absPath}/package.json`)) {
            //   const packageJson = require(`${absPath}/package.json`);
            //   // check exports if prefered over fields
            //   if (packageJson.exports !== undefined && set.preferExports) {
            //     return __exportsMatch(absPath, packageJson.exports, moduleName, {});
            //   }
            //   // check each fields one after the other
            //   for (let j = 0; j < set.fields.length; j++) {
            //     const field = set.fields[j];
            //     if (!packageJson[field]) continue;
            //     const filePath = __path.resolve(absPath, packageJson[field]);
            //     if (!__isFile(filePath)) continue;
            //     return filePath;
            //   }
            //   // check exports if not prefered over fields
            //   if (packageJson.exports !== undefined && !set.preferExports) {
            //   }
            // } else {
            //   // check extensions free path
            //   for (let j = 0; j < set.extensions.length; j++) {
            //     const ext = set.extensions[j];
            //     if (__isFile(`${absPath}.${ext}`)) {
            //       return `${absPath}.${ext}`;
            //     }
            //   }
            // }
            // nothing found
            throw new Error(`Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`);
        }
    });
}
exports.default = resolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBOEM7QUFDOUMsb0dBQThFO0FBRTlFLGdEQUEwQjtBQUMxQixzREFBa0M7QUFHbEMsOEVBQXdEO0FBQ3hELGtFQUE0QztBQUM1QyxrRUFBNEM7QUE2QjVDLFNBQThCLE9BQU8sQ0FDbkMsVUFBa0IsRUFDbEIsUUFBb0M7O1FBRXBDLE1BQU0sR0FBRyxHQUFxQixtQkFBVyxtQkFFbEMsa0NBQTBCLENBQUMsUUFBUSxFQUFFLEdBRTFDLFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztRQUVGLG1CQUFtQjtRQUNuQixNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQW9CLENBQUMsQ0FBQztRQUM5RCxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYztZQUN0RSxPQUFPLFVBQVUsQ0FBQztRQUVwQixzQkFBc0I7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsSUFBSSxhQUFxQixFQUN2QixrQkFBMEIsRUFDMUIsT0FBZSxFQUNmLFdBQWdCLENBQUM7WUFFbkIsMkNBQTJDO1lBQzNDLHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEMseUVBQXlFO2dCQUN6RSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVwQyxJQUNFLEtBQUssQ0FBQyxNQUFNLEtBQUss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