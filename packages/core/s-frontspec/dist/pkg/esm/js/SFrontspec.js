// @ts-nocheck
import __SClass from '@coffeekraken/s-class';
import { __deepMerge, __get } from '@coffeekraken/sugar/object';
export default class SFrontspec extends __SClass {
    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your SFrontspec instance and store it into the document.env.SUGAR.frontspec property
     *
     * @return          {SFrontspec}                                    The SFrontspec instance that represent the frontspec.json file
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init() {
        const finalSettings = {};
        let frontspecInstance = new this(finalSettings);
        // set the front in the env.SUGAR.front property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.frontspec = frontspecInstance;
        // return the current theme
        return frontspecInstance;
    }
    /**
     * @name        get
     * @type        Function
     * @static
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath = '.') {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = SFrontspec.init();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }
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
    constructor(frontspec = {}) {
        var _a;
        super(__deepMerge({
            metas: {
                id: 'SFrontspec',
            },
        }));
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
        this.constructor._defaultFrontspecInstance = this;
        this._frontspec = __deepMerge(((_a = document.env) === null || _a === void 0 ? void 0 : _a.FRONTSPEC) ? document.env.FRONTSPEC : {}, frontspec);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBb0NoRSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBRzVDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLElBQUk7UUFDUCxNQUFNLGFBQWEsR0FBNEIsRUFBRSxDQUFDO1FBRWxELElBQUksaUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFaEQsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRztZQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUs7WUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBRWpELDJCQUEyQjtRQUMzQixPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFjRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQVMsR0FBRyxFQUFFOztRQUN0QixLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxZQUFZO2FBQ25CO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUE3Qk47Ozs7Ozs7OztXQVNHO1FBQ0ssZUFBVSxHQUFHLEVBQUUsQ0FBQztRQXFCcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQ3pCLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3JELFNBQVMsQ0FDWixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDckIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0oifQ==