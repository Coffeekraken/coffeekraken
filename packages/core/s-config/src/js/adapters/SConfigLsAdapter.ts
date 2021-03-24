// @ts-nocheck

import __toString from '@coffeekraken/sugar/shared/string/toString';
import __parse from '@coffeekraken/sugar/shared/string/parse';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SConfigAdapter from '../../shared/adapters/SConfigAdapter';
import __diff from '@coffeekraken/sugar/shared/object/diff';

/**
 * @name                  SConfigLsAdapter
 * @namespace           sugar.js.config.adapters
 * @type                  Class
 *
 * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
 * let the SConfig class do the work for you...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - defaultConfig ({}) {Object}: This specify the "default" config that you want.
 * - appConfig ({}) {Object}: This specify the "application" level config that you want.
 * - userConfig ({}) {Object}: This specify the "user" level config that you want. It's usually this config that is updated
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISConfigLsAdapterSettings {}
export interface ISConfigLsAdapterCtorSettings {
  configLsAdapter?: Partial<ISConfigLsAdapterSettings>;
}

class SConfigLsAdapter extends __SConfigAdapter {
  get configLsAdapterSettings(): ISConfigLsAdapterSettings {
    return (<any>this.configLsAdapterSettings).configLsAdapter;
  }

  constructor(settings: ISConfigLsAdapterCtorSettings) {
    super(
      __deepMerge(
        {
          configLsAdapter: {}
        },
        settings || {}
      )
    );
  }

  load() {
    // try to get the config from the localstorage
    const config = __parse(localStorage.getItem(this.name)) || {};

    // mix the configs and save them in the instance
    return __deepMerge(
      config.default || {},
      config.app || {},
      config.user || {}
    );
  }

  save(newConfig = {}) {
    const baseConfig = __deepMerge(
      this.configLsAdapterSettings.defaultConfig,
      this.configLsAdapterSettings.appConfig
    );
    localStorage.setItem(
      this.name,
      __toString({
        default: this.configLsAdapterSettings.defaultConfig,
        app: this.configLsAdapterSettings.appConfig,
        user: __diff(baseConfig, newConfig)
      })
    );
    return true;
  }
}

export default SConfigLsAdapter;
