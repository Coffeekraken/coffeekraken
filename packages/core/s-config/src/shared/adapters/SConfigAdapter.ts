// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name                                SConfigAdapter
 * @namespace           s-config.shared.adapters
 * @type                                Class
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

export interface ISConfigAdapterSettings {
  name: string;
  onUpdate: typeof Function;
}

export default class SConfigAdapter {
  /**
   * @name        _settings
   * @type          ISConfigAdapterSettings
   *
   * Access the config adapter settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISConfigAdapterSettings;

  get configAdapterSettings(): ISConfigAdapterSettings {
    return (<any>this)._settings.configAdapter;
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
  constructor(settings: Partial<ISConfigAdapterCtorSettings>) {
    this._settings = __deepMerge(settings || {});
    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(
        `The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`
      );
    }
  }

  /**
   * @name        update
   * @type        Function
   *
   * Function that you have to call with the new config when it has been updated
   *
   * @param      {String}         identifier        A string identifier for the update. Can be a file path, an object hash, etc...
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _updatesTimeoutsStack = {};
  update(identifier: string): void {
    // calling the "onUpdate" setting callback if exists
    clearTimeout(this._updatesTimeoutsStack[identifier]);
    this._updatesTimeoutsStack[identifier] = setTimeout(() => {
      if (!this._settings.onUpdate) return;
      this._settings.onUpdate();
    }, 50);
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
    return this._settings.name;
  }
  set name(value) {
    if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
      throw new Error(
        `The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`
      );
    }
    this._settings.name = value;
  }
}
