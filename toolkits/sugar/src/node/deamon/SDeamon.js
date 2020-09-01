const __SPromise = require('../promise/SPromise');
const __SDeamonInterface = require('./interface/SDeamonInterface');

/**
 * @name                SDeamon
 * @namespace           node.deamon
 * @type                Class
 * @extends             SPromise
 * @implments           SDeamonInterface
 *
 * This class is the base one for all the "Deamons" classes like SFsDeamon, etc...
 *
 * @event       state       Triggered when the state change
 *
 * @ince          2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDeamon extends __SPromise {
  /**
   * @name        state
   * @type        String
   * @values      idle, watching, error
   * @default     idle
   *
   * Store the watching process state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  state = 'idle';

  /**
   * @name        logs
   * @type        Object
   *
   * Store the different logs messages like:
   * - watching: Displayed when the deamon pass in watching mode
   * - paused: Displayed when the deamon pass in pause mode
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  logs = {
    watching: `The "<yellow>${this.constructor.name}</yellow>" deamon has been started and watch for changes...`,
    paused: `The "<yellow>${this.constructor.name}</yellow>" deamon has been <cyan>paused</cyan>`
  };

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

    // update state
    this.state = 'watching';
    this.trigger('state', this.state);

    // listen for the end of the watching process
    watchPromise
      .on('finally', () => {
        this.state = 'idle';
        this.trigger('state', this.state);
      })
      .on('error', () => {
        this.state = 'error';
        this.trigger('state', this.state);
      });

    return watchPromise;
  }
}

module.exports = SDeamon;
// module.exports = __SDeamonInterface.implements(SDeamon);
