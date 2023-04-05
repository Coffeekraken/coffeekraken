import { __deepMerge, __get } from '@coffeekraken/sugar/object';
import __set from '@coffeekraken/sugar/shared/object/set';

import type { ISSugarConfig } from '../shared/types';

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
 * @snippet         __SSugarConfig.get($1)
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
    static get finalConfig(): ISSugarConfig {
        if (SSugarConfig._finalConfig) return SSugarConfig._finalConfig;
        SSugarConfig._finalConfig = __deepMerge(
            // @ts-ignore
            document.env?.SUGAR?.config ??
                window.top?.document?.env?.SUGAR?.config ??
                {},
        );
        return SSugarConfig._finalConfig;
    }

    /**
     * @name        config
     * @type        ISSugarConfig
     * @get
     *
     * Simple config accessor to access directly the config object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get config(): ISSugarConfig {
        return this.get('.');
    }

    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access your configurations
     *
     * @param       {String}            [dotpath='.']             The dotpath representing the configuration you want to access
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath: string = '.'): any {
        // @ts-ignore
        return __get(SSugarConfig.finalConfig, dotpath);
    }

    /**
     * @name            set
     * @type            Function
     * @static
     *
     * This static method allows you to set a configuration value
     *
     * @param       {String}            dotpath             The dotpath representing the configuration you want to access
     * @param       {any}               value               The value you want to set
     * @return      {any}                                   The getted configuration
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static set(dotpath: string, value: any): any {
        // @ts-ignore
        return __set(SSugarConfig.finalConfig, dotpath, value);
    }
}
