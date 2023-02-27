// @ts-nocheck
import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash';
import __packageJsonSync from '../npm/packageJsonSync';
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
        json = __packageJsonSync(fromOrName);
    }
    // cache
    if (!_composerJsonCache[hash])
        _composerJsonCache[hash] = json;
    // return the json
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQThCdEQsSUFBSSxrQkFBa0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDMUIsUUFBNkM7SUFFN0MsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxLQUFLLElBQ1gsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFVBQVU7SUFDVixNQUFNLElBQUksR0FBRyxZQUFZLGlCQUNyQixVQUFVLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsRUFDckIsQ0FBQztJQUNILElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQztJQUVELElBQUksSUFBSSxDQUFDO0lBRVQsd0NBQXdDO0lBQ3hDLHFDQUFxQztJQUNyQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsTUFBTSxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUU7WUFDekMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO1NBQ2pDLENBQUMsZ0JBQWdCLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFFekMsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0gsSUFBSSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsUUFBUTtJQUNSLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0Qsa0JBQWtCO0lBQ2xCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==