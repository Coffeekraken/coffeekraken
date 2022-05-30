import __get from '@coffeekraken/sugar/shared/object/get';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name                SSugarConfig
 * @namespace           js
 * @type                Class
 * @platform            js
 * @status              beta
 *
 * This class allows you to access your sugar configurations that are
 * injected into the page by the @coffeekraken/s-vite-sugar-plugin
 *
 * @example         js
 * import __SSugarConfig from '@coffeekraken/s-sugar-config';
 * __SSugarConfig.get('something.cool');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSugarConfig {
    static _finalConfig;
    static get finalConfig(): any {
        if (SSugarConfig._finalConfig) return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = __deepMerge(
            // @ts-ignore
            document.env.SUGAR?.config ?? {},
        );
        return SSugarConfig._finalConfig;
    }

    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access your configurations
     *
     * @param       {String}            dotpath             The dotpath representing the configuration you want to access
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath: string): any {
        // @ts-ignore
        return __get(SSugarConfig.finalConfig, dotpath);
    }
}
