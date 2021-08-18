import __isNode from '@coffeekraken/sugar/shared/is/node';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
// @ts-ignore
if (!__isNode() && !window.env) {
    // @ts-ignore
    window.env = {
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
 * SEnv.is('dev');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
export default class SEnv {
    static get env() {
        var _a, _b, _c, _d, _e, _f;
        if (this._env)
            return this._env;
        if (__isNode()) {
            this._env = {
                ENVIRONMENT: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'dev',
                ENV: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'dev',
                PLATFORM: 'node',
            };
        }
        else {
            this._env = {
                ENVIRONMENT: (_d = (_c = window === null || window === void 0 ? void 0 : window.env) === null || _c === void 0 ? void 0 : _c.ENV) !== null && _d !== void 0 ? _d : 'dev',
                ENV: (_f = (_e = window === null || window === void 0 ? void 0 : window.env) === null || _e === void 0 ? void 0 : _e.ENV) !== null && _f !== void 0 ? _f : 'dev',
                PLATFORM: 'browser',
            };
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static delete(name) {
        delete SEnv.env[name.toUpperCase()];
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNFbnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUM1QixhQUFhO0lBQ2IsTUFBTSxDQUFDLEdBQUcsR0FBRztRQUNULEtBQUssRUFBRSxFQUFFO0tBQ1osQ0FBQztDQUNMOztJQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLElBQUk7SUFhckIsTUFBTSxLQUFLLEdBQUc7O1FBQ1YsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLFFBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRztnQkFDUixXQUFXLEVBQUUsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsbUNBQUksS0FBSztnQkFDMUMsR0FBRyxFQUFFLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLG1DQUFJLEtBQUs7Z0JBQ2xDLFFBQVEsRUFBRSxNQUFNO2FBQ25CLENBQUM7U0FDTDthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksR0FBRztnQkFDUixXQUFXLEVBQUUsTUFBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxHQUFHLDBDQUFFLEdBQUcsbUNBQUksS0FBSztnQkFDdEMsR0FBRyxFQUFFLE1BQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLEtBQUs7Z0JBQzlCLFFBQVEsRUFBRSxTQUFTO2FBQ3RCLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLElBQUksR0FBRyxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxhQUFhO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ25HO2FBQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxJQUFJLEdBQUcsS0FBSyxZQUFZLEVBQUU7WUFDL0MsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFlBQVk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDbkc7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDMUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUNuQixhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOztBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFDSSxnQkFBVyxHQUFHLGlCQUFpQixFQUFFLENBQUMifQ==