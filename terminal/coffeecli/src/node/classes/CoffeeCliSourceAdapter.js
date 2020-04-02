const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

module.exports = class CoffeeCliSourceAdapter {

  /**
   * @name                                _settings
   * @type                                Object
   * @private
   * 
   * Store the adapter settings
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                                constructor
   * @type                                Function
   * 
   * Construct the CoffeeCliSourceAdapter class
   * 
   * @param         {Object}            [settings={}]               The adapter settings object. This is specific to each adapters
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {

    // save the settings
    this._settings = __deepMerge({
      file: 'coffeecli.config.js'
    }, settings);

  }

}