// @ts-nocheck
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash.js';
import __formatPackageJson from '../../shared/package/formatPackageJson.js';
import __readJsonSync from '../fs/readJsonSync.js';
import __packageJsonSync from '../npm/packageJsonSync.js';
import __packageRootDir from '../path/packageRootDir.js';
let __packageJsonCache = {};
export default function packageJsonSync(fromOrName = process.cwd(), settings) {
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
        const path = `${__packageRootDir(fromOrName, {
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
        json = __packageJsonSync(fromOrName);
    }
    // cache
    if (!__packageJsonCache[hash])
        __packageJsonCache[hash] = json;
    // return the json
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sbUNBQW1DLENBQUM7QUFDN0QsT0FBTyxtQkFBbUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUM1RSxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLGlCQUFpQixNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFpQ3pELElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUNuQyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUMxQixRQUE0QztJQUU1QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssRUFDZCxXQUFXLEVBQUUsS0FBSyxJQUNmLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixVQUFVO0lBQ1YsTUFBTSxJQUFJLEdBQUcsWUFBWSxpQkFDckIsVUFBVSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLEVBQ3JCLENBQUM7SUFDSCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkM7SUFFRCxJQUFJLElBQUksQ0FBQztJQUVULHdDQUF3QztJQUN4QyxxQ0FBcUM7SUFDckMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztTQUNqQyxDQUFDLGVBQWUsQ0FBQztRQUVsQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV6QyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVCLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUMzQixJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7S0FDSjtTQUFNO1FBQ0gsSUFBSSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsUUFBUTtJQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0Qsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==