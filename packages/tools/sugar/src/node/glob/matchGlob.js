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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hHbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF0Y2hHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQywwREFBb0M7QUFDcEMsOEVBQXdEO0FBQ3hELGdFQUE0QztBQUM1Qyw4RUFBd0Q7QUFDeEQsZ0RBQTBCO0FBOEIxQixTQUF3QixTQUFTLENBQy9CLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBc0M7O0lBRXRDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEdBQUcsRUFBRSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDbkMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsSUFBSTtLQUNaLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDdEQ7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3RCLE9BQU8sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDL0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sWUFBWSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsTUFBQSxRQUFRLENBQUMsR0FBRyxtQ0FBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFL0QsTUFBTSxhQUFhLEdBQUcsb0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsTUFBTSxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksbUJBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDekIsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixNQUFNO1NBQ1A7S0FDRjtJQUNELElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUIsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDakQsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLG1CQUFhLENBQUMsWUFBWSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFaEUsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLFdBQVcsR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RSxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxTQUFTLEdBQUcsa0JBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDckMsS0FBSztTQUNOLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBeERELDRCQXdEQyJ9