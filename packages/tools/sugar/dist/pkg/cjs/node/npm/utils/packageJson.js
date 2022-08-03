"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function packageJson(name, settings) {
    const set = (0, deepMerge_1.default)({
        rootDir: s_sugar_config_1.default.get('npm.rootDir'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELGlGQUEyRDtBQUUzRCw0Q0FBc0I7QUEyQnRCLFNBQXdCLFdBQVcsQ0FDL0IsSUFBWSxFQUNaLFFBQXdDO0lBRXhDLE1BQU0sR0FBRyxHQUF5QixJQUFBLG1CQUFXLEVBQUM7UUFDMUMsT0FBTyxFQUFFLHdCQUFhLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztLQUM1QyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsSUFDSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFDLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLENBQUMsRUFDekQ7UUFDRSxNQUFNLElBQUksS0FBSyxDQUNYLHFEQUFxRCxJQUFJLHNGQUFzRixDQUNsSixDQUFDO0tBQ0w7SUFFRCxnQkFBZ0I7SUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDbkIsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksSUFBSSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdkJELDhCQXVCQyJ9