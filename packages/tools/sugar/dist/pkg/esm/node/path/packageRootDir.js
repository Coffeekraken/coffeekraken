// @ts-nocheck
import { __isFile } from '@coffeekraken/sugar/is';
import __findPkgJson from 'find-package-json';
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
    // no file found so return the process cwd
    if (!file || !file.filename) {
        return false;
    }
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
    if (!finalFile) {
        return false;
    }
    const finalPath = finalFile.filename.split('/').slice(0, -1).join('/');
    __packageRootDirsCache[storageKey] = finalPath;
    return finalPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFvQzFELE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQ3BDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ3BCLFFBQXdDO0lBRXhDLE1BQU0sYUFBYSxtQkFDZixPQUFPLEVBQUUsS0FBSyxFQUNkLE9BQU8sRUFBRSxTQUFTLEVBQ2xCLGtCQUFrQixFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUNwQyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsUUFBUTtJQUNSLE1BQU0sVUFBVSxHQUFHLFlBQVksaUJBQzNCLElBQUksSUFDRCxhQUFhLEVBQ2xCLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxJQUFJLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdDLE9BQU8sc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0M7SUFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxFLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxTQUFTLEVBQ1QsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQiwwQ0FBMEM7SUFDMUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDekIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNmLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLE1BQU07U0FDVDtRQUVELElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDakQsSUFBSSxVQUFVLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtnQkFDckMsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN4QixzQkFBc0I7WUFDdEIsSUFBSSxhQUFhLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDcEIsYUFBYSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM5QyxJQUFJLENBQUMsUUFBUTt3QkFBRSxPQUFPO29CQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUzt3QkFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLFFBQVEsRUFBRTtvQkFDVixVQUFVLEVBQUUsQ0FBQztvQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDeEIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO2lCQUFNO2dCQUNILFVBQVUsRUFBRSxDQUFDO2dCQUNiLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO29CQUN4QixNQUFNO2lCQUNUO2FBQ0o7U0FDSjthQUFNO1lBQ0gsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkI7SUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ1osT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=