import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../../shared/object/deepMerge';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';
import __existsSync from '../fs/existsSync';
import __isFile from '../is/file';
import __packageRootDir from '../path/packageRootDir';
import __builtInNodeModules from './buildInNodeModules';
import __exportsMatch from './exportsMatch';
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
export class ResolveSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            dirs: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.dirs'),
            },
            extensions: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.extensions'),
            },
            fields: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.fields'),
            },
            buildInModules: {
                type: 'Boolean',
                default: __SSugarConfig.get('module.resolve.builtInModules'),
            },
            preferExports: {
                type: 'Boolean',
                default: __SSugarConfig.get('module.resolve.preferExports'),
            },
            method: {
                type: 'String',
                values: ['import', 'require'],
                default: __SSugarConfig.get('module.resolve.method'),
            },
            target: {
                type: 'String',
                values: ['node', 'default'],
                default: __SSugarConfig.get('module.resolve.target'),
            },
            rootDir: {
                type: 'String',
                default: __packageRootDir(),
            },
        };
    }
}
export default function resolve(moduleName, settings) {
    const set = __deepMerge(Object.assign({}, ResolveSettingsInterface.defaults()), settings || {});
    console.log(set);
    // make sure we are in a node module package
    if (!__fs.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
    }
    const rootPackageJson = __readJsonSync(`${set.rootDir}/package.json`);
    // // if is an absolute or relative path
    // if (moduleName.match(/^[\.\/]/)) {
    //   console.log('abs or relative path', moduleName);¨
    //   return moduleName;
    // }
    // build in modules
    const builtInModulesArray = Object.keys(__builtInNodeModules);
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
                    __existsSync(__path.resolve(dirPath, parts[0], 'package.json'))) {
                    requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, parts[0], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                }
                else if (parts.length >= 2 &&
                    __existsSync(__path.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, parts[0], parts[1], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(dirPath, parts[0], parts[1]);
                    requestedInternalModulePath = parts.slice(2).join('/');
                }
            }
            else {
                // check if is a file in the dir using the extensions
                const filePath = __checkPathWithMultipleExtensions(__path.resolve(dirPath, moduleName), set.extensions);
                if (filePath)
                    return filePath;
                // check if the passed moduleName is a node module
                if (__existsSync(__path.resolve(dirPath, moduleName, 'package.json'))) {
                    requestedModulePackageJson = __readJsonSync(__path.resolve(dirPath, moduleName, 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(dirPath, moduleName);
                }
                else {
                    absPath = __path.resolve(dirPath, moduleName);
                }
            }
        }
    }
    if (!requestedModuleName) {
        throw new Error(`[resolve] Sorry but the requested package "<yellow>${moduleName}</yellow>" se`);
    }
    // abs path
    // @ts-ignore
    if (absPath && __isFile(absPath))
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
        requestedModuleDirPath = __path.resolve(set.rootDir, depPath.replace(/^file:/, ''));
    }
    // @ts-ignore
    if (requestedModulePackageJson && requestedModuleDirPath) {
        // if internal module path exists
        // @ts-ignore
        if (requestedInternalModulePath) {
            const potentialPath = __checkPathWithMultipleExtensions(__path.resolve(requestedModuleDirPath, requestedInternalModulePath), set.extensions);
            if (potentialPath)
                return potentialPath;
        }
        // @ts-ignore
        function exportsMatch() {
            const matchPath = __exportsMatch(requestedModuleDirPath, requestedModulePackageJson.exports, requestedInternalModulePath, {
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
            const filePath = __path.resolve(requestedModuleDirPath, requestedModulePackageJson[field]);
            if (!__isFile(filePath))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxpQ0FBaUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN0RixPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFDbEMsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxZQUFZO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQzthQUMzRDtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDdkQ7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osSUFBSSxFQUFF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