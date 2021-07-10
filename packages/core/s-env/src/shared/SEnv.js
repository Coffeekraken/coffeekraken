import __isNode from '@coffeekraken/sugar/shared/is/node';
// @ts-ignore
if (!__isNode() && !window.env) {
    // @ts-ignore
    window.env = {
        SUGAR: {}
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
 * SEnv.is('dev');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
export default class SEnv {
    static construct() {
        var _a, _b, _c, _d;
        this.constructed = true;
        // Set environment
        SEnv.set('environment', (_d = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : (_c = window === null || window === void 0 ? void 0 : window.env) === null || _c === void 0 ? void 0 : _c.ENV) !== null && _d !== void 0 ? _d : 'dev');
    }
    /**
     * @name        env
     * @type        Object
     * @static
     *
     * Store the actual environment variables object. In node it will be process.env, in the browser,
     * window.env
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get env() {
        if (!this.constructed)
            this.construct();
        // @ts-ignore
        if (__isNode())
            return JSON.parse(process.env.SUGAR);
        // @ts-ignore
        return window.env.SUGAR;
    }
    static set env(value) {
        if (__isNode())
            process.env.SUGAR = JSON.stringify(value);
        // @ts-ignore
        else
            window.env.SUGAR = value;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static is(env) {
        env = env.toLowerCase();
        if (env === 'dev' || env === 'development') {
            if (this.get('environment') === 'dev' || this.get('environment') === 'development')
                return true;
        }
        else if (env === 'prod' || env === 'production') {
            if (this.get('environment') === 'prod' || this.get('environment') === 'production')
                return true;
        }
        else {
            return this.get('environment') === env;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get(name) {
        // @ts-ignore
        return SEnv.env[name.toUpperCase()];
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static set(name, value) {
        // @ts-ignore
        const env = Object.assign({}, SEnv.env);
        // @ts-ignore
        env[name.toUpperCase()] = value;
        // @ts-ignore
        SEnv.env = env;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static delete(name) {
        // @ts-ignore
        const env = Object.assign({}, SEnv.env);
        // @ts-ignore
        delete env[name.toUpperCase()];
        // @ts-ignore
        SEnv.env = env;
    }
}
SEnv.constructed = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFHMUQsYUFBYTtBQUNiLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7SUFDOUIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxHQUFHLEdBQUc7UUFDWCxLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7Q0FDSDs7SUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxJQUFJO0lBR3ZCLE1BQU0sQ0FBQyxTQUFTOztRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFBLE1BQUEsTUFBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRywwQ0FBRSxRQUFRLG1DQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEdBQUcsMENBQUUsR0FBRyxtQ0FBSSxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxHQUFHO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLGFBQWE7UUFDYixJQUFJLFFBQVEsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELGFBQWE7UUFDYixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUs7UUFDbEIsSUFBSSxRQUFRLEVBQUU7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELGFBQWE7O1lBQ1IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFXO1FBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxhQUFhLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLGFBQWE7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDakc7YUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtZQUNqRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssWUFBWTtnQkFBRSxPQUFPLElBQUksQ0FBQztTQUNqRzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUN4QztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVk7UUFDckIsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQVksRUFBRSxLQUFVO1FBQ2pDLGFBQWE7UUFDYixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsYUFBYTtRQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsYUFBYTtRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVk7UUFDeEIsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxhQUFhO1FBQ2IsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0IsYUFBYTtRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7O0FBM0hNLGdCQUFXLEdBQUcsS0FBSyxDQUFDIn0=