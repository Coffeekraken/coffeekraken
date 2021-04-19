"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
function packageJson(name, settings) {
    const set = deepMerge_1.default({
        rootDir: s_sugar_config_1.default('npm.rootDir')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtGQUF5RDtBQUN6RCxpRkFBMkQ7QUFFM0QsNENBQXNCO0FBMEJ0QixTQUF3QixXQUFXLENBQ2pDLElBQVksRUFDWixRQUF3QztJQUV4QyxNQUFNLEdBQUcsR0FBeUIsbUJBQVcsQ0FBQztRQUM1QyxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxhQUFhLENBQUM7S0FDdEMsQ0FBQyxDQUFDO0lBRUgsOEJBQThCO0lBQzlCLElBQ0UsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQ3ZEO1FBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixxREFBcUQsSUFBSSxzRkFBc0YsQ0FDaEosQ0FBQztLQUNIO0lBRUQsZ0JBQWdCO0lBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3JCLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUNqRSxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBdkJELDhCQXVCQyJ9