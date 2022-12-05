import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __queryStringToObject } from '@coffeekraken/sugar/url';
import __SEnv from '../shared/SEnv';

/**
 * @name            SEnv
 * @namespace       js
 * @type            Class
 *
 * This class allows you to access, set and update environment variables seemlessly on node
 * and browser env.
 * You can also check if the environment is a dev one or a production using the
 * helpfull ```is``` function like so: ```SEnv.is('prod')```
 *
 * @todo        tests
 *
 * @example         js
 * import __SEnv from '@coffeekraken/s-env';
 * this.get('something');
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
    static _env;
    static get env() {
        if (this._env) return this._env;

        const envConfig = __SSugarConfig.get('env');

        const queryStringObj = __queryStringToObject(document.location.search);

        let finalEnv = 'development'; // fallback
        if (envConfig.env) {
            finalEnv = envConfig.env;
        } else if (
            envConfig.envFromLocation &&
            Object.keys(envConfig.envFromLocation).length
        ) {
            for (let [env, regex] of Object.entries(
                envConfig.envFromLocation,
            )) {
                if (new RegExp(regex).test(document.location.href)) {
                    finalEnv = env;
                    break;
                }
            }
        } else {
            console.log(
                `%c[SEnv] The environment cannot be determined. Either set the config.env.env configuration or specify some environments by setting the config.env.envFromLocation object of {env}:{regex} environments`,
                'color: orange',
            );
        }

        console.log(
            `%c[SEnv] Current environment is "${finalEnv}"${
                queryStringObj.devsCut ? " developer's cut (devsCut)" : ''
            }`,
            `color: ${
                finalEnv === 'production'
                    ? 'red'
                    : finalEnv === 'staging'
                    ? 'cyan'
                    : 'lightGreen'
            }`,
        );

        document.env.ENVIRONMENT = finalEnv;
        document.env.ENV = finalEnv;
        document.env.PLATFORM = 'browser';
        document.env.DEVS_CUT = queryStringObj.devsCut !== undefined;
        document.env.VERBOSE = queryStringObj.verbose !== undefined;
        this._env = document.env;
        return document.env;
    }
}
