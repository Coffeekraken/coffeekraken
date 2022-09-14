// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import SFile from '@coffeekraken/s-file';
import { __copySync } from '@coffeekraken/sugar/fs';
import { __extractGlob, __extractNoneGlob, __resolveGlob } from '@coffeekraken/sugar/glob';
import { __isGlob } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQWtDdEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFNLFNBQVEsUUFBUTtJQWtJdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUF3QixFQUN4QixXQUFvQyxFQUFFO1FBRXRDLEtBQUssQ0FDRCxXQUFXLENBQ1AsRUFBRSxFQUNGLFFBQVEsQ0FDWCxDQUNKLENBQUM7UUFwSk47Ozs7Ozs7OztXQVNHO1FBQ0gsV0FBTSxHQUFHLElBQUksQ0FBQztRQTJJVixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBMUlEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBWTtRQUN0QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQ1YsS0FBSyxFQUNMLFdBQTBDLEVBQUU7UUFFNUMsT0FBTyxhQUFhLENBQUMs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