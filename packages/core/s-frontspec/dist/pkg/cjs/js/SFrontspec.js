"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const object_1 = require("@coffeekraken/sugar/object");
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
class SFrontspec extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
        this._frontspec = (0, object_1.__deepMerge)((_d = (_c = (_b = document.env) === null || _b === void 0 ? void 0 : _b.SUGAR) === null || _c === void 0 ? void 0 : _c.frontspec) !== null && _d !== void 0 ? _d : {}, (_f = (_e = document.env) === null || _e === void 0 ? void 0 : _e.FRONTSPEC) !== null && _f !== void 0 ? _f : {}, frontspec);
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
        return (0, object_1.__get)(this._frontspec, dotpath);
    }
}
exports.default = SFrontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyx1REFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFFSCxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFrQzVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBa0MsRUFBRSxRQUFhOztrQ0FBakQsRUFBQSxrQkFBWSxNQUFNLENBQUMsU0FBUyxtQ0FBSSxFQUFFO2lDQUFFLEVBQUEsYUFBYTtRQUN6RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxZQUFZO2FBQ25CO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBaENOOzs7Ozs7Ozs7V0FTRztRQUNLLGVBQVUsR0FBRyxFQUFFLENBQUM7UUF1QnBCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBQSxvQkFBVyxFQUN6QixNQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLFNBQVMsbUNBQUksRUFBRSxFQUNwQyxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsU0FBUyxtQ0FBSSxFQUFFLEVBQzdCLFNBQVMsQ0FDWixDQUFDO0lBQ04sQ0FBQztJQTdDRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUMvQztRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBMENEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDckIsT0FBTyxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQTdFRCw2QkE2RUMifQ==