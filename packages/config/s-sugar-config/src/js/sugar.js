import __get from '@coffeekraken/sugar/shared/object/get';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarConfig {
    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access your configurations
     *
     * @param       {String}            dotpath             The dotpath representing the configuration you want to access
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get(dotpath) {
        var _a, _b, _c;
        // @ts-ignore
        return __get((_c = (_b = (_a = window.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.config) !== null && _c !== void 0 ? _c : {}, dotpath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBWTtJQUM3Qjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQWU7O1FBQ3RCLGFBQWE7UUFDYixPQUFPLEtBQUssQ0FBQyxNQUFBLE1BQUEsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLE1BQU0sbUNBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSiJ9