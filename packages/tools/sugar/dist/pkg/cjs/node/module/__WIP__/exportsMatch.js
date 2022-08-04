"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_1 = __importDefault(require("path"));
const node_1 = __importDefault(require("../../shared/is/node"));
const plainObject_1 = __importDefault(require("../../shared/is/plainObject"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("../fs/checkPathWithMultipleExtensions"));
const extension_1 = __importDefault(require("../fs/extension"));
function exportsMatch(packageDir, exportsObj, modulePath, settings) {
    let modulesSubpaths = exportsObj;
    const set = Object.assign({ method: 'import', target: (0, node_1.default)() ? 'node' : 'default', 
        // @ts-ignore
        extensions: s_sugar_config_1.default.get('module.resolve.extensions') }, (settings || {}));
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
        if ((0, plainObject_1.default)(modulesSubpaths)) {
            // check if a key match
            for (const key in modulesSubpaths) {
                if ((0, minimatch_1.default)(modulePath, key.replace(/^\.\//, ''))) {
                    // console.log('MATCH', modulePath, key);
                    const matchStr = key
                        .replace(/^\.\//, '')
                        .replace(/\/\*$/, '');
                    const modulePathExt = (0, extension_1.default)(modulePath);
                    const internalPackageSubPathExt = (0, extension_1.default)(modulesSubpaths[key]);
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
                        potentialPath = (0, checkPathWithMultipleExtensions_1.default)(potentialPath, set.extensions);
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
            !(0, plainObject_1.default)(modulesSubpaths)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QiwwREFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLGdFQUE0QztBQUM1Qyw4RUFBMEQ7QUFDMUQsNEdBQXNGO0FBQ3RGLGdFQUEwQztBQThCMUMsU0FBd0IsWUFBWSxDQUNoQyxVQUFrQixFQUNsQixVQUFlLEVBQ2YsVUFBa0IsRUFDbEIsUUFBeUM7SUFFekMsSUFBSSxlQUFlLEdBQUcsVUFBVSxDQUFDO0lBRWpDLE1BQU0sR0FBRyxtQkFDTCxNQUFNLEVBQUUsUUFBUSxFQUNoQixNQUFNLEVBQUUsSUFBQSxjQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3ZDLGFBQWE7UUFDYixVQUFVLEVBQUUsd0JBQWEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsSUFDdkQsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsTUFBTSxJQUFJLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0NBQXdDLFVBQVUsaUlBQWlJLENBQ3RMLENBQUM7S0FDVDtJQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2pFLElB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