"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const node_1 = __importDefault(require("../../shared/is/node"));
const plainObject_1 = __importDefault(require("../../shared/is/plainObject"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extension_1 = __importDefault(require("../fs/extension"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', target: node_1.default() ? 'node' : 'default', 
        // @ts-ignore
        extensions: s_sugar_config_1.default('module.resolve.extensions') }, (settings || {}));
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
        if (plainObject_1.default(modulesSubpaths)) {
            // check if a key match
            for (let key in modulesSubpaths) {
                if (minimatch_1.default(modulePath, key.replace(/^\.\//, ''))) {
                    // console.log('MATCH', modulePath, key);
                    const matchStr = key.replace(/^\.\//, '').replace(/\/\*$/, '');
                    const modulePathExt = extension_1.default(modulePath);
                    const internalPackageSubPathExt = extension_1.default(modulesSubpaths[key]);
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
                        potentialPath = checkPathWithMultipleExtensions_1.default(potentialPath, set.extensions);
                    }
                    if (!potentialPath)
                        return undefined;
                    // check if the potential image exists and return it
                    if (fs_1.default.existsSync(potentialPath))
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
            !plainObject_1.default(modulesSubpaths)) {
            founded = true;
        }
    }
    if (typeof modulesSubpaths === 'string') {
        const potentialPath = path_1.default.resolve(packageDir, modulesSubpaths);
        // check is the file exists inside the package
        if (fs_1.default.existsSync(potentialPath))
            return potentialPath;
    }
    // nothing has been found so we return undefined
    return undefined;
}
exports.default = exportsMatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0c01hdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0c01hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLGdFQUE0QztBQUM1Qyw4RUFBMEQ7QUFDMUQsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0VBQTBDO0FBQzFDLDRHQUFzRjtBQTRCdEYsU0FBd0IsWUFBWSxDQUNsQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsY0FBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN2QyxhQUFhO1FBQ2IsVUFBVSxFQUFFLHdCQUFhLENBQUMsMkJBQTJCLENBQUMsSUFDbkQsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsTUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNqRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUNiLHdDQUF3QyxVQUFVLGlJQUFpSSxDQUNwTCxDQUFDO0tBQ0w7SUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNuRSxJQUFJ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