"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = resolveGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvbHZlR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLG9FQUE4QztBQUM5QyxtRUFBNkM7QUFDN0MsZ0RBQTBCO0FBQzFCLHdEQUFrQztBQUVsQyxzREFBa0M7QUFFbEMsNENBQXNCO0FBQ3RCLHdEQUFpQztBQUNqQyxnRUFBNEM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsT0FBTyxJQUFJLGtCQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFDNUIsV0FBVyxFQUNYLFNBQVMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1lBRXBDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FB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