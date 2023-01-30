// @ts-nocheck
import { __isFile } from '@coffeekraken/sugar/is';
import { __objectHash } from '@coffeekraken/sugar/object';
import __findPkgJson from 'find-package-json';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBb0M5QyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztBQUNsQyxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUNwQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNwQixRQUF3QztJQUV4QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssRUFDZCxPQUFPLEVBQUUsU0FBUyxFQUNsQixrQkFBa0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFDcEMsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFFBQVE7SUFDUixNQUFNLFVBQVUsR0FBRyxZQUFZLGlCQUMzQixJQUFJLElBQ0QsYUFBYSxFQUNsQixDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUksSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3QyxPQUFPLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdDO0lBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsRSxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXBCLElBQUksU0FBUyxFQUNULFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFbkIsMENBQTBDO0lBQzFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3pCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDZixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxNQUFNO1NBQ1Q7UUFFRCxJQUFJLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ2pELElBQUksVUFBVSxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JDLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsc0JBQXNCO1lBQ3RCLElBQUksYUFBYSxDQUFDLGtCQUFrQixFQUFFO2dCQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxDQUFDLFFBQVE7d0JBQUUsT0FBTztvQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVM7d0JBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDekQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsVUFBVSxFQUFFLENBQUM7b0JBQ2IsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7d0JBQ3hCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtpQkFBTTtnQkFDSCxVQUFVLEVBQUUsQ0FBQztnQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsTUFBTTtpQkFDVDthQUNKO1NBQ0o7YUFBTTtZQUNILFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25CO0lBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RSxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDL0MsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9