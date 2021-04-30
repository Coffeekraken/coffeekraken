"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const glob_1 = __importDefault(require("glob"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
/**
 * @name            resolveGlob
 * @namespace            node.glob
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
        nodir: true,
        contentRegExp: undefined
    }, settings);
    const filesArray = [];
    if (!Array.isArray(globs))
        globs = [globs];
    for (let i = 0; i < globs.length; i++) {
        const glob = globs[i];
        let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
        // make sure it's a glob pattern
        if (fs_1.default.existsSync(glob)) {
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
        if (splits[1]) {
            searchReg = to_regex_1.default(splits[1]);
        }
        globPattern = splits[0];
        globPattern = path_1.default.resolve(cwd, globPattern);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4RUFBd0Q7QUFFeEQsZ0RBQTBCO0FBQzFCLGtFQUEyQztBQUUzQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHdEQUFpQztBQUNqQyxnRUFBNEM7QUFDNUMsOEVBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1FBQ2xDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLElBQUk7UUFDWCxhQUFhLEVBQUUsU0FBUztLQUN6QixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWMsRUFBRSxDQUFDO0lBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUNwQixXQUFXLEVBQ1gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFFckMsZ0NBQWdDO1FBQ2hDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixNQUFNLEtBQUssR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixHQUFHO2lCQUNKO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixTQUFTO1NBQ1Y7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzNDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLFNBQVMsR0FBRyxrQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QixXQUFXLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0MsTUFBTSxhQUFhLEdBQUcsb0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQixjQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sa0JBQ2pCLEdBQUcsRUFDSCxHQUFHLEVBQUUsSUFBSSxJQUNOLFFBQVEsRUFDWCxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzlCLElBQUksbUJBQWEsQ0FBQyxJQUFJLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3RDLE1BQU0sT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEIsTUFBTSxLQUFLLEdBQUcsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osR0FBRztpQkFDSjthQUNGLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELHNCQUFzQjtJQUN0QixPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=