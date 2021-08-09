import __isNode from '@coffeekraken/sugar/shared/is/node';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.constructed = true;
        // Set environment
        SEnv.set('environment', (_d = (_b = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== null && _b !== void 0 ? _b : (_c = window === null || window === void 0 ? void 0 : window.env) === null || _c === void 0 ? void 0 : _c.ENV) !== null && _d !== void 0 ? _d : 'dev');
        SEnv.set('env', (_h = (_f = (_e = process === null || process === void 0 ? void 0 : process.env) === null || _e === void 0 ? void 0 : _e.NODE_ENV) !== null && _f !== void 0 ? _f : (_g = window === null || window === void 0 ? void 0 : window.env) === null || _g === void 0 ? void 0 : _g.ENV) !== null && _h !== void 0 ? _h : 'dev');
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
/**
 * @name        packageJson
 * @type        Object
 * @static
 *
 * Access the package.json content from the current package the process
 * runs in.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SEnv.packageJson = __packageJsonSync();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUM5QixhQUFhO0lBQ2IsTUFBTSxDQUFDLEdBQUcsR0FBRztRQUNYLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztDQUNIOztJQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLElBQUk7SUFHdkIsTUFBTSxDQUFDLFNBQVM7O1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE1BQUEsTUFBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLDBDQUFFLFFBQVEsbUNBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLEtBQUssQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQUEsTUFBQSxNQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLDBDQUFFLFFBQVEsbUNBQUksTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gs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