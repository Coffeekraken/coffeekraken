import __minimatch from 'minimatch';
import __isNode from '../../shared/is/node';
import __isPlainObject from '../../shared/is/plainObject';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __path from 'path';
import __extension from '../fs/extension';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';
export default function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', target: __isNode() ? 'node' : 'default', 
        // @ts-ignore
        extensions: __sugarConfig('module.resolve.extensions') }, (settings || {}));
    // loop on exports keys
    const keys = Object.keys(exportsObj);
    if (keys.indexOf('node') !== -1 || keys.indexOf('default') !== -1) {
        if (keys.length > 2)
            throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "node" and "default" at the same level...`);
    }
    if (keys.indexOf('require') !== -1 || keys.indexOf('import') !== -1) {
        if (keys.length > 2)
            throw new Error(`Your "exports" field in the "<yellow>${packageDir}/package.json</yellow>" file seems to be invalid. You cannot have any other keys than "require" and "import" at the same level...`);
    }
    let founded = false;
    while (!founded) {
        if (Object.keys(modulesSubpaths).indexOf('node') !== -1 ||
            Object.keys(modulesSubpaths).indexOf('default') !== -1) {
            // check "node" and "default" keys
            if (set.target === 'node' && modulesSubpaths.node !== undefined) {
                modulesSubpaths = modulesSubpaths.node;
            }
            else if (modulesSubpaths.default) {
                modulesSubpaths = modulesSubpaths.default;
            }
        }
        if (Object.keys(modulesSubpaths).indexOf('import') !== -1 ||
            Object.keys(modulesSubpaths).indexOf('require') !== -1) {
            // check "import" and "require" method
            if (set.method === 'import' && modulesSubpaths.import !== undefined) {
                modulesSubpaths = modulesSubpaths.import;
            }
            else if (modulesSubpaths.require) {
                modulesSubpaths = modulesSubpaths.require;
            }
        }
        if (__isPlainObject(modulesSubpaths)) {
            // check if a key match
            for (let key in modulesSubpaths) {
                if (__minimatch(modulePath, key.replace(/^\.\//, ''))) {
                    // console.log('MATCH', modulePath, key);
                    const matchStr = key.replace(/^\.\//, '').replace(/\/\*$/, '');
                    const modulePathExt = __extension(modulePath);
                    const internalPackageSubPathExt = __extension(modulesSubpaths[key]);
                    // check extension match
                    if (internalPackageSubPathExt &&
                        modulePathExt &&
                        internalPackageSubPathExt !== modulePathExt)
                        continue;
                    const internalPath = modulesSubpaths[key]
                        .replace(/^\.\//, '')
                        .replace(/\/\*(\.[a-zA-Z0-9]+)?/, '');
                    const realPath = modulePath
                        .replace(`${matchStr}/`, '')
                        .replace(matchStr, '');
                    let potentialPath;
                    // check if a file exists
                    if (internalPackageSubPathExt) {
                        const potentialPathArray = [packageDir];
                        if (internalPath && internalPath.trim() !== '')
                            potentialPathArray.push(internalPath);
                        if (realPath && realPath.trim() !== '')
                            potentialPathArray.push(realPath);
                        potentialPath = potentialPathArray.join('/');
                        if (!modulePathExt)
                            potentialPath += `.${internalPackageSubPathExt}`;
                    }
                    else {
                        // if modulePath has extension
                        const potentialPathArray = [packageDir];
                        if (internalPath && internalPath.trim() !== '')
                            potentialPathArray.push(internalPath);
                        if (realPath && realPath.trim() !== '')
                            potentialPathArray.push(realPath);
                        potentialPath = potentialPathArray.join('/');
                        // try to get a file that correspond to this path
                        potentialPath = __checkPathWithMultipleExtensions(potentialPath, set.extensions);
                    }
                    if (!potentialPath)
                        return undefined;
                    // check if the potential image exists and return it
                    if (__fs.existsSync(potentialPath))
                        return potentialPath;
                    modulesSubpaths = matchStr;
                    break;
                }
            }
        }
        // check if we have finished checking these fields
        if ((modulesSubpaths.node === undefined &&
            modulesSubpaths.default === undefined &&
            modulesSubpaths.import === undefined &&
            modulesSubpaths.require === undefined) ||
            !__isPlainObject(modulesSubpaths)) {
            founded = true;
        }
    }
    if (typeof modulesSubpaths === 'string') {
        const potentialPath = __path.resolve(packageDir, modulesSubpaths);
        // check is the file exists inside the package
        if (__fs.existsSync(potentialPath))
            return potentialPath;
    }
    // nothing has been found so we return undefined
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0c01hdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0c01hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLGVBQWUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8saUNBQWlDLE1BQU0sdUNBQXVDLENBQUM7QUE0QnRGLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNsQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN2QyxhQUFhO1FBQ2IsVUFBVSxFQUFFLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxJQUNuRCxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLHVCQUF1QjtJQUN2QixNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxL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