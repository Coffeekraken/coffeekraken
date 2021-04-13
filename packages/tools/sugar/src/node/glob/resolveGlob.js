"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const glob_1 = __importDefault(require("glob"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const glob_2 = __importDefault(require("../../shared/is/glob"));
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
/**
 * @name            resolveGlob
 * @namespace       sugar.node.glob
 * @type            Function
 * @status              beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {Array}                                  An array of SFile instances
 *
 * @setting     {String}        cwd                         The root directory where to start the glob search process
 * @setting     {Object}        ...glob                     All the glob (https://www.npmjs.com/package/glob) options are supported
 * @setting     {RegExp}        [contentRegex=null]         Specify a regex that will be used to filter the results by searching in the content
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo          document the special ":" syntax available
 *
 * @example         js
 * import resolveGlob from '@coffeekraken/sugar/node/glob/resolveGlob';
 * resolveGlob('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveGlob(globs, settings = {}) {
    settings = deepMerge_1.default({
        cwd: settings.cwd || process.cwd(),
        symlinks: true,
        nodir: true
    }, settings);
    const filesArray = [];
    if (!Array.isArray(globs))
        globs = [globs];
    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];
        let cwd = settings.cwd, globPattern, searchReg = settings.contentRegex;
        // make sure it's a glob pattern
        if (!glob_2.default(glob) || fs_1.default.existsSync(glob)) {
            const sFile = s_file_1.default.new(glob, {
                file: {
                    cwd
                }
            });
            filesArray.push(sFile);
            continue;
        }
        const splits = glob.split(':').map((split) => {
            return split.replace(`${cwd}/`, '').replace(cwd, '');
        });
        globPattern = splits[0];
        splits.forEach((split) => {
            if (split.substr(0, 1) === '/' && split.match(/.*\/[igmsuy]{0,6}]?/)) {
                const regSplits = split.split('/').splice(1);
                const regString = regSplits[0];
                const flags = regSplits[regSplits.length - 1];
                searchReg = to_regex_1.default(regString, {
                    flags
                });
            }
            else if (glob_2.default(split)) {
                globPattern = split;
            }
        });
        globPattern = `${cwd}/${globPattern}`;
        const finalPatterns = expandGlob_1.default(globPattern);
        let pathes = [];
        finalPatterns.forEach((pattern) => {
            pathes = pathes.concat(glob_1.default.sync(pattern, Object.assign({ cwd, dot: true }, settings)));
        });
        // check if need to search for inline content
        if (searchReg) {
            pathes = pathes.filter((path) => {
                if (directory_1.default(path))
                    return false;
                const content = fs_1.default.readFileSync(path, 'utf8');
                const matches = content.match(searchReg);
                if (matches) {
                    return true;
                }
                return false;
            });
        }
        pathes.forEach((path) => {
            const sFile = s_file_1.default.new(path, {
                file: {
                    cwd
                }
            });
            filesArray.push(sFile);
        });
    }
    // resolve the promise
    return filesArray;
}
exports.default = resolveGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4RUFBd0Q7QUFFeEQsZ0RBQTBCO0FBQzFCLGtFQUEyQztBQUMzQyxnRUFBNEM7QUFDNUMsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQyxnRUFBNEM7QUFDNUMsOEVBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7S0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWMsRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUNwQixXQUFXLEVBQ1gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFFcEMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxjQUFRLENBQUMsSUFBSSxDQUFDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QyxNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLEdB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