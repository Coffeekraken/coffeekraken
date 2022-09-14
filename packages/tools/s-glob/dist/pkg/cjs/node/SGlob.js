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
        return (0, glob_1.__resolveGlob)(globs, settings);
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
        settings = (0, object_1.__deepMerge)(this.settings, settings);
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
        settings = (0, object_1.__deepMerge)(this.settings, {}, settings);
        const files = this.resolve(this._globs, settings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3QyxrRUFBeUM7QUFDekMsK0NBQW9EO0FBQ3BELG1EQUEyRjtBQUMzRiwrQ0FBa0Q7QUFFbEQsdURBQXlEO0FBQ3pELDREQUFzQztBQWtDdEMsTUFBcUIsS0FBTSxTQUFRLGlCQUFRO0lBa0l2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQXdCLEVBQ3hCLFdBQW9DLEVBQUU7UUFFdEMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUCxFQUFFLEVBQ0YsUUFBUSxDQUNYLENBQ0osQ0FBQztRQXBKTjs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBMklWLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUExSUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBQSxhQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUNWLEtBQUssRUFDTCxXQUEwQyxFQUFFO1FBRTVDLE9BQU8sSUFBQSxvQkFBYSxFQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FDWCxLQUF3QixFQUN4QixNQUFjLEVBQ2QsV0FBMEMsRUFBRTtRQUU1QyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsT0FBTyxL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