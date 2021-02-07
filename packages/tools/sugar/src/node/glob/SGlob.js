"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const resolveGlob_1 = __importDefault(require("./resolveGlob"));
const extractGlob_1 = __importDefault(require("./extractGlob"));
const extractNoneGlob_1 = __importDefault(require("./extractNoneGlob"));
module.exports = class SGlob {
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
     * @async
     * @static
     *
     * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
     *
     * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
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
     * @param       {String}            string          The string from which to extract the glob part
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
     * @param       {String}            string          The string from which to extract the none glob part
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
     * @param       {Object}            [settings={}]           An object of settings to configure your glob process
     * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTR2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLG9FQUE4QztBQUM5QyxnRUFBMEM7QUFDMUMsZ0VBQTBDO0FBQzFDLHdFQUFrRDtBQTJCbEQsaUJBQVMsTUFBTSxLQUFLO0lBOEVsQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQXZGaEM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILFdBQU0sR0FBRyxJQUFJLENBQUM7UUFrRVosSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBbEVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDakMsT0FBTyxxQkFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQ3ZCLE9BQU8scUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNO1FBQzNCLE9BQU8seUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWlCRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ25CLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE9BQU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzVCLE9BQU8sS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDIn0=