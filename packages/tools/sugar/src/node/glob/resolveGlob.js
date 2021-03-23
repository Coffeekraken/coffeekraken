"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const glob_1 = __importDefault(require("glob"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const glob_2 = __importDefault(require("../../shared/is/glob"));
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
const expandGlob_1 = __importDefault(require("../../shared/glob/expandGlob"));
/**
 * @name            resolveGlob
 * @namespace       sugar.node.glob
 * @type            Function
 * @async
 * @status              beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for when using some "**" pattern
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
 *
 * @setting     {String}        cwd                         The root directory where to start the glob search process
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
 * await resolveGlob('/my/cool/pattern/*.js');
 *
 * @see         https://www.npmjs.com/package/glob
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveGlob(globs, settings = {}) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
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
            const splits = glob.split(':').map((split) => {
                return split.replace(`${cwd}/`, '').replace(cwd, '');
            });
            globPattern = splits[0];
            splits.forEach((split) => {
                if (split.substr(0, 1) === '/' &&
                    split.match(/.*\/[igmsuy]{0,6}]?/)) {
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
                const sFile = SFile_1.default.instanciate(path, {
                    file: {
                        cwd
                    }
                });
                filesArray.push(sFile);
            });
        }
        // resolve the promise
        resolve(filesArray);
    }, {
        id: 'resolveGlob'
    });
}
exports.default = resolveGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4RUFBd0Q7QUFDeEQsd0VBQWlEO0FBQ2pELGdEQUEwQjtBQUMxQix3REFBa0M7QUFDbEMsZ0VBQTRDO0FBQzVDLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0VBQTRDO0FBQzVDLDhFQUF3RDtBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEMsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQ3BCLFdBQVcsRUFDWCxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUVwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMs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