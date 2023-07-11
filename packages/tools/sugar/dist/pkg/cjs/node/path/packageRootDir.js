"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectHash_js_1 = __importDefault(require("../../shared/object/objectHash.js"));
const isFile_js_1 = __importDefault(require("../is/isFile.js"));
const find_package_json_1 = __importDefault(require("find-package-json"));
const __packageRootDirsCache = {};
function __packageRootDir(from = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, upCount: undefined, requiredProperties: ['name', 'version'] }, (settings !== null && settings !== void 0 ? settings : {}));
    // cache
    const storageKey = (0, objectHash_js_1.default)(Object.assign({ from }, finalSettings));
    if (!from && __packageRootDirsCache[storageKey]) {
        return __packageRootDirsCache[storageKey];
    }
    if ((0, isFile_js_1.default)(from))
        from = from.split('/').slice(0, -1).join('/');
    const f = (0, find_package_json_1.default)(from);
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
exports.default = __packageRootDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNGQUE2RDtBQUM3RCxnRUFBdUM7QUFFdkMsMEVBQThDO0FBc0M5QyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztBQUNsQyxTQUF3QixnQkFBZ0IsQ0FDcEMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDcEIsUUFBd0M7SUFFeEMsTUFBTSxhQUFhLG1CQUNmLE9BQU8sRUFBRSxLQUFLLEVBQ2QsT0FBTyxFQUFFLFNBQVMsRUFDbEIsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQ3BDLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixRQUFRO0lBQ1IsTUFBTSxVQUFVLEdBQUcsSUFBQSx1QkFBWSxrQkFDM0IsSUFBSSxJQUNELGFBQWEsRUFDbEIsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLElBQUksc0JBQXNCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDN0MsT0FBTyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM3QztJQUVELElBQUksSUFBQSxtQkFBUSxFQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEUsTUFBTSxDQUFDLEdBQUcsSUFBQSwyQkFBYSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVwQixJQUFJLFNBQVMsRUFDVCxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLDBDQUEwQztJQUMxQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUN6QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsTUFBTTtTQUNUO1FBRUQsSUFBSSxhQUFhLENBQUMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUNqRCxJQUFJLFVBQVUsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO2dCQUNyQyxNQUFNO2FBQ1Q7U0FDSjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3hCLHNCQUFzQjtZQUN0QixJQUFJLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixhQUFhLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzlDLElBQUksQ0FBQyxRQUFRO3dCQUFFLE9BQU87b0JBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTO3dCQUFFLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksUUFBUSxFQUFFO29CQUNWLFVBQVUsRUFBRSxDQUFDO29CQUNiLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO3dCQUN4QixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7aUJBQU07Z0JBQ0gsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO2FBQU07WUFDSCxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNuQjtJQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkUsc0JBQXNCLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQy9DLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUEvRUQsbUNBK0VDIn0=