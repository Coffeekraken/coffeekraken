"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const unique_js_1 = __importDefault(require("../../shared/array/unique.js"));
const listDependenciesFromString_js_1 = __importDefault(require("../../shared/dependencies/listDependenciesFromString.js"));
const isGlob_js_1 = __importDefault(require("../../shared/is/isGlob.js"));
function __listDependenciesFromFiles(glob, settings) {
    var _a;
    if (!Array.isArray(glob))
        glob = [glob];
    const files = glob_1.default.sync(glob
        .map((g) => {
        if (!(0, isGlob_js_1.default)(g)) {
            return `${g}/**/*.{js,ts,jsx,tsx}`;
        }
        return g;
    })
        .join(','), {
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        nodir: true,
        absolute: true,
    });
    let dependencies = [];
    for (let [i, filePath] of files.entries()) {
        const content = fs_1.default.readFileSync(filePath).toString();
        const fileDependencies = (0, listDependenciesFromString_js_1.default)(content, settings);
        dependencies = [...dependencies, ...fileDependencies];
    }
    return (0, unique_js_1.default)(dependencies);
}
exports.default = __listDependenciesFromFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw2RUFBb0Q7QUFDcEQsNEhBQW1HO0FBQ25HLDBFQUFpRDtBQW9DakQsU0FBd0IsMkJBQTJCLENBQy9DLElBQXVCLEVBQ3ZCLFFBQTZDOztJQUU3QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLEtBQUssR0FBRyxjQUFNLENBQUMsSUFBSSxDQUNyQixJQUFJO1NBQ0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDUCxJQUFJLENBQUMsSUFBQSxtQkFBUSxFQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxHQUFHLENBQUMsdUJBQXVCLENBQUM7U0FDdEM7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFDZDtRQUNJLEdBQUcsRUFBRSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbkMsS0FBSyxFQUFFLElBQUk7UUFDWCxRQUFRLEVBQUUsSUFBSTtLQUNqQixDQUNKLENBQUM7SUFFRixJQUFJLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN2QyxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSx1Q0FBNEIsRUFDakQsT0FBTyxFQUNQLFFBQVEsQ0FDWCxDQUFDO1FBQ0YsWUFBWSxHQUFHLENBQUMsR0FBRyxZQUFZLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsT0FBTyxJQUFBLG1CQUFRLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQWpDRCw4Q0FpQ0MifQ==