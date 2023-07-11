import __childProcess from 'child_process';
import __fs from 'fs';
import __ensureDirSync from '../fs/ensureDirSync.js';
import __folderPath from '../fs/folderPath.js';
import __packageRootDir from '../path/packageRootDir.js';
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
export default function () {
    let cachedJson = {};
    // check in cache
    const cacheFilePath = `${__packageRootDir()}/.local/cache/globalNodeModulesPath.json`;
    if (__fs.existsSync(cacheFilePath)) {
        // read the cache file
        cachedJson = JSON.parse(__fs.readFileSync(cacheFilePath, 'utf-8').toString());
        // check if we have already the global node modules path
        if (cachedJson[process.version]) {
            return cachedJson[process.version];
        }
    }
    else {
        __ensureDirSync(__folderPath(cacheFilePath));
    }
    // get the global node modules path
    const modulesPath = __childProcess
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
    __fs.writeFileSync(cacheFilePath, JSON.stringify(cachedJson, null, 4));
    // return the global modules path
    return modulesPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFDVixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFcEIsaUJBQWlCO0lBQ2pCLE1BQU0sYUFBYSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsMENBQTBDLENBQUM7SUFDdEYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ2hDLHNCQUFzQjtRQUN0QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ3ZELENBQUM7UUFDRix3REFBd0Q7UUFDeEQsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzdCLE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QztLQUNKO1NBQU07UUFDSCxlQUFlLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxtQ0FBbUM7SUFDbkMsTUFBTSxXQUFXLEdBQUcsY0FBYztTQUM3QixRQUFRLENBQUMsbUJBQW1CLEVBQUU7UUFDM0IsS0FBSyxFQUFFLE1BQU07S0FDaEIsQ0FBQztTQUNELFFBQVEsRUFBRTtTQUNWLElBQUksRUFBRTtTQUNOLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsQix3QkFBd0I7SUFDeEIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQUM7SUFFMUMsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZFLGlDQUFpQztJQUNqQyxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDIn0=