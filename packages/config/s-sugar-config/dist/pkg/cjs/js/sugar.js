"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
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
        SSugarConfig._finalConfig = (0, object_1.__deepMerge)(
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
        return (0, object_1.__get)(SSugarConfig.finalConfig, dotpath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdURBQWdFO0FBQ2hFLGdGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLFlBQVk7SUFFN0IsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLElBQUksWUFBWSxDQUFDLFlBQVk7WUFBRSxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDaEUsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFBLG9CQUFXO1FBQ25DLGFBQWE7UUFDYixNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLE1BQU0sbUNBQUksRUFBRSxDQUNuQyxDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQWU7UUFDdEIsYUFBYTtRQUNiLE9BQU8sSUFBQSxjQUFLLEVBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBZSxFQUFFLEtBQVU7UUFDbEMsYUFBYTtRQUNiLE9BQU8sSUFBQSxhQUFLLEVBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNKO0FBL0NELCtCQStDQyJ9