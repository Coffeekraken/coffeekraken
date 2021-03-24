// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

/**
 * @name                                SConfigAdapter
 * @namespace           s-config.shared.adapters
 * @type                                Class
 * @extends                   SEventEmitter
 * @status              beta
 *
 * Base class for SCache adapters
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 *    async save(newConfig) {
 *      // save the newConfig object the way you want and return true when all it ok
 *      return true;
 *    }
 * }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISConfigAdapterSettings {}
export interface ISConfigAdapterCtorSettings {
  configAdapter?: Partial<ISConfigAdapterSettings>;
}

export default class SConfigAdapter extends __SEventEmitter {
  /**
   * @name        configAdapterSettings
   * @type        ISConfigAdapterSettings
   * @get
   *
   * Access the config adapter settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get configAdapterSettings(): ISConfigAdapterSettings {
    return (<any>this._settings).configAdapter;
  }

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
   * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
   * - ...others: All the settings you need for your specific adapter
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISConfigAdapterCtorSettings) {
    super(
      __deepMerge(
        {
          configAdapter: {}
        },
        settings || {}
      )
    );

    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(
        `The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`
      );
    }
  }

  /**
   * @name                  name
   * @type                  String
   * @get
   *
   * Access the adapter setted name
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get name() {
    return this.configAdapterSettings.name;
  }
  set name(value) {
    if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
      throw new Error(
        `The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`
      );
    }
    this._settings.configAdapter.name = value;
  }
}
