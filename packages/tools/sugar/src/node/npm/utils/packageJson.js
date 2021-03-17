"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function packageJson(name, settings) {
    const set = deepMerge_1.default({
        rootDir: sugar_1.default('npm.rootDir')
    });
    // check if the package exists
    if (!fs_1.default.existsSync(`${set.rootDir}/${name}`) ||
        !fs_1.default.existsSync(`${set.rootDir}/${name}/package.json`)) {
        throw new Error(`packageJson: Sorry but the package named "<yellow>${name}</yellow>" from which you try to get the package.json content seems to not exists...`);
    }
    // read the file
    const json = JSON.parse(fs_1.default.readFileSync(`${set.rootDir}/${name}/package.json`, 'utf8'));
    return json;
}
exports.default = packageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUErQztBQUMvQyxpRkFBMkQ7QUFFM0QsNENBQXNCO0FBMEJ0QixTQUF3QixXQUFXLENBQ2pDLElBQVksRUFDWixRQUF3QztJQUV4QyxNQUFNLEdBQUcsR0FBeUIsbUJBQVcsQ0FBQztRQUM1QyxPQUFPLEVBQUUsZUFBYSxDQUFDLGFBQWEsQ0FBQztLQUN0QyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsSUFDRSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFDLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDdkQ7UUFDQSxNQUFNLElBQUksS0FBSyxDQUNiLHFEQUFxRCxJQUFJLHNGQUFzRixDQUNoSixDQUFDO0tBQ0g7SUFFRCxnQkFBZ0I7SUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDckIsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQ2pFLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUF2QkQsOEJBdUJDIn0=