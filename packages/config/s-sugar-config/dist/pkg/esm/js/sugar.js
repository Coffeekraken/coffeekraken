import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
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
        var _a, _b;
        if (SSugarConfig._finalConfig)
            return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = __deepMerge(
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFZO0lBRTdCLE1BQU0sS0FBSyxXQUFXOztRQUNsQixJQUFJLFlBQVksQ0FBQyxZQUFZO1lBQUUsT0FBTyxZQUFZLENBQUMsWUFBWSxDQUFDO1FBQ2hFLFlBQVksQ0FBQyxZQUFZLEdBQUcsV0FBVztRQUNuQyxhQUFhO1FBQ2IsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSywwQ0FBRSxNQUFNLG1DQUFJLEVBQUUsQ0FDbkMsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlO1FBQ3RCLGFBQWE7UUFDYixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsS0FBVTtRQUNsQyxhQUFhO1FBQ2IsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNKIn0=