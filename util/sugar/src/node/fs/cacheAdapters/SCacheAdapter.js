const __deepMerge = require('../object/deepMerge');

/**
 * @name                                SCacheAdapter
 * @namespace                           sugar.node.fs.cacheAdapters
 * @type                                Class
 * 
 * Base class for SCache adapters
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCacheAdapter {

  /**
   * @name                              _settings
   * @type                              Object
   * @private
   * 
   * Store the default settings of the SCacheAdapter instance
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                              constructor
   * @type                              Function
   * 
   * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
   * 
   * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // store the settings
    this._settings = settings;
  }

  /**
   * @name                              stringify
   * @type                              Function
   * 
   * Take the name, the value and the settings and generate a string that you can save in a file, in a database, etc...
   * 
   * @param               {String}                name                  The name of the item
   * @param               {Mixed}                 value                 The value to save
   * @param               {Object}                [settings={}]         An object of settings to override the default ones
   * @return              {String}                                      The string that you can save where you want
   * 
   * @example           js
   * class SCacheCoolAdapter extends SCacheAdapter {
   * 
   *    async set(name, value, settings = {}) {
   *      const stringToSave = this.stringify(name, value, settings);
   *      // save the string where you want...
   *      return true;
   *    }
   * 
   * }
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stringify(name, value, settings = {}) {

  }

}