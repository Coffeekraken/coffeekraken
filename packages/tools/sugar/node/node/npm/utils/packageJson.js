"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9ucG0vdXRpbHMvcGFja2FnZUpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrREFBK0M7QUFDL0MsdUVBQWlEO0FBRWpELDRDQUFzQjtBQTBCdEIsU0FBd0IsV0FBVyxDQUNqQyxJQUFZLEVBQ1osUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQXlCLG1CQUFXLENBQUM7UUFDNUMsT0FBTyxFQUFFLGVBQWEsQ0FBQyxhQUFhLENBQUM7S0FDdEMsQ0FBQyxDQUFDO0lBRUgsOEJBQThCO0lBQzlCLElBQ0UsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQyxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxDQUFDLEVBQ3ZEO1FBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixxREFBcUQsSUFBSSxzRkFBc0YsQ0FDaEosQ0FBQztLQUNIO0lBRUQsZ0JBQWdCO0lBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3JCLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUNqRSxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBdkJELDhCQXVCQyJ9