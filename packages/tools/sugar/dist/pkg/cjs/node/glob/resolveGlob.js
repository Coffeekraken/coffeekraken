"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const excludeGlobs_1 = __importDefault(require("../path/excludeGlobs"));
function __resolveGlob(globs, settings = {}) {
    settings = (0, deepMerge_1.default)({
        cwd: settings.cwd || process.cwd(),
        symlinks: true,
        nodir: true,
        contentRegExp: undefined,
        SFile: true,
        exclude: [],
        defaultExcludes: true,
    }, settings);
    const filesArray = [];
    if (!Array.isArray(globs))
        globs = [globs];
    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];
        let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
        // make sure it's a glob pattern
        if (fs_1.default.existsSync(glob)) {
            if (settings.SFile) {
                const sFile = s_file_1.default.new(glob, {
                    cwd,
                });
                filesArray.push(sFile);
            }
            else {
                filesArray.push(glob);
            }
            continue;
        }
        const splits = glob.split(':').map((split) => {
            return split.replace(`${cwd}/`, '').replace(cwd, '');
        });
        if (splits[1]) {
            // searchReg = __toRegex(splits[1]);
            const innerReg = splits[1]
                .replace(/^\//, '')
                .replace(/\/[a-zA-Z]{0,10}$/, '');
            let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
            if (flags) {
                flags = flags[0].replace('/', '');
            }
            searchReg = new RegExp(innerReg, flags !== null && flags !== void 0 ? flags : '');
        }
        globPattern = splits[0];
        globPattern = path_1.default.resolve(cwd, globPattern);
        const finalPatterns = (0, expandGlob_1.default)(globPattern);
        let pathes = [];
        finalPatterns.forEach((pattern) => {
            var _a;
            pathes = pathes.concat(glob_1.default.sync(pattern, Object.assign({ cwd, nodir: settings.nodir, dot: true, follow: settings.symlinks, ignore: [
                    ...((_a = settings.exclude) !== null && _a !== void 0 ? _a : []),
                    ...(settings.defaultExcludes ? (0, excludeGlobs_1.default)() : []),
                ] }, settings)));
        });
        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                try {
                    const content = fs_1.default.readFileSync(path, 'utf8').toString();
                    const matches = content.match(searchReg);
                    if (matches && matches.length) {
                        return true;
                    }
                    return false;
                }
                catch (e) {
                    return false;
                }
            });
        }
        pathes.forEach((path) => {
            if (settings.SFile) {
                const sFile = s_file_1.default.new(path, {
                    cwd,
                });
                filesArray.push(sFile);
            }
            else {
                filesArray.push(path);
            }
        });
    }
    // resolve the promise
    return filesArray;
}
exports.default = __resolveGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEyQztBQUMzQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQiw4RUFBd0Q7QUFDeEQsOEVBQXdEO0FBQ3hELHdFQUFrRDtBQXdDbEQsU0FBd0IsYUFBYSxDQUNqQyxLQUF3QixFQUN4QixXQUEwQyxFQUFFO0lBRTVDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtRQUNsQyxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxJQUFJO1FBQ1gsYUFBYSxFQUFFLFNBQVM7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLGVBQWUsRUFBRSxJQUFJO0tBQ3hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBeUIsRUFBRSxDQUFDO0lBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUNsQixXQUFXLEVBQ1gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFFdkMsZ0NBQWdDO1FBQ2hDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtvQkFDNUIsR0FBRztpQkFDTixDQUFDLENBQUM7Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsU0FBUztTQUNaO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWCxvQ0FBb0M7WUFFcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDckIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7aUJBQ2xCLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN0QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JDO1lBQ0QsU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUNELFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEIsV0FBVyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sYUFBYSxHQUFHLElBQUEsb0JBQVksRUFBQyxXQUFXLENBQUMsQ0FBQztRQUVoRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztZQUM5QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDbEIsY0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLGtCQUNmLEdBQUcsRUFDSCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFDckIsR0FBRyxFQUFFLElBQUksRUFDVCxNQUFNLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFDekIsTUFBTSxFQUFFO29CQUNKLEdBQUcsQ0FBQyxNQUFBLFFBQVEsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztvQkFDM0IsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUEsc0JBQWMsR0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQ3hELElBQ0UsUUFBUSxFQUNiLENBQ0wsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBRUgsNkNBQTZDO1FBQzdDLElBQUksU0FBUyxFQUFFO1lBQ1gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsSUFBSTtvQkFDQSxNQUFNLE9BQU8sR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFM0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFekMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTt3QkFDM0IsT0FBTyxJQUFJLENBQUM7cUJBQ2Y7b0JBQ0QsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUNoQixNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7b0JBQzVCLEdBQUc7aUJBQ04sQ0FBQyxDQUFDO2dCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxzQkFBc0I7SUFDdEIsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQTlHRCxnQ0E4R0MifQ==