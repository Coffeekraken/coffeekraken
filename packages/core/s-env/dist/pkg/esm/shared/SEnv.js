import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// @ts-ignore
if (!__isNode() && !document.env) {
    // @ts-ignore
    document.env = {
        SUGAR: {},
    };
}
else
    process.env.SUGAR = JSON.stringify({});
/**
 * @name            SEnv
 * @namespace       s-env.shared
 * @type            Class
 *
 * This class allows you to access, set and update environment variables seemlessly on node
 * and browser env.
 * You can also check if the environment is a dev one or a production using the
 * helpfull ```is``` function like so: ```sEnv.is('prod')```
 *
 * @todo         doc
 * @todo        tests
 * @todo        add possibility to set a "details" on each rules for better returns
 *
 * @example         js
 * import SEnv from '@coffeekraken/s-env';
 * this.get('something');
 * SEnv.is('prod');
 * SEnv.is('production');
 * SEnv.is('development');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// @ts-ignore
export default class SEnv {
    static get env() {
        var _a, _b, _c, _d, _e, _f, _g;
        if (this._env)
            return this._env;
        if (__isNode()) {
            this._env = {
                ENVIRONMENT: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development',
                ENV: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development',
                PLATFORM: 'node',
            };
        }
        else {
            // @ts-ignore
            const inDocumentEnv = (_c = document.env) !== null && _c !== void 0 ? _c : {};
            this._env = __deepMerge({
                // @ts-ignore
                ENVIRONMENT: (_e = (_d = document === null || document === void 0 ? void 0 : document.env) === null || _d === void 0 ? void 0 : _d.ENV) !== null && _e !== void 0 ? _e : 'development',
                // @ts-ignore
                ENV: (_g = (_f = document === null || document === void 0 ? void 0 : document.env) === null || _f === void 0 ? void 0 : _f.ENV) !== null && _g !== void 0 ? _g : 'development',
                PLATFORM: 'browser',
            }, inDocumentEnv);
        }
        return this._env;
    }
    /**
     * @name        is
     * @type        Function
     * @static
     *
     * This static method allows you to check if the environment
     * is "dev", "development", "prod" or "production"
     *
     * @param     {String}      env       The environment you want to check
     * @return    {Boolean}               true if is the passed environment, false if not
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static is(env) {
        env = env.toLowerCase();
        if (env === 'dev' || env === 'development') {
            if (this.get('env') === 'dev' || this.get('env') === 'development')
                return true;
        }
        else if (env === 'prod' || env === 'production') {
            if (this.get('env') === 'prod' || this.get('env') === 'production')
                return true;
        }
        else {
            return this.get('env') === env;
        }
        return false;
    }
    /**
     * @name        get
     * @type        Function
     * @static
     *
     * This static method allows you to access an env variable.
     * The variables keys are stored in UPPERCASE but you can use lowercase as well
     *
     * @param     {String}      name       The variable name you want to get back
     * @return    {Any}                   The variable getted or undefined
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(name) {
        // @ts-ignore
        return this.env[name.toUpperCase()];
    }
    /**
     * @name        set
     * @type        Function
     * @static
     *
     * This static method allows you to set an env variable.
     * The variables keys are stored in UPPERCASE but you can use lowercase as well
     *
     * @param     {String}     name       The variable name you want to get back
     * @param     {Any}         value     The value you want to set
     * @return    {Any}                  The value setted
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static set(name, value) {
        SEnv.env[name.toUpperCase()] = value;
        return value;
    }
    /**
     * @name        delete
     * @type        Function
     * @static
     *
     * This static method allows you to delete an env variable.
     * The variables keys are stored in UPPERCASE but you can use lowercase as well
     *
     * @param     {String}     name       The variable name you want to get back
     * @param     {Any}         value     The value you want to set
     * @return    {Any}                  The value setted
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static delete(name) {
        delete SEnv.env[name.toUpperCase()];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLGFBQWE7QUFDYixJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO0lBQzlCLGFBQWE7SUFDYixRQUFRLENBQUMsR0FBRyxHQUFHO1FBQ1gsS0FBSyxFQUFFLEVBQUU7S0FDWixDQUFDO0NBQ0w7O0lBQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLE9BQU8sSUFBSTtJQWFyQixNQUFNLEtBQUssR0FBRzs7UUFDVixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxNQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxtQ0FBSSxhQUFhO2dCQUNsRCxHQUFHLEVBQUUsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsbUNBQUksYUFBYTtnQkFDMUMsUUFBUSxFQUFFLE1BQU07YUFDbkIsQ0FBQztTQUNMO2FBQU07WUFDSCxhQUFhO1lBQ2IsTUFBTSxhQUFhLEdBQUcsTUFBQSxRQUFRLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQ25CO2dCQUNJLGFBQWE7Z0JBQ2IsV0FBVyxFQUFFLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLGFBQWE7Z0JBQ2hELGFBQWE7Z0JBQ2IsR0FBRyxFQUFFLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLGFBQWE7Z0JBQ3hDLFFBQVEsRUFBRSxTQUFTO2FBQ3RCLEVBQ0QsYUFBYSxDQUNoQixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQVc7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtZQUN4QyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssYUFBYTtnQkFDOUQsT0FBTyxJQUFJLENBQUM7U0FDbkI7YUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtZQUMvQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssWUFBWTtnQkFDOUQsT0FBTyxJQUFJLENBQUM7U0FDbkI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUNuQixhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0oifQ==