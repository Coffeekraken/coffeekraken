"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveSettingsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const fs_3 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
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
    if (!fs_2.default.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
    }
    const rootPackageJson = (0, fs_1.__readJsonSync)(`${set.rootDir}/package.json`);
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
                    (0, fs_3.__existsSync)(path_1.default.resolve(dirPath, parts[0], 'package.json'))) {
                    requestedModulePackageJson = (0, fs_1.__readJsonSync)(path_1.default.resolve(dirPath, parts[0], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                }
                else if (parts.length >= 2 &&
                    (0, fs_3.__existsSync)(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    requestedModulePackageJson = (0, fs_1.__readJsonSync)(path_1.default.resolve(dirPath, parts[0], parts[1], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = path_1.default.resolve(dirPath, parts[0], parts[1]);
                    requestedInternalModulePath = parts.slice(2).join('/');
                }
            }
            else {
                // check if is a file in the dir using the extensions
                const filePath = (0, fs_3.__checkPathWithMultipleExtensions)(path_1.default.resolve(dirPath, moduleName), set.extensions);
                if (filePath)
                    return filePath;
                // check if the passed moduleName is a node module
                if ((0, fs_3.__existsSync)(path_1.default.resolve(dirPath, moduleName, 'package.json'))) {
                    requestedModulePackageJson = (0, fs_1.__readJsonSync)(path_1.default.resolve(dirPath, moduleName, 'package.json'));
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
    if (absPath && (0, is_1.__isFile)(absPath))
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
            const potentialPath = (0, fs_3.__checkPathWithMultipleExtensions)(path_1.default.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
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
            if (!(0, is_1.__isFile)(filePath))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFDMUQsK0NBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsOEVBQXdEO0FBQ3hELCtDQUF5RjtBQUN6RiwrQ0FBa0Q7QUFDbEQsNEVBQXNEO0FBQ3RELDhFQUF3RDtBQUN4RCxrRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBRUgsTUFBYSx3QkFBeUIsU0FBUSxxQkFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQzthQUMzRDtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUMvRDtZQUNELGFBQWEsRUFBRTtnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDOUQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7Z0JBQzNCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN2RDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBQSx3QkFBZ0IsR0FBRTthQUM5QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2Q0QsNERBdUNDO0FBYUQsU0FBd0IsT0FBTyxDQUMzQixVQUFrQixFQUNsQixRQUFvQztJQUVwQyxNQUFNLEdBQUcsR0FBcUIsSUFBQSxtQkFBVyxvQkFFOUIsd0JBQXdCLENBQUMsUUFBUSxFQUFFLEdBRTFDLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLDRDQUE0QztJQUM1QyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQ1gsMEpBQTBKLENBQzdKLENBQUM7S0FDTDtJQUVELE1BQU0sZUFBZSxHQUFHLElBQUEsbUJBQWMsRUFBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxDQUFDO0lBRXRFLHdDQUF3QztJQUN4QyxxQ0FBcUM7SUFDckMsc0RBQXNEO0lBQ3RELHVCQUF1QjtJQUN2QixJQUFJO0lBRUosbUJBQW1CO0lBQ25CLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBb0IsQ0FBQyxDQUFDO0lBQzlELElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxjQUFjO1FBQ3BFLE9BQU8sVUFBVSxDQUFDO0lBRXRCLElBQUksc0JBQThCLEVBQzlCLG1CQUF1QyxFQUN2QywyQkFBbUMsRUFDbkMsT0FBZSxFQUNmLDBCQUErQixDQUFDO0lBRXBDLG9DQUFvQztJQUNwQyxNQUFNLGVBQWUsbUNBQ2QsQ0FBQyxlQUFlLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxHQUNwQyxDQUFDLGVBQWUsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQzdDLENBQUM7SUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ2hELG1CQUFtQixHQUFHLEdBQUcsQ0FBQztZQUMxQixNQUFNO1NBQ1Q7S0FDSjtJQUVELHNCQUFzQjtJQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsMkNBQTJDO1lBQzNDLHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUIseUVBQXlFO2dCQUN6RSxNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVwQyxJQUNJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztvQkFDakIsSUFBQSxpQkFBWSxFQUNSLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FDcEQsRUFDSDtvQkFDRSwwQkFBMEIsR0FBRyxJQUFBLG1CQUFjLEVBQ3ZDLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FDcEQsQ0FBQztvQkFFRixtQkFBbUIsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7b0JBQ3RELHNCQUFzQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzRCwyQkFBMkIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUQ7cUJBQU0sSUFDSCxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUM7b0JBQ2pCLElBQUEsaUJBQVksRUFDUixjQUFNLENBQUMsT0FBTyxDQUNWLE9BQU8sRUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNSLGNBQWMsQ0FDakIsQ0FDSixFQUNIO29CQUNFLDBCQUEwQixHQUFHLElBQUEsbUJBQWMsRUFDdkMsY0FBTSxDQUFDLE9BQU8sQ0FDVixPQUFPLEVBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNSLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixjQUFjLENBQ2pCLENBQ0osQ0FBQztvQkFDRixtQkFBbUIsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7b0JBQ3RELHNCQUFzQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ25DLE9BQU8sRUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUM7b0JBQ0YsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFEO2FBQ0o7aUJBQU07Z0JBQ0gscURBQXFEO2dCQUNyRCxNQUFNLFFBQVEsR0FBRyxJQUFBLHNDQUFpQyxFQUM5QyxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFDbkMsR0FBRyxDQUFDLFVBQVUsQ0FDakIsQ0FBQztnQkFDRixJQUFJLFFBQVE7b0JBQUUsT0FBTyxRQUFRLENBQUM7Z0JBRTlCLGtEQUFrRDtnQkFDbEQsSUFDSSxJQUFBLGlCQUFZLEVBQ1IsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUN0RCxFQUNIO29CQUNFLDBCQUEwQixHQUFHLElBQUEsbUJBQWMsRUFDdkMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUN0RCxDQUFDO29CQUNGLG1CQUFtQixHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQztvQkFDdEQsc0JBQXNCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDbkMsT0FBTyxFQUNQLFVBQVUsQ0FDYixDQUFDO2lCQUNMO3FCQUFNO29CQUNILE9BQU8sR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDakQ7YUFDSjtTQUNKO0tBQ0o7SUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7UUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxzREFBc0QsVUFBVSxlQUFlLENBQ2xGLENBQUM7S0FDTDtJQUVELFdBQVc7SUFDWCxhQUFhO0lBQ2IsSUFBSSxPQUFPLElBQUksSUFBQSxhQUFRLEVBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFFakQsSUFBSSxPQUFPLENBQUM7SUFDWixJQUNJLGVBQWUsQ0FBQyxZQUFZO1FBQzVCLGVBQWUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQy9EO1FBQ0UsT0FBTyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0U7SUFDRCxJQUNJLGVBQWUsQ0FBQyxlQUFlO1FBQy9CLGVBQWUsQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEVBQ2xFO1FBQ0UsT0FBTztZQUNILGVBQWUsQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEU7SUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLHNCQUFzQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ25DLEdBQUcsQ0FBQyxPQUFPLEVBQ1gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQ2hDLENBQUM7S0FDTDtJQUVELGFBQWE7SUFDYixJQUFJLDBCQUEwQixJQUFJLHNCQUFzQixFQUFFO1FBQ3RELGlDQUFpQztRQUNqQyxhQUFhO1FBQ2IsSUFBSSwyQkFBMkIsRUFBRTtZQUM3QixNQUFNLGFBQWEsR0FBRyxJQUFBLHNDQUFpQyxFQUNuRCxjQUFNLENBQUMsT0FBTyxDQUNWLHNCQUFzQixFQUN0QiwyQkFBMkIsQ0FDOUIsRUFDRCxHQUFHLENBQUMsVUFBVSxDQUNqQixDQUFDO1lBQ0YsSUFBSSxhQUFhO2dCQUFFLE9BQU8sYUFBYSxDQUFDO1NBQzNDO1FBRUQsYUFBYTtRQUNiLFNBQVMsWUFBWTtZQUNqQixNQUFNLFNBQVMsR0FBRyxJQUFBLHNCQUFjLEVBQzVCLHNCQUFzQixFQUN0QiwwQkFBMEIsQ0FBQyxPQUFPLEVBQ2xDLDJCQUEyQixFQUMzQjtnQkFDSSxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVU7Z0JBQzFCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtnQkFDbEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2FBQ3JCLENBQ0osQ0FBQztZQUNGLElBQUksU0FBUztnQkFBRSxPQUFPLFNBQVMsQ0FBQztRQUNwQyxDQUFDO1FBRUQsb0RBQW9EO1FBQ3BELElBQ0ksMEJBQTBCLENBQUMsT0FBTyxLQUFLLFNBQVM7WUFDaEQsR0FBRyxDQUFDLGFBQWEsRUFDbkI7WUFDRSxNQUFNLFVBQVUsR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUNsQyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxVQUFVLENBQUM7U0FDckM7UUFFRCxpQkFBaUI7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQUssQ0FBQztnQkFBRSxTQUFTO1lBQ2pELE1BQU0sUUFBUSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzNCLHNCQUFzQixFQUN0QiwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FDcEMsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFBLGFBQVEsRUFBQyxRQUFRLENBQUM7Z0JBQUUsU0FBUztZQUNsQyxPQUFPLFFBQVEsQ0FBQztTQUNuQjtRQUVELG9EQUFvRDtRQUNwRCxJQUNJLDBCQUEwQixDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQ2hELENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDcEI7WUFDRSxNQUFNLFVBQVUsR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUNsQyxJQUFJLFVBQVU7Z0JBQUUsT0FBTyxVQUFVLENBQUM7U0FDckM7S0FDSjtJQUVELHlFQUF5RTtJQUN6RSwyREFBMkQ7SUFDM0QsMkVBQTJFO0lBQzNFLGlFQUFpRTtJQUNqRSxtQ0FBbUM7SUFFbkMsZ0JBQWdCO0lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkNBQTJDLFVBQVUsNENBQTRDLENBQ3BHLENBQUM7QUFDTixDQUFDO0FBMU9ELDBCQTBPQyJ9