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
    settings = deepMerge_1.default({
        cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
        symlinks: true,
        nodir: true
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
    const expandedGlobs = expandGlob_1.default(pattern);
    let hasMatch = false;
    for (let i = 0; i < expandedGlobs.length; i++) {
        const g = expandedGlobs[i];
        if (minimatch_1.default(input, g)) {
            hasMatch = true;
            break;
        }
    }
    if (!hasMatch)
        return false;
    if (!fs_1.default.existsSync(fullFilePath))
        return false;
    if (settings.nodir && directory_1.default(fullFilePath))
        return false;
    if (regex) {
        const fileContent = fs_1.default.readFileSync(fullFilePath, 'utf8').toString();
        const regSplits = regex.split('/').splice(1);
        const regString = regSplits[0];
        const flags = regSplits[regSplits.length - 1];
        const searchReg = to_regex_1.default(regString, {
            flags
        });
        if (!fileContent.match(searchReg))
            return false;
    }
    return true;
}
exports.default = matchGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hHbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0Y2hHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQywwREFBb0M7QUFDcEMsOEVBQXdEO0FBQ3hELGdFQUE0QztBQUM1Qyw4RUFBd0Q7QUFDeEQsZ0RBQTBCO0FBOEIxQixTQUF3QixTQUFTLENBQy9CLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBc0M7O0lBRXRDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEdBQUcsUUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRyxtQ0FBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ25DLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7S0FDWixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUFDO0lBRUYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0QixPQUFPLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDO1NBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QixNQUFNLFlBQVksR0FBRyxjQUFNLENBQUMsT0FBTyxPQUFDLFFBQVEsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUUvRCxNQUFNLGFBQWEsR0FBRyxvQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QyxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxtQkFBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRTtZQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE1BQU07U0FDUDtLQUNGO0lBQ0QsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNqRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksbUJBQWEsQ0FBQyxZQUFZLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVoRSxJQUFJLEtBQUssRUFBRTtRQUNULE1BQU0sV0FBVyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZFLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxrQkFBUyxDQUFDLFNBQVMsRUFBRTtZQUNyQyxLQUFLO1NBQ04sQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDakQ7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUF4REQsNEJBd0RDIn0=