"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const ResolveSettingsInterface_1 = __importDefault(require("./interface/ResolveSettingsInterface"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_1 = __importDefault(require("../is/file"));
const buildInNodeModules_1 = __importDefault(require("./buildInNodeModules"));
const exportsMatch_1 = __importDefault(require("./exportsMatch"));
const existsSync_1 = __importDefault(require("../fs/existsSync"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
function resolve(moduleName, settings) {
    const set = deepMerge_1.default(Object.assign({}, ResolveSettingsInterface_1.default.defaults()), settings || {});
    // make sure we are in a node module package
    if (!fs_1.default.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
    }
    const rootPackageJson = require(`${set.rootDir}/package.json`);
    // // if is an absolute or relative path
    // if (moduleName.match(/^[\.\/]/)) {
    //   console.log('abs or relative path', moduleName);¨
    //   return moduleName;
    // }
    // build in modules
    const builtInModulesArray = Object.keys(buildInNodeModules_1.default);
    if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
        return moduleName;
    let requestedModuleDirPath, requestedModuleName, requestedInternalModulePath, absPath, requestedModulePackageJson;
    // check in packageJson dependencies
    const allDependencies = Object.assign(Object.assign({}, (rootPackageJson.dependencies || {})), (rootPackageJson.devDependencies || {}));
    for (let i = 0; i < Object.keys(allDependencies).length; i++) {
        const dep = Object.keys(allDependencies)[i];
        if (moduleName.slice(0, dep.length - 1)[0] === dep) {
            requestedModuleName = dep;
            break;
        }
    }
    // loop on directories
    if (!requestedModuleName) {
        for (let i = 0; i < set.dirs.length; i++) {
            const dirPath = set.dirs[i];
            // if moduleName starts with a "." or a "/"
            // this mean that we do not target a module in the "node_modules" folder
            if (!moduleName.match(/^[\.\/]/)) {
                // find the module directory by checking for the two first something/else
                const parts = moduleName.split('/');
                if (parts.length >= 1 &&
                    existsSync_1.default(path_1.default.resolve(dirPath, parts[0], 'package.json'))) {
                    requestedModulePackageJson = require(path_1.default.resolve(dirPath, parts[0], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                }
                else if (parts.length >= 2 &&
                    existsSync_1.default(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    requestedModulePackageJson = require(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0], parts[1]);
                    requestedInternalModulePath = parts.slice(2).join('/');
                }
            }
            else {
                // check if is a file in the dir using the extensions
                const filePath = checkPathWithMultipleExtensions_1.default(path_1.default.resolve(dirPath, moduleName), set.extensions);
                if (filePath)
                    return filePath;
                // check if the passed moduleName is a node module
                if (existsSync_1.default(path_1.default.resolve(dirPath, moduleName, 'package.json'))) {
                    requestedModulePackageJson = require(path_1.default.resolve(dirPath, moduleName, 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, moduleName);
                }
                else {
                    absPath = path_1.default.resolve(dirPath, moduleName);
                }
            }
        }
    }
    if (!requestedModuleName) {
        throw new Error(`[resolve] Sorry but the requested package "<yellow>${moduleName}</yellow>" se`);
    }
    // abs path
    // @ts-ignore
    if (absPath && file_1.default(absPath))
        return absPath;
    let depPath;
    if (rootPackageJson.dependencies &&
        rootPackageJson.dependencies[requestedModulePackageJson.name]) {
        depPath = rootPackageJson.dependencies[requestedModulePackageJson.name];
    }
    if (rootPackageJson.devDependencies &&
        rootPackageJson.devDependencies[requestedModulePackageJson.name]) {
        depPath = rootPackageJson.devDependencies[requestedModulePackageJson.name];
    }
    if (depPath && depPath.match(/^file:/)) {
        requestedModuleDirPath = path_1.default.resolve(set.rootDir, depPath.replace(/^file:/, ''));
    }
    // @ts-ignore
    if (requestedModulePackageJson && requestedModuleDirPath) {
        // if internal module path exists
        // @ts-ignore
        if (requestedInternalModulePath) {
            const potentialPath = checkPathWithMultipleExtensions_1.default(path_1.default.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
            if (potentialPath)
                return potentialPath;
        }
        // @ts-ignore
        function exportsMatch() {
            const matchPath = exportsMatch_1.default(requestedModuleDirPath, requestedModulePackageJson.exports, requestedInternalModulePath, {
                extensions: set.extensions,
                method: set.method,
                target: set.target
            });
            if (matchPath)
                return matchPath;
        }
        // exports field with an requestedInternalModulePath
        if (requestedModulePackageJson.exports !== undefined && set.preferExports) {
            const exportsRes = exportsMatch();
            if (exportsRes)
                return exportsRes;
        }
        // "fields" check
        for (let j = 0; j < set.fields.length; j++) {
            const field = set.fields[j];
            if (!requestedModulePackageJson[field])
                continue;
            const filePath = path_1.default.resolve(requestedModuleDirPath, requestedModulePackageJson[field]);
            if (!file_1.default(filePath))
                continue;
            return filePath;
        }
        // exports field with an requestedInternalModulePath
        if (requestedModulePackageJson.exports !== undefined &&
            !set.preferExports) {
            const exportsRes = exportsMatch();
            if (exportsRes)
                return exportsRes;
        }
    }
    // console.log('requestedModulePackageJson', requestedModulePackageJson);
    // console.log('requestedModuleName', requestedModuleName);
    // console.log('requestedInternalModulePath', requestedInternalModulePath);
    // console.log('requestedModuleDirPath', requestedModuleDirPath);
    // console.log('absPath', absPath);
    // nothing found
    throw new Error(`Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`);
}
exports.default = resolve;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL21vZHVsZS9yZXNvbHZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQThDO0FBQzlDLG9HQUE4RTtBQUM5RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNEQUFrQztBQUdsQyw4RUFBd0Q7QUFDeEQsa0VBQTRDO0FBQzVDLGtFQUE0QztBQUU1Qyw0R0FBc0Y7QUE0Q3RGLFNBQXdCLE9BQU8sQ0FDN0IsVUFBa0IsRUFDbEIsUUFBb0M7SUFFcEMsTUFBTSxHQUFHLEdBQXFCLG1CQUFXLG1CQUVsQyxrQ0FBMEIsQ0FBQyxRQUFRLEVBQUUsR0FFMUMsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUFDO0lBRUYsNENBQTRDO0lBQzVDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7UUFDbkQsTUFBTSxJQUFJLEtBQUssQ0FDYiwwSkFBMEosQ0FDM0osQ0FBQztLQUNIO0lBRUQsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sZUFBZSxDQUFDLENBQUM7SUFFL0Qsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxzREFBc0Q7SUFDdEQsdUJBQXVCO0lBQ3ZCLElBQUk7SUFFSixtQkFBbUI7SUFDbkIsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUFvQixDQUFDLENBQUM7SUFDOUQsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWM7UUFDdEUsT0FBTyxVQUFVLENBQUM7SUFFcEIsSUFBSSxzQkFBOEIsRUFDaEMsbUJBQXVDLEVBQ3ZDLDJCQUFtQyxFQUNuQyxPQUFlLEVBQ2YsMEJBQStCLENBQUM7SUFFbEMsb0NBQW9DO0lBQ3BDLE1BQU0s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