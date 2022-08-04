"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveSettingsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
const existsSync_1 = __importDefault(require("../fs/existsSync"));
const file_1 = __importDefault(require("../is/file"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
const buildInNodeModules_1 = __importDefault(require("./buildInNodeModules"));
const exportsMatch_1 = __importDefault(require("./exportsMatch"));
/**
 * @name            resolve
 * @namespace            node.module
 * @type            Function
 * @platform        node
 * @status          wip
 *
 * This function take as parameter a module path to resolve and returns back the
 * correct path to this module. It check for package.json file and fields like "main", "module", etc...
 *
 * @feature     Main entry point export     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath exports     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath patterns      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditional exports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Nested conditions       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditions Definitions      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 *
 * @todo        Nested node_modules
 * @todo        Exports sugar         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath folder mappings         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath imports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 *
 * @param       {String}        module          The module to resolve
 * @param       {IResolveSettings}      [settings={}]       Some settings to configure your resolve process
 * @return      {String}                                The path to the module to actually load
 *
 * @example         js
 * import resolve from '@coffeekraken/sugar/node/module/resolve';
 * resolve('@coffeekraken/sugar'); // => /something/node_modules/@coffeekraken/sugar/index.js
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class ResolveSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            dirs: {
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('module.resolve.dirs'),
            },
            extensions: {
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('module.resolve.extensions'),
            },
            fields: {
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('module.resolve.fields'),
            },
            buildInModules: {
                type: 'Boolean',
                default: s_sugar_config_1.default.get('module.resolve.builtInModules'),
            },
            preferExports: {
                type: 'Boolean',
                default: s_sugar_config_1.default.get('module.resolve.preferExports'),
            },
            method: {
                type: 'String',
                values: ['import', 'require'],
                default: s_sugar_config_1.default.get('module.resolve.method'),
            },
            target: {
                type: 'String',
                values: ['node', 'default'],
                default: s_sugar_config_1.default.get('module.resolve.target'),
            },
            rootDir: {
                type: 'String',
                default: (0, packageRootDir_1.default)(),
            },
        };
    }
}
exports.ResolveSettingsInterface = ResolveSettingsInterface;
function resolve(moduleName, settings) {
    const set = (0, deepMerge_1.default)(Object.assign({}, ResolveSettingsInterface.defaults()), settings || {});
    console.log(set);
    // make sure we are in a node module package
    if (!fs_1.default.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
    }
    const rootPackageJson = (0, readJsonSync_1.default)(`${set.rootDir}/package.json`);
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
                    (0, existsSync_1.default)(path_1.default.resolve(dirPath, parts[0], 'package.json'))) {
                    requestedModulePackageJson = (0, readJsonSync_1.default)(path_1.default.resolve(dirPath, parts[0], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                }
                else if (parts.length >= 2 &&
                    (0, existsSync_1.default)(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    requestedModulePackageJson = (0, readJsonSync_1.default)(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0], parts[1]);
                    requestedInternalModulePath = parts.slice(2).join('/');
                }
            }
            else {
                // check if is a file in the dir using the extensions
                const filePath = (0, checkPathWithMultipleExtensions_1.default)(path_1.default.resolve(dirPath, moduleName), set.extensions);
                if (filePath)
                    return filePath;
                // check if the passed moduleName is a node module
                if ((0, existsSync_1.default)(path_1.default.resolve(dirPath, moduleName, 'package.json'))) {
                    requestedModulePackageJson = (0, readJsonSync_1.default)(path_1.default.resolve(dirPath, moduleName, 'package.json'));
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
    if (absPath && (0, file_1.default)(absPath))
        return absPath;
    let depPath;
    if (rootPackageJson.dependencies &&
        rootPackageJson.dependencies[requestedModulePackageJson.name]) {
        depPath = rootPackageJson.dependencies[requestedModulePackageJson.name];
    }
    if (rootPackageJson.devDependencies &&
        rootPackageJson.devDependencies[requestedModulePackageJson.name]) {
        depPath =
            rootPackageJson.devDependencies[requestedModulePackageJson.name];
    }
    if (depPath && depPath.match(/^file:/)) {
        requestedModuleDirPath = path_1.default.resolve(set.rootDir, depPath.replace(/^file:/, ''));
    }
    // @ts-ignore
    if (requestedModulePackageJson && requestedModuleDirPath) {
        // if internal module path exists
        // @ts-ignore
        if (requestedInternalModulePath) {
            const potentialPath = (0, checkPathWithMultipleExtensions_1.default)(path_1.default.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
            if (potentialPath)
                return potentialPath;
        }
        // @ts-ignore
        function exportsMatch() {
            const matchPath = (0, exportsMatch_1.default)(requestedModuleDirPath, requestedModulePackageJson.exports, requestedInternalModulePath, {
                extensions: set.extensions,
                method: set.method,
                target: set.target,
            });
            if (matchPath)
                return matchPath;
        }
        // exports field with an requestedInternalModulePath
        if (requestedModulePackageJson.exports !== undefined &&
            set.preferExports) {
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
            if (!(0, file_1.default)(filePath))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFDMUQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsOEVBQXdEO0FBQ3hELDRHQUFzRjtBQUN0RixrRUFBNEM7QUFDNUMsc0RBQWtDO0FBQ2xDLDRFQUFzRDtBQUN0RCw4RUFBd0Q7QUFDeEQsa0VBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQWEsd0JBQXlCLFNBQVEscUJBQVk7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7YUFDM0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RDtZQUNELGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDL0Q7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDO2FBQzlEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQzdC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