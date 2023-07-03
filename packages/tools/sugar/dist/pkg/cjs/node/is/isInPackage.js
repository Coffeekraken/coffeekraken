"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
function __isInPackage(name, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), highest: false }, settings !== null && settings !== void 0 ? settings : {});
    const packageRootDir = (0, packageRootDir_1.default)(finalSettings.cwd);
    if (!packageRootDir)
        return false;
    if (!fs_1.default.existsSync(`${packageRootDir}/package.json`))
        return false;
    const pkg = (0, readJsonSync_1.default)(`${packageRootDir}/package.json`);
    let names = name;
    if (typeof names === 'string')
        names = names.split(',').map((f) => f.trim());
    for (let i = 0; i < names.length; i++) {
        if (names[i] === pkg.name) {
            return true;
        }
    }
    const newPath = packageRootDir
        .split('/')
        .slice(0, -1)
        // .filter((i) => i !== '')
        .join('/');
    // no package found... check if we need to check higher
    if (finalSettings.highest) {
        return __isInPackage(name, {
            cwd: newPath,
            highest: true
        });
    }
    return false;
}
exports.default = __isInPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixzRUFBZ0Q7QUFDaEQsNEVBQXNEO0FBa0N0RCxTQUF3QixhQUFhLENBQ2pDLElBQUksRUFDSixRQUF3QztJQUd4QyxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLEtBQUssSUFDWCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUE7SUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFBLHdCQUFnQixFQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFJLENBQUMsY0FBYztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRWxDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxlQUFlLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNyRSxNQUFNLEdBQUcsR0FBRyxJQUFBLHNCQUFjLEVBQUMsR0FBRyxjQUFjLGVBQWUsQ0FBQyxDQUFDO0lBRTdELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFDekIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUVELE1BQU0sT0FBTyxHQUFHLGNBQWM7U0FDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDYiwyQkFBMkI7U0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsdURBQXVEO0lBQ3ZELElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRTtRQUN2QixPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDdkIsR0FBRyxFQUFFLE9BQU87WUFDWixPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUF6Q0QsZ0NBeUNDIn0=