"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const resolveGlob_1 = __importDefault(require("./resolveGlob"));
const extractGlob_1 = __importDefault(require("../../shared/glob/extractGlob"));
const extractNoneGlob_1 = __importDefault(require("../../shared/glob/extractNoneGlob"));
/**
 * @name                SGlob
 * @namespace            node.glob
 * @type                Class
 * @status              beta
 *
 * This class represent a glob pattern and can be used to resolve some globs and get back
 * an array of SFile instances or to extract some part of the pattern, etc...
 *
 * @param           {String|Array<String>}          globs            The glob pattern(s) you want to use with this instance
 * @param           {Object}                [settings={}]           An object of settings to configure your glob instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SGlob from '@coffeekraken/sugar/node/glob/SGlob';
 * const glob = new SGlob('my/cool/glob/*.js');
 * const files = glob.resolve();
 * SGlob.resolve('my/cool/glob/*.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SGlob {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @since          2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(globs, settings = {}) {
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the instance settings
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name            _globs
         * @type            Array<String>
         * @private
         *
         * Store the instance globs
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._globs = null;
        this._settings = deepMerge_1.default({}, settings);
        this._globs = Array.isArray(globs) ? globs : [globs];
    }
    /**
     * @name                resolve
     * @type                Function
     * @static
     *
     * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static resolve(globs, settings = {}) {
        return resolveGlob_1.default(globs, settings);
    }
    /**
     * @name                extractGlob
     * @type                Function
     * @static
     *
     * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
     *
     * @param       {String}            string          The string from which to extract the glob part
     * @return      {String}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static extractGlob(string) {
        return extractGlob_1.default(string);
    }
    /**
     * @name                extractNoneGlob
     * @type                Function
     * @static
     *
     * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
     *
     * @param       {String}            string          The string from which to extract the none glob part
     * @return      {String}                            The none glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static extractNoneGlob(string) {
        return extractNoneGlob_1.default(string);
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
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    resolve(settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        return SGlob.resolve(this._globs, settings);
    }
    /**
     * @name                extractGlob
     * @type                Function
     *
     * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
     *
     * @return      {String|Array<String>}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
     *
     * @return      {String|Array<String>}                            The glob part of the passed string
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw4RUFBd0Q7QUFDeEQsZ0VBQTBDO0FBQzFDLGdGQUEwRDtBQUMxRCx3RkFBa0U7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQXFCLEtBQUs7SUE2RXhCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBdEZoQzs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWY7Ozs7Ozs7OztXQVNHO1FBQ0gsV0FBTSxHQUFHLElBQUksQ0FBQztRQWlFWixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFqRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2pDLE9BQU8scUJBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTTtRQUN2QixPQUFPLHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTTtRQUMzQixPQUFPLHlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFpQkQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNuQixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlCLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0SkQsd0JBc0pDIn0=