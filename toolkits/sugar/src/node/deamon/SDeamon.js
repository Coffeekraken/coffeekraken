const __SPromise = require('../promise/SPromise');
const __SDeaminInterface = require('./interface/SDeamonInterface');

/**
 * @name                SDeamon
 * @namespace           node.deamon
 * @type                Class
 * @extends             SPromise
 * @implments           SDeamonInterface
 *
 * This class is the base one for all the "Deamons" classes like SFsDeamon, etc...
 *
 * @ince          2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDeamon extends __SPromise {
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(null, settings).start();
  }
}

module.exports = __SDeaminInterface.implements(SDeamon);
