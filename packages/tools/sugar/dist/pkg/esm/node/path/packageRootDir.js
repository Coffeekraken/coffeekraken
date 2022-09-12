// @ts-nocheck
import __findPkgJson from 'find-package-json';
import { __isFile } from '@coffeekraken/sugar/is';
import __objectHash from '../../shared/object/objectHash';
const __packageRootDirsCache = {};
export default function __packageRootDir(from = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, upCount: undefined, requiredProperties: ['name', 'version'] }, (settings !== null && settings !== void 0 ? settings : {}));
    // cache
    const storageKey = __objectHash(Object.assign({ from }, finalSettings));
    if (!from && __packageRootDirsCache[storageKey]) {
        return __packageRootDirsCache[storageKey];
    }
    if (__isFile(from))
        from = from.split('/').slice(0, -1).join('/');
    const f = __findPkgJson(from);
    let file = f.next();
    let finalFile, upCountIdx = 0;
    // no file found
    if (!file || !file.filename)
        return false;
    while (!file.done) {
        if (file.done) {
            break;
        }
        if (finalSettings.upCount && !finalSettings.highest) {
            if (upCountIdx >= finalSettings.upCount) {
                break;
            }
        }
        if (!finalSettings.highest) {
            // required properties
            if (finalSettings.requiredProperties) {
                let allProps = true;
                finalSettings.requiredProperties.forEach((prop) => {
                    if (!allProps)
                        return;
                    if (file.value[prop] === undefined)
                        allProps = false;
                });
                if (allProps) {
                    upCountIdx++;
                    finalFile = file;
                    if (!finalSettings.upCount) {
                        break;
                    }
                }
            }
            else {
                upCountIdx++;
                finalFile = file;
                if (!finalSettings.upCount) {
                    break;
                }
            }
        }
        else {
            finalFile = file;
        }
        file = f.next();
    }
    if (!finalFile)
        return false;
    const finalPath = finalFile.filename.split('/').slice(0, -1).join('/');
    __packageRootDirsCache[storageKey] = finalPath;
    return finalPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFvQzFELE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQ3BDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ3BCLFFBQXdDO0lBRXhDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxFQUNkLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLGtCQUFrQixFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUNwQyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsUUFBUTtJQUNSLE1BQU0sVUFBVSxHQUFHLFlBQVksaUJBQzNCLElBQUksSUFDRCxhQUFhLEVBQ2xCLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxJQUFJLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0M7SUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxFLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxTQUFTLEVBQ1QsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQixnQkFBZ0I7SUFDaEIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxNQUFNO1NBQ1Q7UUFFRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2pELElBQUksVUFBVSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JDLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsc0JBQXNCO1lBQ3RCLElBQUksYUFBYSxDQUFDLGtCQUFrQixFQUFFO2dCQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLFFBQVE7d0JBQUUsT0FBTztvQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7d0JBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsVUFBVSxFQUFFLENBQUM7b0JBQ2IsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7d0JBQ3hCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtpQkFBTTtnQkFDSCxVQUFVLEVBQUUsQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsTUFBTTtpQkFDVDthQUNKO1NBQ0o7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25CO0lBRUQsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU3QixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=