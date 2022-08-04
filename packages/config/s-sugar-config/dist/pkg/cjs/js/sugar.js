"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
/**
 * @name                SSugarConfig
 * @namespace           js
 * @type                Class
 * @platform            js
 * @status              beta
 *
 * This class allows you to access your sugar configurations that are
 * injected into the page by the @coffeekraken/s-vite-sugar-plugin
 *
 * @example         js
 * import __SSugarConfig from '@coffeekraken/s-sugar-config';
 * __SSugarConfig.get('something.cool');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarConfig {
    static get finalConfig() {
        var _a, _b;
        if (SSugarConfig._finalConfig)
            return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = (0, deepMerge_1.default)(
        // @ts-ignore
        (_b = (_a = document.env.SUGAR) === null || _a === void 0 ? void 0 : _a.config) !== null && _b !== void 0 ? _b : {});
        return SSugarConfig._finalConfig;
    }
    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access your configurations
     *
     * @param       {String}            dotpath             The dotpath representing the configuration you want to access
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath) {
        // @ts-ignore
        return (0, get_1.default)(SSugarConfig.finalConfig, dotpath);
    }
    /**
     * @name            set
     * @type            Function
     * @static
     *
     * This static method allows you to set a configuration value
     *
     * @param       {String}            dotpath             The dotpath representing the configuration you want to access
     * @param       {any}               value               The value you want to set
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static set(dotpath, value) {
        // @ts-ignore
        return (0, set_1.default)(SSugarConfig.finalConfig, dotpath, value);
    }
}
exports.default = SSugarConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLGdGQUEwRDtBQUMxRCxnRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFxQixZQUFZO0lBRTdCLE1BQU0sS0FBSyxXQUFXOztRQUNsQixJQUFJLFlBQVksQ0FBQyxZQUFZO1lBQUUsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ2hFLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBQSxtQkFBVztRQUNuQyxhQUFhO1FBQ2IsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSywwQ0FBRSxNQUFNLG1DQUFJLEVBQUUsQ0FDbkMsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlO1FBQ3RCLGFBQWE7UUFDYixPQUFPLElBQUEsYUFBSyxFQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFVO1FBQ2xDLGFBQWE7UUFDYixPQUFPLElBQUEsYUFBSyxFQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSjtBQS9DRCwrQkErQ0MifQ==