import __deepMerge from '../../shared/object/deepMerge';
import __ResolveSettingsInterface from './interface/ResolveSettingsInterface';
import __fs from 'fs';
import __path from 'path';
import __isFile from '../is/file';
import __builtInNodeModules from './buildInNodeModules';
import __exportsMatch from './exportsMatch';
import __existsSync from '../fs/existsSync';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';
export default function resolve(moduleName, settings) {
    const set = __deepMerge(Object.assign({}, __ResolveSettingsInterface.defaults()), settings || {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc29sdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sY0FBYyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8saUNBQWlDLE1BQU0sdUNBQXVDLENBQUM7QUE0Q3RGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUM3QixVQUFrQixFQUNsQixRQUFvQztJQUVwQyxNQUFNLEdBQUcsR0FBcUIsV0FBVyxtQkFFbEMsMEJBQTBCLENBQUMsUUFBUSxFQUFFLEdBRTFDLFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FBQztJQUVGLDRDQUE0QztJQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ2IsMEpBQTBKLENBQzNKLENBQUM7S0FDSDtJQUVELE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxDQUFDO0lBRS9ELHdDQUF3QztJQUN4QyxxQ0FBcUM7SUFDckMsc0RBQXNEO0lBQ3RELHVCQUF1QjtJQUN2QixJQUFJO0lBRUosbUJBQW1CO0lBQ25CLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzlELElBQUksbUJBQW1CLENBQUMsT0FBTyxDQUFD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