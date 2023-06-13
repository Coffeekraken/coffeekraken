"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const child_process_1 = __importDefault(require("child_process"));
const fs_2 = __importDefault(require("fs"));
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
    const cacheFilePath = `${(0, path_1.__packageRootDir)()}/.local/cache/globalNodeModulesPath.json`;
    if (fs_2.default.existsSync(cacheFilePath)) {
        // read the cache file
        cachedJson = JSON.parse(fs_2.default.readFileSync(cacheFilePath, 'utf-8').toString());
        // check if we have already the global node modules path
        if (cachedJson[process.version]) {
            return cachedJson[process.version];
        }
    }
    else {
        (0, fs_1.__ensureDirSync)((0, fs_1.__folderPath)(cacheFilePath));
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
    fs_2.default.writeFileSync(cacheFilePath, JSON.stringify(cachedJson, null, 4));
    // return the global modules path
    return modulesPath;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQXVFO0FBQ3ZFLG1EQUE0RDtBQUM1RCxrRUFBMkM7QUFDM0MsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSDtJQUNJLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVwQixpQkFBaUI7SUFDakIsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLDBDQUEwQyxDQUFDO0lBQ3RGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNoQyxzQkFBc0I7UUFDdEIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ25CLFlBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUN2RCxDQUFDO1FBQ0Ysd0RBQXdEO1FBQ3hELElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3QixPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEM7S0FDSjtTQUFNO1FBQ0gsSUFBQSxvQkFBZSxFQUFDLElBQUEsaUJBQVksRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsbUNBQW1DO0lBQ25DLE1BQU0sV0FBVyxHQUFHLHVCQUFjO1NBQzdCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUMzQixLQUFLLEVBQUUsTUFBTTtLQUNoQixDQUFDO1NBQ0QsUUFBUSxFQUFFO1NBQ1YsSUFBSSxFQUFFO1NBQ04sS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxCLHdCQUF3QjtJQUN4QixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUUxQyxpQkFBaUI7SUFDakIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkUsaUNBQWlDO0lBQ2pDLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFwQ0QsNEJBb0NDIn0=