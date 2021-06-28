import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
 * @platform        ts
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class ResolveSettingsInterface extends __SInterface {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: __SugarConfig.get('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: __SugarConfig.get('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: __SugarConfig.get('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: __SugarConfig.get('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: __SugarConfig.get('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: __SugarConfig.get('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: __SugarConfig.get('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: __packageRootDir()
    }
};
export default function resolve(moduleName, settings) {
    const set = __deepMerge(Object.assign({}, ResolveSettingsInterface.defaults()), settings || {});
    // make sure we are in a node module package
    if (!__fs.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(`[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`);
    }
    const rootPackageJson = require(`${set.rootDir}/package.json`);
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
                    requestedModulePackageJson = require(__path.resolve(dirPath, parts[0], 'package.json'));
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                }
                else if (parts.length >= 2 &&
                    __existsSync(__path.resolve(dirPath, parts[0], parts[1], 'package.json'))) {
                    requestedModulePackageJson = require(__path.resolve(dirPath, parts[0], parts[1], 'package.json'));
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
                    requestedModulePackageJson = require(__path.resolve(dirPath, moduleName, 'package.json'));
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
        depPath = rootPackageJson.devDependencies[requestedModulePackageJson.name];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLGlDQUFpQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RGLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxZQUFZOztBQUNqRCxtQ0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0tBQ2xEO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7S0FDeEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUNwRDtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsK0JBQStCLENB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