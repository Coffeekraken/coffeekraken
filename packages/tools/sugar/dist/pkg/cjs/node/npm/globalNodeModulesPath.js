"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const ensureDirSync_js_1 = __importDefault(require("../fs/ensureDirSync.js"));
const folderPath_js_1 = __importDefault(require("../fs/folderPath.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function returns you the path to the global node modules folder
 *
 * @return      {String}            The path to the global node modules folder
 *
 * @snippet         __globalNodeModulesPath()
 * await __globalNodeModulesPath()
 *
 * @example         js
 * import { __globalNodeModulesPath } from '@coffeekraken/sugar/npm';
 * await __globalNodeModulesPath();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1() {
    let cachedJson = {};
    // check in cache
    const cacheFilePath = `${(0, packageRootDir_js_1.default)()}/.local/cache/globalNodeModulesPath.json`;
    if (fs_1.default.existsSync(cacheFilePath)) {
        // read the cache file
        cachedJson = JSON.parse(fs_1.default.readFileSync(cacheFilePath, 'utf-8').toString());
        // check if we have already the global node modules path
        if (cachedJson[process.version]) {
            return cachedJson[process.version];
        }
    }
    else {
        (0, ensureDirSync_js_1.default)((0, folderPath_js_1.default)(cacheFilePath));
    }
    // get the global node modules path
    const modulesPath = child_process_1.default
        .execSync(`npm root --global`, {
        stdio: 'pipe',
    })
        .toString()
        .trim()
        .split('\n')
        .slice(-1)[0];
    // set in the cachedJson
    cachedJson[process.version] = modulesPath;
    // save the cache
    fs_1.default.writeFileSync(cacheFilePath, JSON.stringify(cachedJson, null, 4));
    // return the global modules path
    return modulesPath;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQTJDO0FBQzNDLDRDQUFzQjtBQUN0Qiw4RUFBcUQ7QUFDckQsd0VBQStDO0FBQy9DLGtGQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0g7SUFDSSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsaUJBQWlCO0lBQ2pCLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSwyQkFBZ0IsR0FBRSwwQ0FBMEMsQ0FBQztJQUN0RixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEMsc0JBQXNCO1FBQ3RCLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixZQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDdkQsQ0FBQztRQUNGLHdEQUF3RDtRQUN4RCxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDN0IsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RDO0tBQ0o7U0FBTTtRQUNILElBQUEsMEJBQWUsRUFBQyxJQUFBLHVCQUFZLEVBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztLQUNoRDtJQUVELG1DQUFtQztJQUNuQyxNQUFNLFdBQVcsR0FBRyx1QkFBYztTQUM3QixRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDM0IsS0FBSyxFQUFFLE1BQU07S0FDaEIsQ0FBQztTQUNELFFBQVEsRUFBRTtTQUNWLElBQUksRUFBRTtTQUNOLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQix3QkFBd0I7SUFDeEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUM7SUFFMUMsaUJBQWlCO0lBQ2pCLFlBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZFLGlDQUFpQztJQUNqQyxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBcENELDRCQW9DQyJ9