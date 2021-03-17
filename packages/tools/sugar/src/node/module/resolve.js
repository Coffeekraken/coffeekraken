"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../shared/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFDckQsb0dBQThFO0FBQzlFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0RBQWtDO0FBR2xDLDhFQUF3RDtBQUN4RCxrRUFBNEM7QUFDNUMsa0VBQTRDO0FBRTVDLDRHQUFzRjtBQTRDdEYsU0FBd0IsT0FBTyxDQUM3QixVQUFrQixFQUNsQixRQUFvQztJQUVwQyxNQUFNLEdBQUcsR0FBcUIsbUJBQVcsbUJBRWxDLGtDQUEwQixDQUFDLFFBQVEsRUFBRSxHQUUxQyxRQUFRLElBQUksRUFBRSxDQUNmLENBQUM7SUFFRiw0Q0FBNEM7SUFDNUMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxlQUFlLENBQUMsRUFBRTtRQUNuRCxNQUFNLElBQUksS0FBSyxDQUNiLDBKQUEwSixDQUMzSixDQUFDO0tBQ0g7SUFFRCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxlQUFlLENBQUMsQ0FBQztJQUUvRCx3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLHNEQUFzRDtJQUN0RCx1QkFBdUI7SUFDdkIsSUFBSTtJQUVKLG1CQUFtQjtJQUNuQixNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUM5RCxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsY0FBYztRQUN0RSxPQUFPLFVBQVUsQ0FBQztJQUVwQixJQUFJLHNCQUE4QixFQUNoQyxtQkFBdUMsRUFDdkMsMkJBQW1DLEVBQ25DLE9BQWUsRUFDZiwwQkFBK0IsQ0FBQztJQUVsQyxvQ0FBb0M7SUFDcEMsTUFBTSxlQUFlLG1DQUNoQixDQUFDLGVBQWUsQ0FB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