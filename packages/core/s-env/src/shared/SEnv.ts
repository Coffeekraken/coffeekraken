import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __isNode from '@coffeekraken/sugar/shared/is/node';

// @ts-ignore
if (!__isNode() && !document.env) {
    // @ts-ignore
    document.env = {
        SUGAR: {},
    };
} else process.env.SUGAR = JSON.stringify({});

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
        if (__isNode()) {
            this._env = {
                ENVIRONMENT: process.env.NODE_ENV ?? 'development',
                ENV: process.env.NODE_ENV ?? 'development',
                PLATFORM: 'node',
            };
        } else {
            this._env = {
                // @ts-ignore
                ENVIRONMENT: document?.env?.ENV ?? 'development',
                // @ts-ignore
                ENV: document?.env?.ENV ?? 'development',
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static is(env: string): boolean {
        env = env.toLowerCase();
        if (env === 'dev' || env === 'development') {
            if (
                this.get('environment') === 'dev' ||
                this.get('environment') === 'development'
            )
                return true;
        } else if (env === 'prod' || env === 'production') {
            if (
                this.get('environment') === 'prod' ||
                this.get('environment') === 'production'
            )
                return true;
        } else {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(name: string): any {
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
    static set(name: string, value: any): any {
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
    static delete(name: string): void {
        delete SEnv.env[name.toUpperCase()];
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static packageJson = __packageJsonSync();
}
