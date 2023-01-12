import { __deepMerge, __get } from '@coffeekraken/sugar/object';
import __set from '@coffeekraken/sugar/shared/object/set';
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
export default class SSugarConfig {
    static get finalConfig() {
        var _a, _b, _c;
        if (SSugarConfig._finalConfig)
            return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = __deepMerge(
        // @ts-ignore
        (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.config) !== null && _c !== void 0 ? _c : {});
        return SSugarConfig._finalConfig;
    }
    /**
     * @name        config
     * @type        ISSugarConfig
     * @get
     *
     * Simple config accessor to access directly the config object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get config() {
        return this.get('.');
    }
    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access your configurations
     *
     * @param       {String}            [dotpath='.']             The dotpath representing the configuration you want to access
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath = '.') {
        // @ts-ignore
        return __get(SSugarConfig.finalConfig, dotpath);
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
        return __set(SSugarConfig.finalConfig, dotpath, value);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFJMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQVk7SUFFN0IsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLElBQUksWUFBWSxDQUFDLFlBQVk7WUFBRSxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDaEUsWUFBWSxDQUFDLFlBQVksR0FBRyxXQUFXO1FBQ25DLGFBQWE7UUFDYixNQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLE1BQU0sbUNBQUksRUFBRSxDQUNwQyxDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLGFBQWE7UUFDYixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsS0FBVTtRQUNsQyxhQUFhO1FBQ2IsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNKIn0=