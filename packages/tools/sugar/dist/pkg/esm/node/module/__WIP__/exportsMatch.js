import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __minimatch from 'minimatch';
import __path from 'path';
import __isNode from '../../shared/is/node';
import __isPlainObject from '../../shared/is/plainObject';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';
import __extension from '../fs/extension';
export default function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', target: __isNode() ? 'node' : 'default', 
        // @ts-ignore
        extensions: __SugarConfig.get('module.resolve.extensions') }, (settings || {}));
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
            if (set.method === 'import' &&
                modulesSubpaths.import !== undefined) {
                modulesSubpaths = modulesSubpaths.import;
            }
            else if (modulesSubpaths.require) {
                modulesSubpaths = modulesSubpaths.require;
            }
        }
        if (__isPlainObject(modulesSubpaths)) {
            // check if a key match
            for (const key in modulesSubpaths) {
                if (__minimatch(modulePath, key.replace(/^\.\//, ''))) {
                    // console.log('MATCH', modulePath, key);
                    const matchStr = key
                        .replace(/^\.\//, '')
                        .replace(/\/\*$/, '');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sUUFBUSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sZUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8saUNBQWlDLE1BQU0sdUNBQXVDLENBQUM7QUFDdEYsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUM7QUE4QjFDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUNoQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDTCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN2QyxhQUFhO1FBQ2IsVUFBVSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsSUFDdkQsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsTUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFL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