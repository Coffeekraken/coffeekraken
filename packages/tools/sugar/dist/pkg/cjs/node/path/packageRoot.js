"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const find_package_json_1 = __importDefault(require("find-package-json"));
const is_1 = require("@coffeekraken/sugar/is");
const objectHash_1 = __importDefault(require("../../shared/object/objectHash"));
global._packageRootDirs = {};
function packageRoot(from = process.cwd(), settings) {
    const finalSettings = Object.assign({ highest: false, upCount: undefined, requiredProperties: ['name', 'version'] }, (settings !== null && settings !== void 0 ? settings : {}));
    // cache
    const storageKey = (0, objectHash_1.default)(Object.assign({ from }, finalSettings));
    if (!from && global._packageRootDirs[storageKey]) {
        return global._packageRootDirs[storageKey];
    }
    if ((0, is_1.__isFile)(from))
        from = from.split('/').slice(0, -1).join('/');
    const f = (0, find_package_json_1.default)(from);
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
    global._packageRootDirs[storageKey] = finalPath;
    return finalPath;
}
exports.default = packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBFQUE4QztBQUM5QywrQ0FBa0Q7QUFDbEQsZ0ZBQTBEO0FBb0MxRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLFNBQVMsV0FBVyxDQUNoQixJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNwQixRQUF3QztJQUV4QyxNQUFNLGFBQWEsbUJBQ2YsT0FBTyxFQUFFLEtBQUssRUFDZCxPQUFPLEVBQUUsU0FBUyxFQUNsQixrQkFBa0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFDcEMsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLFFBQVE7SUFDUixNQUFNLFVBQVUsR0FBRyxJQUFBLG9CQUFZLGtCQUMzQixJQUFJLElBQ0QsYUFBYSxFQUNsQixDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUMsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUM7SUFFRCxJQUFJLElBQUEsYUFBUSxFQUFDLElBQUksQ0FBQztRQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEUsTUFBTSxDQUFDLEdBQUcsSUFBQSwyQkFBYSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVwQixJQUFJLFNBQVMsRUFDVCxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLGdCQUFnQjtJQUNoQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUUxQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNmLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLE1BQU07U0FDVDtRQUVELElBQUksYUFBYSxDQUFDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDakQsSUFBSSxVQUFVLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtnQkFDckMsTUFBTTthQUNUO1NBQ0o7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUN4QixzQkFBc0I7WUFDdEIsSUFBSSxhQUFhLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDcEIsYUFBYSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM5QyxJQUFJLENBQUMsUUFBUTt3QkFBRSxPQUFPO29CQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUzt3QkFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLFFBQVEsRUFBRTtvQkFDVixVQUFVLEVBQUUsQ0FBQztvQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDeEIsTUFBTTtxQkFDVDtpQkFDSjthQUNKO2lCQUFNO2dCQUNILFVBQVUsRUFBRSxDQUFDO2dCQUNiLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO29CQUN4QixNQUFNO2lCQUNUO2FBQ0o7U0FDSjthQUFNO1lBQ0gsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUNELElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbkI7SUFFRCxJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTdCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUNoRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=