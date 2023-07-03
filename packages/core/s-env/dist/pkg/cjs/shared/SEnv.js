"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("@coffeekraken/sugar/string");
// @ts-ignore
try {
    if (document && !document.env) {
        // @ts-ignore
        document.env = {
            SUGAR: {},
        };
    }
}
catch (e) { }
/**
 * @name            SEnv
 * @namespace       shared
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
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
 * @snippet         __SEnv.get($1)
 * @snippet         __SEnv.is($1)
 *
 * @example         js
 * import __SEnv from '@coffeekraken/s-env';
 * __SEnv.get('something');
 * __SEnv.is('prod');
 * __SEnv.is('production');
 * __SEnv.is('development');
 * // etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// @ts-ignore
class SEnv {
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
        // verbose
        if (env === 'verbose') {
            if (this.get('verbose')) {
                return true;
            }
        }
        // developers cut
        if (env === 'devscut') {
            if (this.get('devsCut')) {
                return true;
            }
        }
        // aliases
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
        // default
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
        return (0, string_1.__parse)(this.env[(0, string_1.__snakeCase)(name).toUpperCase()]);
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
        this.env[(0, string_1.__snakeCase)(name).toUpperCase()] = value;
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
        delete this.env[(0, string_1.__snakeCase)(name).toUpperCase()];
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdURBQWtFO0FBRWxFLGFBQWE7QUFDYixJQUFJO0lBQ0EsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1FBQzNCLGFBQWE7UUFDYixRQUFRLENBQUMsR0FBRyxHQUFHO1lBQ1gsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO0tBQ0w7Q0FDSjtBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsYUFBYTtBQUNiLE1BQXFCLElBQUk7SUFDckI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVztRQUNqQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXhCLFVBQVU7UUFDVixJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsVUFBVTtRQUNWLElBQUksR0FBRyxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxhQUFhO2dCQUM5RCxPQUFPLElBQUksQ0FBQztTQUNuQjthQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxZQUFZO2dCQUM5RCxPQUFPLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUNsQztRQUVELFVBQVU7UUFDVixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUNuQixhQUFhO1FBQ2IsT0FBTyxJQUFBLGdCQUFPLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUF4R0QsdUJBd0dDIn0=