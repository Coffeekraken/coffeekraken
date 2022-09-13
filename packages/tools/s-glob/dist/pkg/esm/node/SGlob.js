// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import SFile from '@coffeekraken/s-file';
import { __copySync } from '@coffeekraken/sugar/fs';
import { __extractGlob, __extractNoneGlob, __resolveGlob } from '@coffeekraken/sugar/glob';
import { __isGlob } from '@coffeekraken/sugar/is';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __micromatch from 'micromatch';
export default class SGlob extends __SClass {
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
        super(__deepMerge({}, settings));
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
        return __isGlob(glob);
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
        return __resolveGlob(globs, settings);
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
        return __micromatch.isMatch(path, globs);
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
        return __extractGlob(string);
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
        return __extractNoneGlob(string);
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
        settings = __deepMerge(this.settings, settings);
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
        settings = __deepMerge(this.settings, {}, settings);
        const files = this.resolve(this._globs, settings);
        const copiedFiles = [];
        for (let [key, file] of Object.entries(files)) {
            const outPath = `${outDir}/${file.relPath}`;
            __copySync(file.path, outPath);
            if (settings.SFile) {
                copiedFiles.push(SFile.new(outPath));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBa0N0QyxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQU0sU0FBUSxRQUFRO0lBa0l2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQXdCLEVBQ3hCLFdBQW9DLEVBQUU7UUFFdEMsS0FBSyxDQUNELFdBQVcsQ0FDUCxFQUFFLEVBQ0YsUUFBUSxDQUNYLENBQ0osQ0FBQztRQXBKTjs7Ozs7Ozs7O1dBU0c7UUFDSCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBMklWLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUExSUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FDVixLQUFLLEVBQ0wsV0FBMEMsRUFBRTtRQUU1QyxPQUFPLGFBQWEsQ0FBQyxLQUFLLEVBQUUs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