"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("../../shared/is/glob"));
const path_2 = __importDefault(require("../../shared/is/path"));
const packageRootDir_1 = __importDefault(require("./packageRootDir"));
function relative(path, from = (0, packageRootDir_1.default)(), settings = {}) {
    settings = Object.assign({ glob: true, absolute: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if ((0, glob_1.default)(p)) {
            if (settings.glob)
                return path_1.default.relative(from, p);
            return p;
        }
        else if (path_1.default.isAbsolute(p)) {
            if (settings.absolute)
                return path_1.default.relative(from, p);
            return p;
        }
        else if ((0, path_2.default)(p))
            return path_1.default.relative(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
exports.default = relative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLGdFQUE0QztBQUM1QyxnRUFBNEM7QUFDNUMsc0VBQWdEO0FBbUNoRCxTQUFTLFFBQVEsQ0FDYixJQUFJLEVBQ0osSUFBSSxHQUFHLElBQUEsd0JBQWdCLEdBQUUsRUFDekIsV0FBOEIsRUFBRTtJQUVoQyxRQUFRLG1CQUNKLElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLElBQUksSUFDWCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLE9BQU87UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLElBQUksSUFBQSxjQUFRLEVBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sY0FBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNLElBQUksY0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRO2dCQUFFLE9BQU8sY0FBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNLElBQUksSUFBQSxjQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxjQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELGtCQUFlLFFBQVEsQ0FBQyJ9