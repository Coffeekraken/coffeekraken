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
    const set = Object.assign({ method: 'import', target: node_1.default() ? 'node' : 'default', extensions: s_sugar_config_1.default('module.resolve.extensions') }, (settings || {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0c01hdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0c01hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLGdFQUE0QztBQUM1Qyw4RUFBMEQ7QUFDMUQsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0VBQTBDO0FBQzFDLDRHQUFzRjtBQTRCdEYsU0FBd0IsWUFBWSxDQUNsQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsY0FBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUN2QyxVQUFVLEVBQUUsd0JBQWEsQ0FBQywyQkFBMkIsQ0FBQyxJQUNuRCxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLHVCQUF1QjtJQUN2QixNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pFLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0NBQXdDLFVBQVUsaUlBQWlJLENBQ3BMLENBQUM7S0FDTDtJQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ25FLElBQUksSUFBSSxDQUFD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