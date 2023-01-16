// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge, __get } from '@coffeekraken/sugar/object';
/**
 * @name                SFrontspec
 * @namespace           js
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This class represent the ```frontspec.json``` json that must be either in:
 * 1. The `window.env.SUGAR.frontspec` object
 * 2. The `window.env.FRONTSPEC` object
 * 3. The "frontspec" param of the constructor
 * Each level will be overrided by the upper one using a deepMerge.
 *
 * @param           {Object}        [frontspec={}]          A frontspec formated object
 *
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import __SFrontspec from '@coffeekraken/s-frontspec';
 * const frontspec = new SFrontspec();
 * frontspec.get('partytown.enabled');
 * __SFrontspec.get('partytown.enabled');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontspec extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(frontspec, settings) {
        var _a, _b, _c, _d, _e, _f;
        if (frontspec === void 0) { frontspec = (_a = window.frontspec) !== null && _a !== void 0 ? _a : {}; }
        if (settings === void 0) { settings = {}; }
        super(__deepMerge({
            metas: {
                id: 'SFrontspec',
            },
        }, settings));
        /**
         * @name        _frontspec
         * @type        Object
         * @private
         *
         * Store the actual frontspec object
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._frontspec = {};
        this._frontspec = __deepMerge((_d = (_c = (_b = document.env) === null || _b === void 0 ? void 0 : _b.SUGAR) === null || _c === void 0 ? void 0 : _c.frontspec) !== null && _d !== void 0 ? _d : {}, (_f = (_e = document.env) === null || _e === void 0 ? void 0 : _e.FRONTSPEC) !== null && _f !== void 0 ? _f : {}, frontspec);
    }
    static get(dotpath = '.') {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = new this();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }
    /**
     * @name        get
     * @type        Function
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath = '.') {
        return __get(this._frontspec, dotpath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQWtDNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFrQyxFQUFFLFFBQWE7O2tDQUFqRCxFQUFBLGtCQUFZLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLEVBQUU7aUNBQUUsRUFBQSxhQUFhO1FBQ3pELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7UUFoQ047Ozs7Ozs7OztXQVNHO1FBQ0ssZUFBVSxHQUFHLEVBQUUsQ0FBQztRQXVCcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQ3pCLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsU0FBUyxtQ0FBSSxFQUFFLEVBQ3BDLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxTQUFTLG1DQUFJLEVBQUUsRUFDN0IsU0FBUyxDQUNaLENBQUM7SUFDTixDQUFDO0lBN0NELE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBa0IsR0FBRztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2pDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUEwQ0Q7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsVUFBa0IsR0FBRztRQUNyQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSiJ9