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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9nbG9iL3Jlc29sdmVHbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyx3RUFBaUQ7QUFDakQsZ0RBQTBCO0FBQzFCLHdEQUFrQztBQUVsQyxzREFBa0M7QUFFbEMsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQyxnRUFBNEM7QUFDNUMsOERBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEdBQUcsRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDbEMsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQ3BCLFdBQVcsRUFDWCxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUVwQyxN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