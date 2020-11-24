"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const glob_1 = __importDefault(require("glob"));
const SFsFile_1 = __importDefault(require("../fs/SFsFile"));
const glob_2 = __importDefault(require("../is/glob"));
const path_1 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
const to_regex_1 = __importDefault(require("to-regex"));
const directory_1 = __importDefault(require("../is/directory"));
/**
 * @name            resolveGlob
 * @namespace       sugar.node.glob
 * @type            Function
 * @async
 * @beta
 *
 * This function simply resolve the passed glob pattern(s) and resolve his promise
 * with an Array of SFsFile instances to work with
 *
 * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
 * @param       {Object}            [settings={}]           An object of settings to configure your glob process
 * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
 *
 * @setting     {String}        rootDir                     The root directory where to start the glob search process
 * @setting     {Object}        ...glob                     All the glob (https://www.npmjs.com/package/glob) options are supported
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
    return new SPromise_1.default((resolve, reject, trigger, cancel) => {
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
            let rootDir = settings.rootDir, globPattern, searchReg;
            const splits = glob.split(':').map((split) => {
                return split.replace(`${rootDir}/`, '').replace(rootDir, '');
            });
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
                else if (path_1.default(split, true)) {
                    rootDir = split;
                }
            });
            let pathes = glob_1.default.sync(globPattern, Object.assign({ cwd: rootDir }, settings));
            // check if need to search for inline content
            if (searchReg) {
                pathes = pathes.filter((path) => {
                    if (directory_1.default(path))
                        return false;
                    const content = fs_1.default.readFileSync(path, 'utf8');
                    if (searchReg.test(content))
                        return true;
                    return false;
                });
            }
            pathes.forEach((path) => {
                const sFsFile = new SFsFile_1.default(path, {
                    rootDir
                });
                filesArray.push(sFsFile);
            });
        }
        // resolve the promise
        resolve(filesArray);
    }, {
        id: 'resolveGlob'
    });
}
module.exports = resolveGlob;
