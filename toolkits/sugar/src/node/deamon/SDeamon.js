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

  /**
   * @name          watch
   * @type          Function
   *
   * This method take the extended watch method promise as parameter
   * to listen on it automatically for events like "close", etc...
   * It also pipe the events from the promise on the instance directly
   * to you can listen for event directly on the class instance itself
   *
   * @param       {SPromise}          watchPromise        The watch promise instance
   * @return      {SPromise}                              The watch promise instance passed
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  watch(watchPromise) {
    __SPromise.pipe(watchPromise, this);

    return watchPromise;
  }
}

module.exports = __SDeaminInterface.implements(SDeamon);
