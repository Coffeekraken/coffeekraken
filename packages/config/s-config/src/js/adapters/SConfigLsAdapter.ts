// @ts-nocheck

import { __deepMerge, __diff } from '@coffeekraken/sugar/object';
import __parse from '@coffeekraken/sugar/shared/string/parse';
import { __toString } from '@coffeekraken/sugar/string';
import type { ISConfigAdapterSettings } from '../../shared/adapters/SConfigAdapter';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';

/**
 * @name                  SConfigLsAdapter
 * @namespace           sugar.js.config.adapters
 * @type                  Class
 * @platform                js
 * @status                  wip
 *
 * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
 * let the SConfig class do the work for you...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @setting      {String}    [name=null]            Specify the config name that you want to use.
 * @setting      {Any}   [defaultConfig={}]         Specify the "default" config that you want.
 * @setting      {Any}   [appConfig={}]             Specify the "application" level config that you want.
 * @setting      {Any}   [userConfig={}]            Specify the "user" level config that you want. It's usually this config that is updated
 * 
 * @snippet         __SConfigLsAdapter($1)
 * new __SConfigLsAdapter($1)
 * 
 * @example         js
 * import __SConfig, { __SConfigLsAdapter } from '@coffeekraken/s-config';
 * const config = new __SConfig($1, new __SConfigLsAdapter($2));
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISConfigLsAdapterSettings extends ISConfigAdapterSettings {}

class SConfigLsAdapter extends __SConfigAdapter {
    get configLsAdapterSettings(): ISConfigLsAdapterSettings {
        return (<any>this.settings).configLsAdapter;
    }

    constructor(settings: ISConfigLsAdapterSettings) {
        super(__deepMerge({}, settings || {}));
    }

    load() {
        // try to get the config from the localstorage
        const config = __parse(localStorage.getItem(this.name)) || {};

        // mix the configs and save them in the instance
        return __deepMerge(
            config.default || {},
            config.app || {},
            config.user || {},
        );
    }

    save(newConfig = {}) {
        const baseConfig = __deepMerge(
            this.settings.defaultConfig,
            this.settings.appConfig,
        );
        localStorage.setItem(
            this.name,
            __toString({
                default: this.settings.defaultConfig,
                app: this.settings.appConfig,
                user: __diff(baseConfig, newConfig),
            }),
        );
        return true;
    }
}

export default SConfigLsAdapter;
