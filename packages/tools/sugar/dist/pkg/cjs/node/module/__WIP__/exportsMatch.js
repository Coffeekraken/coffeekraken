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
const fs_2 = require("@coffeekraken/sugar/fs");
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
                    const modulePathExt = (0, fs_2.__extension)(modulePath);
                    const internalPackageSubPathExt = (0, fs_2.__extension)(modulesSubpaths[key]);
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
                        potentialPath = (0, fs_2.__checkPathWithMultipleExtensions)(potentialPath, set.extensions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QiwwREFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLGdFQUE0QztBQUM1Qyw4RUFBMEQ7QUFDMUQsK0NBQXdGO0FBOEJ4RixTQUF3QixZQUFZLENBQ2hDLFVBQWtCLEVBQ2xCLFVBQWUsRUFDZixVQUFrQixFQUNsQixRQUF5QztJQUV6QyxJQUFJLGVBQWUsR0FBRyxVQUFVLENBQUM7SUFFakMsTUFBTSxHQUFHLG1CQUNMLE1BQU0sRUFBRSxRQUFRLEVBQ2hCLE1BQU0sRUFBRSxJQUFBLGNBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDdkMsYUFBYTtRQUNiLFVBQVUsRUFBRSx3QkFBYSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxJQUN2RCxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLHVCQUF1QjtJQUN2QixNQUFNLElBQUksR0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQy9ELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCx3Q0FBd0MsVUFBVSxpSUFBaUksQ0FDdEwsQ0FBQztLQUNUO0lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakUsSUFBSSxJQUFJLENBQUMs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