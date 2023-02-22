// @ts-nocheck
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash';
import __packageJson from '../npm/packageJson';
import __packageRootDir from '../path/packageRootDir';
let _composerJsonCache = {};
export default function __composerJsonSync(fromOrName = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // "cache"
    const hash = __objectHash(Object.assign({ fromOrName }, (settings !== null && settings !== void 0 ? settings : {})));
    if (_composerJsonCache[hash]) {
        return _composerJsonCache[hash];
    }
    let json;
    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${__packageRootDir(fromOrName, {
            highest: finalSettings.highest,
        })}/composer.json`;
        if (!__fs.existsSync(path))
            return false;
        json = __readJsonSync(path);
    }
    else {
        json = __packageJson(fromOrName);
    }
    // cache
    if (!_composerJsonCache[hash])
        _composerJsonCache[hash] = json;
    // return the json
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUE4QnRELElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQ3RDLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQzFCLFFBQTZDO0lBRTdDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxJQUNYLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixVQUFVO0lBQ1YsTUFBTSxJQUFJLEdBQUcsWUFBWSxpQkFDckIsVUFBVSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7SUFDSCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7SUFFRCxJQUFJLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxxQ0FBcUM7SUFDckMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUNqQyxDQUFDLGdCQUFnQixDQUFDO1FBRW5CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBRXpDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7U0FBTTtRQUNILElBQUksR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9