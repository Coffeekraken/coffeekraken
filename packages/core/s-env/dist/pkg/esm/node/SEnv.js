import __SEnv from '../shared/SEnv.js';
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
export default class SEnv extends __SEnv {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLG1CQUFtQixDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLElBQUssU0FBUSxNQUFNO0lBQ3BDOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssR0FBRztRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUM5Qix1Q0FBdUM7UUFDdkMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7Q0FDSiJ9