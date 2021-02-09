"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const glob_1 = __importDefault(require("glob"));
const SFile_1 = __importDefault(require("../fs/SFile"));
const glob_2 = __importDefault(require("../is/glob"));
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
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
 * @setting     {String}        rootDir                     The root directory where to start the glob search process
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
    return new SPromise_1.default(({ resolve, reject, emit }) => {
        settings = deepMerge_1.default({
            rootDir: settings.cwd || process.cwd(),
            symlinks: true,
            nodir: true
        }, settings);
        let filesArray = [];
        if (!Array.isArray(globs))
            globs = [globs];
        for (let i = 0; i < globs.length; i++) {
            const glob = globs[i];
            let rootDir = settings.rootDir, globPattern, searchReg = settings.contentRegex;
            const splits = glob.split(':').map((split) => {
                return split.replace(`${rootDir}/`, '').replace(rootDir, '');
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
            const finalRootDir = rootDir.split('/').slice(0, -1).join('/');
            const directoryName = rootDir.split('/').slice(-1).join('');
            globPattern = `+(${directoryName})/${globPattern}`;
            let finalPatterns = [];
            // handle "maxDepth"
            const maxDepthMatch = globPattern.match(/\/?\*\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
            if (maxDepthMatch) {
                const minMaxStr = maxDepthMatch[0]
                    .replace('**{', '')
                    .replace('}', '')
                    .replace(/[\{\}\/]/g, '');
                let toReplace = maxDepthMatch[0].replace(/\//g, '');
                const spl = minMaxStr.split(',');
                let min = 0;
                let max = parseInt(spl[0]);
                if (spl.length === 2) {
                    min = parseInt(spl[0]);
                    max = parseInt(spl[1]);
                }
                let foldersArray = [
                    ...'* '
                        .repeat(min)
                        .split(' ')
                        .filter((l) => l !== '')
                ];
                for (let i = min; i < max; i++) {
                    finalPatterns.push(globPattern
                        .replace(toReplace, foldersArray.join('/'))
                        .replace(/\/\//g, '/'));
                    foldersArray.push('*');
                }
                finalPatterns.push(globPattern
                    .replace(toReplace, foldersArray.join('/'))
                    .replace(/\/\//g, '/'));
            }
            else {
                finalPatterns.push(globPattern);
            }
            let pathes = [];
            finalPatterns.forEach((pattern) => {
                pathes = pathes.concat(glob_1.default.sync(pattern, Object.assign({ cwd: finalRootDir }, settings)));
            });
            // check if need to search for inline content
            if (searchReg) {
                pathes = pathes.filter((path) => {
                    if (directory_1.default(path))
                        return false;
                    const content = fs_1.default.readFileSync(`${finalRootDir}/${path}`, 'utf8');
                    const matches = content.match(searchReg);
                    if (matches) {
                        return true;
                    }
                    return false;
                });
            }
            pathes
                .map((path) => {
                return path.split('/').slice(1).join('/');
            })
                .forEach((path) => {
                const sFile = new SFile_1.default(path, {
                    rootDir
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxvRUFBOEM7QUFDOUMsbUVBQTZDO0FBQzdDLGdEQUEwQjtBQUMxQix3REFBa0M7QUFFbEMsc0RBQWtDO0FBRWxDLDRDQUFzQjtBQUN0Qix3REFBaUM7QUFDakMsZ0VBQTRDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDdEMsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsSUFBSTtTQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQzVCLFdBQVcsRUFDWCxTQUFTLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUVwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdB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