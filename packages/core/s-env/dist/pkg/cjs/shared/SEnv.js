"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const autoCast_1 = __importDefault(require("@coffeekraken/sugar/shared/string/autoCast"));
const snakeCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/snakeCase"));
// @ts-ignore
if (!(0, node_1.default)() && !document.env) {
    // @ts-ignore
    document.env = {
        SUGAR: {},
    };
}
/**
 * @name            SEnv
 * @namespace       shared
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
 * this.is('prod');
 * this.is('production');
 * this.is('development');
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
        return (0, autoCast_1.default)(this.env[(0, snakeCase_1.default)(name).toUpperCase()]);
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
        this.env[(0, snakeCase_1.default)(name).toUpperCase()] = value;
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
        delete this.env[(0, snakeCase_1.default)(name).toUpperCase()];
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQTBEO0FBQzFELDBGQUFvRTtBQUNwRSw0RkFBc0U7QUFFdEUsYUFBYTtBQUNiLElBQUksQ0FBQyxJQUFBLGNBQVEsR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtJQUM5QixhQUFhO0lBQ2IsUUFBUSxDQUFDLEdBQUcsR0FBRztRQUNYLEtBQUssRUFBRSxFQUFFO0tBQ1osQ0FBQztDQUNMO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILGFBQWE7QUFDYixNQUFxQixJQUFJO0lBQ3JCOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQVc7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV4QixpQkFBaUI7UUFDakIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsVUFBVTtRQUNWLElBQUksR0FBRyxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxhQUFhO2dCQUM5RCxPQUFPLElBQUksQ0FBQztTQUNuQjthQUFNLElBQUksR0FBRyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxZQUFZO2dCQUM5RCxPQUFPLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUNsQztRQUVELFVBQVU7UUFDVixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWTtRQUNuQixhQUFhO1FBQ2IsT0FBTyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQVU7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDbEQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0o7QUFqR0QsdUJBaUdDIn0=