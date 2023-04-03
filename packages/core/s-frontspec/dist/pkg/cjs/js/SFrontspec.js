"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
class SFrontspec extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
        this._frontspec = (0, object_1.__deepMerge)(((_a = document.env) === null || _a === void 0 ? void 0 : _a.FRONTSPEC) ? document.env.FRONTSPEC : {}, frontspec);
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
        return (0, object_1.__get)(this._frontspec, dotpath);
    }
}
exports.default = SFrontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBZ0U7QUFvQ2hFLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQUc1Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxJQUFJO1FBQ1AsTUFBTSxhQUFhLEdBQTRCLEVBQUUsQ0FBQztRQUVsRCxJQUFJLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhELGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLO1lBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztRQUVqRCwyQkFBMkI7UUFDM0IsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0RDtRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBY0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFTLEdBQUcsRUFBRTs7UUFDdEIsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLENBQUMsQ0FDTCxDQUFDO1FBN0JOOzs7Ozs7Ozs7V0FTRztRQUNLLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFxQnBCLElBQUksQ0FBQyxXQUFXLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBQSxvQkFBVyxFQUN6QixDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNyRCxTQUFTLENBQ1osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQ3JCLE9BQU8sSUFBQSxjQUFLLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUF0R0QsNkJBc0dDIn0=