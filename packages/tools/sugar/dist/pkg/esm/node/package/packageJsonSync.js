// @ts-nocheck
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash';
import __formatPackageJson from '../../shared/package/formatPackageJson';
import __packageJson from '../npm/packageJson';
import __packageRootDir from '../path/packageRootDir';
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
        json = __packageJson(fromOrName);
    }
    // cache
    if (!__packageJsonCache[hash])
        __packageJsonCache[hash] = json;
    // return the json
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8sbUJBQW1CLE1BQU0sd0NBQXdDLENBQUM7QUFDekUsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQStCdEQsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxpQkFBaUIsQ0FDckMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDMUIsUUFBNEM7SUFFNUMsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxLQUFLLEVBQ2QsV0FBVyxFQUFFLEtBQUssSUFDZixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsVUFBVTtJQUNWLE1BQU0sSUFBSSxHQUFHLFlBQVksaUJBQ3JCLFVBQVUsSUFDUCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxFQUNyQixDQUFDO0lBQ0gsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxJQUFJLENBQUM7SUFFVCx3Q0FBd0M7SUFDeEMscUNBQXFDO0lBQ3JDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN6QixNQUFNLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsRUFBRTtZQUN6QyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87U0FDakMsQ0FBQyxlQUFlLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFekMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7WUFDM0IsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0o7U0FBTTtRQUNILElBQUksR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7SUFFRCxRQUFRO0lBQ1IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUUvRCxrQkFBa0I7SUFDbEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9