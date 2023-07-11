"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readJsonSync_js_1 = __importDefault(require("../fs/readJsonSync.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
function __isInPackage(name, settings) {
    const finalSettings = Object.assign({ cwd: process.cwd(), highest: false }, (settings !== null && settings !== void 0 ? settings : {}));
    const packageRootDir = (0, packageRootDir_js_1.default)(finalSettings.cwd);
    if (!packageRootDir)
        return false;
    if (!fs_1.default.existsSync(`${packageRootDir}/package.json`))
        return false;
    const pkg = (0, readJsonSync_js_1.default)(`${packageRootDir}/package.json`);
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
            highest: true,
        });
    }
    return false;
}
exports.default = __isInPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0Qiw0RUFBbUQ7QUFDbkQsa0ZBQXlEO0FBa0N6RCxTQUF3QixhQUFhLENBQ2pDLElBQUksRUFDSixRQUF3QztJQUV4QyxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbEIsT0FBTyxFQUFFLEtBQUssSUFDWCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsTUFBTSxjQUFjLEdBQUcsSUFBQSwyQkFBZ0IsRUFBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLGNBQWM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVsQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDckUsTUFBTSxHQUFHLEdBQUcsSUFBQSx5QkFBYyxFQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQztJQUU3RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjO1NBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsMkJBQTJCO1NBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLHVEQUF1RDtJQUN2RCxJQUFJLGFBQWEsQ0FBQyxPQUFPLEVBQUU7UUFDdkIsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLEdBQUcsRUFBRSxPQUFPO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBeENELGdDQXdDQyJ9