"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SEnv_js_1 = __importDefault(require("../shared/SEnv.js"));
/**
 * @name            SEnv
 * @namespace       node
 * @type            Class
 * @platform            node
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
class SEnv extends SEnv_js_1.default {
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
        process.env.ENV = process.env.NODE_ENV;
        process.env.PLATFORM = 'node';
        // TARGET: 'development' | 'production'
        return process.env;
    }
}
exports.default = SEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0VBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILGFBQWE7QUFDYixNQUFxQixJQUFLLFNBQVEsaUJBQU07SUFDcEM7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxHQUFHO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzlCLHVDQUF1QztRQUN2QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBbEJELHVCQWtCQyJ9