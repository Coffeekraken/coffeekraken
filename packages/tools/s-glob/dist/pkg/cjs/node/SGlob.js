"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const resolveGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/resolveGlob"));
const extractGlob_1 = __importDefault(require("@coffeekraken/sugar/shared/glob/extractGlob"));
const extractNoneGlob_1 = __importDefault(require("@coffeekraken/sugar/shared/glob/extractNoneGlob"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const micromatch_1 = __importDefault(require("micromatch"));
class SGlob extends s_class_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(globs, settings = {}) {
        super((0, deepMerge_1.default)({}, settings));
        /**
         * @name            _globs
         * @type            Array<String>
         * @private
         *
         * Store the instance globs
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._globs = null;
        this._globs = Array.isArray(globs) ? globs : [globs];
    }
    /**
     * @name                isGlob
     * @type                Function
     * @static
     *
     * Alias to the ```isGlob``` function available in sugar under "shared.is.isGlob" namespace
     *
     * @param       {String}        glob        The string to check
     * @return    {Boolean}                   true if is a glob, false if not
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isGlob(glob) {
        return (0, glob_1.default)(glob);
    }
    /**
     * @name                resolve
     * @type                Function
     * @static
     *
     * Alias to the ```resolveGlob``` function available in sugar under "node.glob.resolveGlob"
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
     * @return      {SFile[]|string[]}                                An array of SFile instances or string if is a directory
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolve(globs, settings = {}) {
        return (0, resolveGlob_1.default)(globs, settings);
    }
    /**
     * @name                copySync
     * @type                Function
     * @static
     *
     * This static method allows you to specify a glob to select files as well as an output directory where to put these files in.
     * Note that the settings.cwd will be used to create the relative to outDir pathes.
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {String}                        outDir      The output directory where to put the files
     * @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
     * @return      {SFile[]|string[]}                                An array of SFile instances or string if is a directory
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static copySync(globs, outDir, settings = {}) {
        const sGlob = new SGlob(globs, settings);
        return sGlob.copySync(outDir);
    }
    /**
     * @name                match
     * @type                Function
     * @static
     *
     * Check if the passed string match the passed glob pattern(s).
     * This make use of the AWESOME micromatch library.
     *
     * @param       {String}            path            The path to check
     * @param       {String|Array<String>}          globs        The glob pattern(s) to check files match for
     * @return          {Boolean}               true if match, false if not
     *
     * @see         https://www.npmjs.com/package/micromatch
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static match(path, globs) {
        return micromatch_1.default.isMatch(path, globs);
    }
    /**
     * @name                extractGlob
     * @type                Function
     * @static
     *
     * This function simply return you the glob part of a passed string
     *
     * @param       {String}            string          The string from which to extract the glob part
     * @return      {String}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static extractGlob(string) {
        return (0, extractGlob_1.default)(string);
    }
    /**
     * @name                extractNoneGlob
     * @type                Function
     * @static
     *
     * This function simply return you the none glob part of the passed string
     *
     * @param       {String}            string          The string from which to extract the none glob part
     * @return      {String}                            The none glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static extractNoneGlob(string) {
        return (0, extractNoneGlob_1.default)(string);
    }
    /**
     * @name                resolve
     * @type                Function
     * @async
     * @private
     *
     * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
     *
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SFile[]|string[]}                                 An array of SFile instances or string if is a folder
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolve(settings = {}) {
        settings = (0, deepMerge_1.default)(this.settings, settings);
        return SGlob.resolve(this._globs, settings);
    }
    /**
     * @name                copySync
     * @type                Function
     * @static
     *
     * This method allows you to specify a glob to select files as well as an output directory where to put these files in.
     * Note that the settings.cwd will be used to create the relative to outDir pathes.
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {String}                        outDir      The output directory where to put the files
     * @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
     * @return      {SFile[]|string[]}                                An array of SFile instances or string if is a directory
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    copySync(outDir, settings = {}) {
        settings = (0, deepMerge_1.default)(this.settings, {}, settings);
        const files = this.resolve(this._globs, settings);
        const copiedFiles = [];
        for (let [key, file] of Object.entries(files)) {
            const outPath = `${outDir}/${file.relPath}`;
            (0, copySync_1.default)(file.path, outPath);
            if (settings.SFile) {
                copiedFiles.push(s_file_1.default.new(outPath));
            }
            else {
                copiedFiles.push(`${outDir}/${file.relPath}`);
            }
        }
        return copiedFiles;
    }
    /**
     * @name                extractGlob
     * @type                Function
     *
     * This function simply return you the glob part of the glob(s) passed in constructor
     *
     * @return      {String|Array<String>}                            The glob part of the glob(s) passed in constructor. If multiple globs, return an Array, otherwise a simple string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    extractGlob() {
        if (this._globs.length === 1) {
            return SGlob.extractGlob(this._globs[0]);
        }
        return this._globs.map((glob) => {
            SGlob.extractGlob(glob);
        });
    }
    /**
     * @name                extractNoneGlob
     * @type                Function
     *
     * This function simply return you the none glob part of the glob(s) passed in constructor
     *
     * @return      {String|Array<String>}                            The none glob part of the glob(s) passed in constructor. If multiple globs, return an Array, otherwise a simple string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    extractNoneGlob() {
        if (this._globs.length === 1) {
            return SGlob.extractNoneGlob(this._globs[0]);
        }
        return this._globs.map((glob) => {
            SGlob.extractNoneGlob(glob);
        });
    }
}
exports.default = SGlob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QyxrRUFBeUM7QUFDekMsb0ZBQThEO0FBRTlELDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUsc0dBQWdGO0FBQ2hGLDhFQUEwRDtBQUMxRCw0RkFBc0U7QUFDdEUsNERBQXNDO0FBa0N0QyxNQUFxQixLQUFNLFNBQVEsaUJBQVE7SUFrSXZDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBd0IsRUFDeEIsV0FBb0MsRUFBRTtRQUV0QyxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUNQLEVBQUUsRUFDRixRQUFRLENBQ1gsQ0FDSixDQUFDO1FBcEpOOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBRyxJQUFJLENBQUM7UUEySVYsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQTFJRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDdEIsT0FBTyxJQUFBLGNBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQ1YsS0FBSyxFQUNMLFdBQTBDLEVBQUU7UUFFNUMsT0FBTyxJQUFBLHFCQUFhLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUNYLEtBQXdCLEVBQ3hCLE1BQWMsRUFDZCxXQUEwQyxFQUFFO1FBRTVDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxR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