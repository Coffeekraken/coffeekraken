"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const glob_all_1 = __importDefault(require("glob-all"));
const unique_js_1 = __importDefault(require("../../shared/array/unique.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
function listNodeModulesPackages(settings) {
    const finalSettings = Object.assign({ pathes: [`${(0, packageRootDir_js_1.default)()}/node_modules`], monorepo: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.monorepo) {
        finalSettings.pathes.push(`${(0, packageRootDir_js_1.default)(process.cwd(), {
            highest: true,
        })}/node_modules`);
    }
    const finalPaths = [];
    finalSettings.pathes.forEach((path) => {
        finalPaths.push(`${path}/*/package.json`);
        finalPaths.push(`${path}/*/*/package.json`);
    });
    finalSettings.pathes = (0, unique_js_1.default)(finalSettings.pathes);
    const finalPackagesList = {};
    glob_all_1.default.sync(finalPaths).forEach((path) => {
        let packageJson;
        try {
            packageJson = JSON.parse(fs_1.default.readFileSync(path, 'utf8'));
        }
        catch (e) {
            console.log(path.toUpperCase());
            console.log(e);
        }
        if (packageJson) {
            if (!finalPackagesList[packageJson.name]) {
                finalPackagesList[packageJson.name] = packageJson;
            }
        }
    });
    return finalPackagesList;
}
exports.default = listNodeModulesPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLHdEQUE4QjtBQUM5Qiw2RUFBb0Q7QUFDcEQsa0ZBQXlEO0FBOEJ6RCxTQUF3Qix1QkFBdUIsQ0FDM0MsUUFBb0Q7SUFFcEQsTUFBTSxhQUFhLEdBQUcsZ0JBQ2xCLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBQSwyQkFBZ0IsR0FBRSxlQUFlLENBQUMsRUFDOUMsUUFBUSxFQUFFLEtBQUssSUFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO1FBQ3hCLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNyQixHQUFHLElBQUEsMkJBQWdCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUMsZUFBZSxDQUNwQixDQUFDO0tBQ0w7SUFFRCxNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUM7SUFFaEMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNsQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFtQixDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUEsbUJBQVEsRUFBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdEQsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFFN0Isa0JBQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDckMsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSTtZQUNBLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDN0Q7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtRQUNELElBQUksV0FBVyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQzthQUNyRDtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGlCQUFpQixDQUFDO0FBQzdCLENBQUM7QUE1Q0QsMENBNENDIn0=