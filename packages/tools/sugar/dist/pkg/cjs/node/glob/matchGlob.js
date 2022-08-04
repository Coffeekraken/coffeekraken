"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const minimatch_1 = __importDefault(require("minimatch"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const directory_1 = __importDefault(require("../is/directory"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const path_1 = __importDefault(require("path"));
function matchGlob(input, glob, settings) {
    var _a, _b;
    settings = (0, deepMerge_1.default)({
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        symlinks: true,
        nodir: true,
    }, settings !== null && settings !== void 0 ? settings : {});
    if (Array.isArray(glob)) {
        for (let i = 0; i < glob.length; i++) {
            if (matchGlob(input, glob[i], settings))
                return true;
        }
        return false;
    }
    const splits = glob.split(':');
    const pattern = splits[0]
        .replace(`${settings.cwd}/`, '')
        .replace(settings.cwd, '');
    const regex = splits[1];
    const fullFilePath = path_1.default.resolve((_b = settings.cwd) !== null && _b !== void 0 ? _b : '', input);
    const expandedGlobs = (0, expandGlob_1.default)(pattern);
    let hasMatch = false;
    for (let i = 0; i < expandedGlobs.length; i++) {
        const g = expandedGlobs[i];
        if ((0, minimatch_1.default)(input, g)) {
            hasMatch = true;
            break;
        }
    }
    if (!hasMatch)
        return false;
    if (!fs_1.default.existsSync(fullFilePath))
        return false;
    if (settings.nodir && (0, directory_1.default)(fullFilePath))
        return false;
    if (regex) {
        const fileContent = fs_1.default.readFileSync(fullFilePath, 'utf8').toString();
        const regSplits = regex.split('/').splice(1);
        const regString = regSplits[0];
        const flags = regSplits[regSplits.length - 1];
        const searchReg = (0, to_regex_1.default)(regString, {
            flags,
        });
        if (!fileContent.match(searchReg))
            return false;
    }
    return true;
}
exports.default = matchGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQywwREFBb0M7QUFDcEMsOEVBQXdEO0FBQ3hELGdFQUE0QztBQUM1Qyw4RUFBd0Q7QUFDeEQsZ0RBQTBCO0FBZ0MxQixTQUF3QixTQUFTLENBQzdCLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBc0M7O0lBRXRDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksR0FBRyxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsbUNBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNuQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDeEQ7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNwQixPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QixNQUFNLFlBQVksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLE1BQUEsUUFBUSxDQUFDLEdBQUcsbUNBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRS9ELE1BQU0sYUFBYSxHQUFHLElBQUEsb0JBQVksRUFBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksSUFBQSxtQkFBVyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU07U0FDVDtLQUNKO0lBQ0QsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNqRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBQSxtQkFBYSxFQUFDLFlBQVksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRWhFLElBQUksS0FBSyxFQUFFO1FBQ1AsTUFBTSxXQUFXLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sU0FBUyxHQUFHLElBQUEsa0JBQVMsRUFBQyxTQUFTLEVBQUU7WUFDbkMsS0FBSztTQUNSLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ25EO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXhERCw0QkF3REMifQ==