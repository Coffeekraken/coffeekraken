"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const glob_1 = __importDefault(require("glob"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const glob_2 = __importDefault(require("../is/glob"));
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
const expandGlob_1 = __importDefault(require("./expandGlob"));
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
 * @setting     {Number}        [maxDepth=-1]               Specify the maximum depth to use when
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
        let filesArray = [];
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
            let finalPatterns = expandGlob_1.default(globPattern);
            let pathes = [];
            finalPatterns.forEach((pattern) => {
                pathes = pathes.concat(glob_1.default.sync(pattern, Object.assign({ cwd }, settings)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvRUFBOEM7QUFDOUMsd0VBQWlEO0FBQ2pELGdEQUEwQjtBQUMxQix3REFBa0M7QUFFbEMsc0RBQWtDO0FBRWxDLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0VBQTRDO0FBQzVDLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1QixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQ2xDLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0QixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUNwQixXQUFXLEVBQ1gsU0FBUyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFFcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFD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