// @ts-nocheck
// @shared

import __deepMerge from '../../object/deepMerge';

/**
 * @name                                SCacheAdapter
 * @namespace           sugar.js.cache.cacheAdapters
 * @type                                Class
 *
 * Base class for SCache adapters
 *
 * @todo        interface
 * @todo        doc
 *
 * @example             js
 * class SCacheCoolAdapter extends SCacheAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async set(name, value, settings = {}) {
 *      const objectToSave = this.processItem(name, value, settings);
 *      // make what you want with the objectToSave...
 *      return objectToSave; // return the objectToSave or false if something goes wrong
 *    }
 *    async get(name) {
 *      // make what you need to get back the cached item
 *      return objectOfCachedItem; // return the cached item in object format
 *    }
 *    async delete(name) {
 *      // make what you need to delete the cached item
 *      return true; // return true or false if something goes wrong
 *    }
 * }
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SCacheAdapter {
  /**
   * @name                              _settings
   * @type                              Object
   * @private
   *
   * Store the default settings of the SCacheAdapter instance
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name            cache
   * @type            SCache
   *
   * Store the cache instance which if used
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cache = null;

  /**
   * @name                              constructor
   * @type                              Function
   *
   * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
   *
   * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(cache, settings = {}) {
    // store the settings
    this._settings = settings;
    this.cache = cache;
  }
};
