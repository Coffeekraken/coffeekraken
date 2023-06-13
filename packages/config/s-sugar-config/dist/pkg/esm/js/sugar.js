import { __deepMerge, __get, __set } from '@coffeekraken/sugar/object';
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
 * @snippet         __SSugarConfig.get($1)
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (SSugarConfig._finalConfig)
            return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = __deepMerge(
        // @ts-ignore
        (_h = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.config) !== null && _c !== void 0 ? _c : (_g = (_f = (_e = (_d = window.top) === null || _d === void 0 ? void 0 : _d.document) === null || _e === void 0 ? void 0 : _e.env) === null || _f === void 0 ? void 0 : _f.SUGAR) === null || _g === void 0 ? void 0 : _g.config) !== null && _h !== void 0 ? _h : {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBSXZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQVk7SUFFN0IsTUFBTSxLQUFLLFdBQVc7O1FBQ2xCLElBQUksWUFBWSxDQUFDLFlBQVk7WUFBRSxPQUFPLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDaEUsWUFBWSxDQUFDLFlBQVksR0FBRyxXQUFXO1FBQ25DLGFBQWE7UUFDYixNQUFBLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsTUFBTSxtQ0FDdkIsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFNLENBQUMsR0FBRywwQ0FBRSxRQUFRLDBDQUFFLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxNQUFNLG1DQUN4QyxFQUFFLENBQ1QsQ0FBQztRQUNGLE9BQU8sWUFBWSxDQUFDLFlBQVksQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBa0IsR0FBRztRQUM1QixhQUFhO1FBQ2IsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBZSxFQUFFLEtBQVU7UUFDbEMsYUFBYTtRQUNiLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSiJ9