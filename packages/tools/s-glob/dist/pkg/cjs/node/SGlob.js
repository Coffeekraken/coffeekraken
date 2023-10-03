"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const fs_1 = require("@coffeekraken/sugar/fs");
const glob_1 = require("@coffeekraken/sugar/glob");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const micromatch_1 = __importDefault(require("micromatch"));
class SGlob extends s_class_1.default {
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
        return (0, is_1.__isGlob)(glob);
    }
    /**
     * @name                resolveSync
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
    static resolveSync(globs, settings = {}) {
        return (0, glob_1.__resolveGlobSync)(globs, settings);
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
        return (0, glob_1.__extractGlob)(string);
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
        return (0, glob_1.__extractNoneGlob)(string);
    }
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
        super((0, object_1.__deepMerge)({}, settings));
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
    resolveSync(settings = {}) {
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        return SGlob.resolveSync(this._globs, settings);
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
        settings = (0, object_1.__deepMerge)(this.settings, {}, settings);
        const files = this.resolveSync(this._globs, settings);
        const copiedFiles = [];
        for (let [key, file] of Object.entries(files)) {
            const outPath = `${outDir}/${file.relPath}`;
            (0, fs_1.__copySync)(file.path, outPath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QyxrRUFBeUM7QUFDekMsK0NBQW9EO0FBRXBELG1EQUErRjtBQUMvRiwrQ0FBa0Q7QUFDbEQsdURBQXlEO0FBQ3pELDREQUFzQztBQWtDdEMsTUFBcUIsS0FBTSxTQUFRLGlCQUFRO0lBYXZDOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUN0QixPQUFPLElBQUEsYUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FDZCxLQUFLLEVBQ0wsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLElBQUEsd0JBQWlCLEVBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUNYLEtBQXdCLEVBQ3hCLE1BQWMsRUFDZCxXQUEwQyxFQUFFO1FBRTVDLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6QyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBWSxFQUFFLEtBQXdCO1FBQy9DLE9BQU8sb0JBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDN0IsT0FBTyxJQUFBLG9CQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FB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