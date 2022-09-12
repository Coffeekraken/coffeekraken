// @ts-nocheck
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash';
import __formatPackageJson from '../../shared/package/formatPackageJson';
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageJson from '../npm/packageJson';
import __packageRoot from './rootPath';
let __packageJsonCache = {};
export default function __packageJsonSync(fromOrName = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, standardize: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // "cache"
    const hash = __objectHash(Object.assign({ fromOrName }, (settings !== null && settings !== void 0 ? settings : {})));
    if (__packageJsonCache[hash]) {
        return __packageJsonCache[hash];
    }
    let json;
    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${__packageRoot(fromOrName, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!__fs.existsSync(path))
            return false;
        json = __readJsonSync(path);
        if (finalSettings.standardize) {
            json = __formatPackageJson(json);
        }
    }
    else {
        json = __packageJson(fromOrName);
    }
    // cache
    if (!__packageJsonCache[hash])
        __packageJsonCache[hash] = json;
    // return the json
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUQsT0FBTyxtQkFBbUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxhQUFhLE1BQU0sWUFBWSxDQUFDO0FBK0J2QyxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUNyQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUMxQixRQUE0QztJQUU1QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssRUFDZCxXQUFXLEVBQUUsS0FBSyxJQUNmLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixVQUFVO0lBQ1YsTUFBTSxJQUFJLEdBQUcsWUFBWSxpQkFDckIsVUFBVSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7SUFDSCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7SUFFRCxJQUFJLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxxQ0FBcUM7SUFDckMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUN0QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87U0FDakMsQ0FBQyxlQUFlLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFekMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0o7U0FBTTtRQUNILElBQUksR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9