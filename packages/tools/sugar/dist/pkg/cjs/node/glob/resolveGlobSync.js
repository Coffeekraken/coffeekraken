"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const excludedGlobs_1 = __importDefault(require("./excludedGlobs"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
function __resolveGlobSync(globs, settings = {}) {
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
                    ...(settings.defaultExcludes ? (0, excludedGlobs_1.default)() : []),
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
exports.default = __resolveGlobSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEyQztBQUUzQyxvRUFBOEM7QUFFOUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsOEVBQXdEO0FBQ3hELDhFQUF3RDtBQTBDeEQsU0FBd0IsaUJBQWlCLENBQ3JDLEtBQXdCLEVBQ3hCLFdBQTBDLEVBQUU7SUFFNUMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7UUFDWCxhQUFhLEVBQUUsU0FBUztRQUN4QixLQUFLLEVBQUUsSUFBSTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsZUFBZSxFQUFFLElBQUk7S0FDeEIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUF5QixFQUFFLENBQUM7SUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQ2xCLFdBQVcsRUFDWCxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUV2QyxnQ0FBZ0M7UUFDaEMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFD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