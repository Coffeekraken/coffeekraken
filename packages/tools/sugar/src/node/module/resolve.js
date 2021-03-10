"use strict";
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
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
function resolve(moduleName, settings) {
    const set = deepMerge_1.default(Object.assign({}, ResolveSettingsInterface_1.default.defaults()), settings || {});
    // build in modules
    const builtInModulesArray = Object.keys(buildInNodeModules_1.default);
    if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
        return moduleName;
    let moduleDirPath, internalModulePath, absPath, packageJson;
    // loop on directories
    for (let i = 0; i < set.dirs.length; i++) {
        const dirPath = set.dirs[i];
        // if moduleName starts with a "." or a "/"
        // this mean that we do not target a module in the "node_modules" folder
        if (!moduleName.match(/^[\.\/]/)) {
            // find the module directory by checking for the two first something/else
            const parts = moduleName.split('/');
            if (parts.length >= 1 &&
                existsSync_1.default(path_1.default.resolve(dirPath, parts[0], 'package.json'))) {
                packageJson = require(path_1.default.resolve(dirPath, parts[0], 'package.json'));
                moduleDirPath = path_1.default.resolve(dirPath, parts[0]);
                internalModulePath = parts.slice(1).join('/');
            }
            else if (parts.length >= 2 &&
                existsSync_1.default(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                packageJson = require(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'));
                moduleDirPath = path_1.default.resolve(dirPath, parts[0], parts[1]);
                internalModulePath = parts.slice(2).join('/');
            }
        }
        else {
            // check if is a file in the dir using the extensions
            const filePath = checkPathWithMultipleExtensions_1.default(path_1.default.resolve(dirPath, moduleName), set.extensions);
            if (filePath)
                return filePath;
            // check if the passed moduleName is a node module
            if (existsSync_1.default(path_1.default.resolve(dirPath, moduleName, 'package.json'))) {
                packageJson = require(path_1.default.resolve(dirPath, moduleName, 'package.json'));
                moduleDirPath = path_1.default.resolve(dirPath, moduleName);
            }
            else {
                absPath = path_1.default.resolve(dirPath, moduleName);
            }
        }
    }
    // abs path
    if (absPath && file_1.default(absPath))
        return absPath;
    if (packageJson && moduleDirPath) {
        function exportsMatch() {
            const matchPath = exportsMatch_1.default(moduleDirPath, packageJson.exports, internalModulePath, {
                extensions: set.extensions,
                method: set.method,
                target: set.target
            });
            if (matchPath)
                return matchPath;
        }
        // exports field with an internalModulePath
        if (packageJson.exports !== undefined && set.preferExports) {
            const exportsRes = exportsMatch();
            if (exportsRes)
                return exportsRes;
        }
        // "fields" check
        for (let j = 0; j < set.fields.length; j++) {
            const field = set.fields[j];
            if (!packageJson[field])
                continue;
            const filePath = path_1.default.resolve(moduleDirPath, packageJson[field]);
            if (!file_1.default(filePath))
                continue;
            return filePath;
        }
        // exports field with an internalModulePath
        if (packageJson.exports !== undefined && !set.preferExports) {
            const exportsRes = exportsMatch();
            if (exportsRes)
                return exportsRes;
        }
    }
    // console.log('packageJson', packageJson);
    // console.log('internalModulePath', internalModulePath);
    // console.log('moduleDirPath', moduleDirPath);
    // console.log('absPath', absPath);
    // nothing found
    throw new Error(`Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`);
}
exports.default = resolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBOEM7QUFDOUMsb0dBQThFO0FBRTlFLGdEQUEwQjtBQUMxQixzREFBa0M7QUFHbEMsOEVBQXdEO0FBQ3hELGtFQUE0QztBQUM1QyxrRUFBNEM7QUFFNUMsNEdBQXNGO0FBMEN0RixTQUF3QixPQUFPLENBQzdCLFVBQWtCLEVBQ2xCLFFBQW9DO0lBRXBDLE1BQU0sR0FBRyxHQUFxQixtQkFBVyxtQkFFbEMsa0NBQTBCLENBQUMsUUFBUSxFQUFFLEdBRTFDLFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLG1CQUFtQjtJQUNuQixNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUM5RCxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYztRQUN0RSxPQUFPLFVBQVUsQ0FBQztJQUVwQixJQUFJLGFBQXFCLEVBQ3ZCLGtCQUEwQixFQUMxQixPQUFlLEVBQ2YsV0FBZ0IsQ0FBQztJQUVuQixzQkFBc0I7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsMkNBQTJDO1FBQzNDLHdFQUF3RTtRQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyx5RUFBeUU7WUFDekUsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVwQyxJQUNFLEtBQUssQ0FBQyxNQUFNLElBQUks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