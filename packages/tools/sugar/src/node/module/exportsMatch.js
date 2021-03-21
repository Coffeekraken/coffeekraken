"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const node_1 = __importDefault(require("../../shared/is/node"));
const plainObject_1 = __importDefault(require("../../shared/is/plainObject"));
const sugar_1 = __importDefault(require("../../shared/config/sugar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extension_1 = __importDefault(require("../fs/extension"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', target: node_1.default() ? 'node' : 'default', extensions: sugar_1.default('module.resolve.extensions') }, (settings || {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0c01hdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhwb3J0c01hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBQ3BDLGdFQUE0QztBQUM1Qyw4RUFBMEQ7QUFDMUQsc0VBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0VBQTBDO0FBQzFDLDRHQUFzRjtBQTRCdEYsU0FBd0IsWUFBWSxDQUNsQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDUCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsY0FBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUN2QyxVQUFVLEVBQUUsZUFBYSxDQUFDLDJCQUEyQixDQUFDLElBQ25ELENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsdUJBQXVCO0lBQ3ZCLE1BQU0sSUFBSSxHQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FDYix3Q0FBd0MsVUFBVSxpSUFBaUksQ0FDcEwsQ0FBQztLQUNMO0lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbkUsSUFBSSxJQUFJLENBQUMs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