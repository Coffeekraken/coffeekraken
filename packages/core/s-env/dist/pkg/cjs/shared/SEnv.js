"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
// @ts-ignore
if (!(0, node_1.default)() && !document.env) {
    // @ts-ignore
    document.env = {
        SUGAR: {},
    };
}
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
class SEnv {
    /**
     * @name        env
     * @type        Object
     * @static
     *
     * Store the actual environment variables object. In node it will be process.env, in the browser,
     * document.env
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get env() {
        var _a, _b, _c;
        if ((0, node_1.default)()) {
            process.env.ENVIRONMENT = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
            process.env.ENV = process.env.ENVIRONMENT;
            process.env.PLATFORM = 'node';
            return process.env;
        }
        else {
            document.env.ENVIRONMENT = (_c = (_b = document === null || document === void 0 ? void 0 : document.env) === null || _b === void 0 ? void 0 : _b.ENV) !== null && _c !== void 0 ? _c : 'development';
            document.env.ENV = document.env.ENVIRONMENT;
            document.env.PLATFORM = 'browser';
            return document.env;
        }
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
            if (SEnv.get('env') === 'dev' || SEnv.get('env') === 'development')
                return true;
        }
        else if (env === 'prod' || env === 'production') {
            if (SEnv.get('env') === 'prod' || SEnv.get('env') === 'production')
                return true;
        }
        else {
            return SEnv.get('env') === env;
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
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQTBEO0FBRTFELGFBQWE7QUFDYixJQUFJLENBQUMsSUFBQSxjQUFRLEdBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7SUFDOUIsYUFBYTtJQUNiLFFBQVEsQ0FBQyxHQUFHLEdBQUc7UUFDWCxLQUFLLEVBQUUsRUFBRTtLQUNaLENBQUM7Q0FDTDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxhQUFhO0FBQ2IsTUFBcUIsSUFBSTtJQUNyQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLEdBQUc7O1FBQ1YsSUFBSSxJQUFBLGNBQVEsR0FBRSxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsbUNBQUksYUFBYSxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUM5QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDdEI7YUFBTTtZQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsR0FBRywwQ0FBRSxHQUFHLG1DQUFJLGFBQWEsQ0FBQztZQUMvRCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUM1QyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQVc7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtZQUN4QyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssYUFBYTtnQkFDOUQsT0FBTyxJQUFJLENBQUM7U0FDbkI7YUFBTSxJQUFJLEdBQUcsS0FBSyxNQUFNLElBQUksR0FBRyxLQUFLLFlBQVksRUFBRTtZQUMvQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssWUFBWTtnQkFDOUQsT0FBTyxJQUFJLENBQUM7U0FDbkI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDbEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUNuQixhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0o7QUEvR0QsdUJBK0dDIn0=