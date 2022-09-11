import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __minimatch from 'minimatch';
import __path from 'path';
import __isNode from '../../shared/is/node';
import __isPlainObject from '../../shared/is/plainObject';
import { __checkPathWithMultipleExtensions, __extension } from '@coffeekraken/sugar/fs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sUUFBUSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sZUFBZSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQThCeEYsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLFVBQWtCLEVBQ2xCLFVBQWUsRUFDZixVQUFrQixFQUNsQixRQUF5QztJQUV6QyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFFakMsTUFBTSxHQUFHLG1CQUNMLE1BQU0sRUFBRSxRQUFRLEVBQ2hCLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3ZDLGFBQWE7UUFDYixVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxJQUN2RCxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLHVCQUF1QjtJQUN2QixNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCx3Q0FBd0MsVUFBVSxpSUFBaUksQ0FDdEwsQ0FBQztLQUNUO0lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDZixNQUFNLElBQUksS0FBSyxDQUNYLHdDQUF3QyxVQUFVLG1JQUFtSSxDQUN4TCxDQUFDO0tBQ1Q7SUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNiLElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN4RDtZQUNFLGtDQUFrQztZQUNsQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLGVBQWUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUM3RCxlQUFlLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQzthQUMxQztpQkFBTSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hDLGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQzdDO1NBQ0o7UUFDRCxJQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDeEQ7WUFDRSxzQ0FBc0M7WUFDdEMsSUFDSSxHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVE7Z0JBQ3ZCLGVBQWUsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUN0QztnQkFDRSxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQzthQUM1QztpQkFBTSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hDLGVBQWUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO2FBQzdDO1NBQ0o7UUFDRCxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNsQyx1QkFBdUI7WUFDdkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUU7Z0JBQy9CLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUNuRCx5Q0FBeUM7b0JBQ3pDLE1BQU0sUUFBUSxHQUFHLEdBQUc7eUJBQ2YsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7eUJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRTFCLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDOUMsTUFBTSx5QkFBeUIsR0FBRyxXQUFXLENBQ3pDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FDdkIsQ0FBQztvQkFFRix3QkFBd0I7b0JBQ3hCLElBQ0kseUJBQXlCO3dCQUN6QixhQUFhO3dCQUNiLHlCQUF5QixLQUFLLGFBQWE7d0JBRTNDLFNBQVM7b0JBRWIsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQzt5QkFDcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7eUJBQ3BCLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFMUMsTUFBTSxRQUFRLEdBQUcsVUFBVTt5QkFDdEIsT0FBTyxDQUFDLEdBQUcsUUFBUSxHQUFHLEVBQUUsRUFBRSxDQUFDO3lCQUMzQixPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUUzQixJQUFJLGFBQWlDLENBQUM7b0JBRXRDLHlCQUF5QjtvQkFDekIsSUFBSSx5QkFBeUIsRUFBRTt3QkFDM0IsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTs0QkFDMUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUMxQyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTs0QkFDbEMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxhQUFhLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsYUFBYTs0QkFDZCxhQUFhLElBQUksSUFBSSx5QkFBeUIsRUFBRSxDQUFDO3FCQUN4RDt5QkFBTTt3QkFDSCw4QkFBOEI7d0JBQzlCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDeEMsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7NEJBQzFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDMUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7NEJBQ2xDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdEMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFN0MsaURBQWlEO3dCQUNqRCxhQUFhLEdBQUcsaUNBQWlDLENBQzdDLGFBQWEsRUFDYixHQUFHLENBQUMsVUFBVSxDQUNqQixDQUFDO3FCQUNMO29CQUVELElBQUksQ0FBQyxhQUFhO3dCQUFFLE9BQU8sU0FBUyxDQUFDO29CQUVyQyxvREFBb0Q7b0JBQ3BELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7d0JBQUUsT0FBTyxhQUFhLENBQUM7b0JBRXpELGVBQWUsR0FBRyxRQUFRLENBQUM7b0JBQzNCLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsa0RBQWtEO1FBQ2xELElBQ0ksQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLFNBQVM7WUFDL0IsZUFBZSxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQ3JDLGVBQWUsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUNwQyxlQUFlLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztZQUMxQyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsRUFDbkM7WUFDRSxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0tBQ0o7SUFFRCxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtRQUNyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRSw4Q0FBOEM7UUFDOUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztZQUFFLE9BQU8sYUFBYSxDQUFDO0tBQzVEO0lBRUQsZ0RBQWdEO0lBQ2hELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==