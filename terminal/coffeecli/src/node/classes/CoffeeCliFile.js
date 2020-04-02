const __deepMerge = require('@coffeekraken/sugar/node/object/deepMerge');

/**
 * @name                          CoffeeCliFile
 * @namespace                     terminal.coffeecli.node.classes
 * @type                          Class
 * 
 * This class represent a "coffeecli.config.js" file with some usefull methods to come...
 * 
 * @example                 js
 * const CoffeeCliFile = require('@coffeekraken/coffeecli/node/classes/CoffeeCliFile');
 * const file = new CoffeeCliFile('file source...');
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class CoffeeCliFile {

  /**
   * @name                                _fileSource
   * @type                                String|Object
   * @private
   * 
   * Store the file source to parse and use as content
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _fileSource = null;

  /**
   * @name                                _data
   * @type                                Object
   * @private
   * 
   * Store the file evaluated content
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _data = null;

  /**
   * @name                                constructor
   * @type                                Function
   * 
   * Construct the CoffeeCliFile class
   * 
   * @param         {String|Object}            fileSource           The file source to use as content
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(fileSource) {

    // save the file source
    this._fileSource = fileSource;

    // check the source type
    if (typeof fileSource === 'string') {
      this._data = eval(fileSource);
    } else if (typeof fileSource === 'object') {
      this._data = fileSource;
    }

  }

}