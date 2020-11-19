const __SPromise = require('../promise/SPromise');
const __SDeamonInterface = require('./interface/SDeamonInterface');
const __deepMerge = require('../object/deepMerge');
const __onProcessExit = require('../process/onProcessExit');

/**
 * @name                SDeamon
 * @namespace           sugar.node.deamon
 * @type                Class
 * @extends             SPromise
 * @implments           SDeamonInterface
 *
 * This class is the base one for all the "Deamons" classes like SFsDeamon, etc...
 *
 * @todo        update doc
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
    watching: `The "<yellow>${this.constructor.name}</yellow>" deamon has been <green>started</green> and <green>watch for changes</green>...`,
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
    super(
      __deepMerge(
        {
          id: 'SDeamon',
          updateStacks: [],
          processParams: null,
          updateLog: null
        },
        settings
      )
    );
  }

  /**
   * @name          on
   * @type          Function
   *
   * Override the ```on``` SPromise method to allow the use of the "update" shortcut.
   * When using the "update" shortcut, the registered events will actually be the one
   * specified in the ```settings.updateStacks```.
   *
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  on(stacks, callback) {
    // console.log(stacks.join(','));
    if (typeof stacks === 'string')
      stacks = stacks.split(',').map((l) => l.trim());
    if (stacks.indexOf('update') !== -1) {
      stacks.splice(stacks.indexOf('update'), 1);
      stacks = [...stacks, ...this._settings.updateStacks];
    }

    return super.on(stacks.join(','), callback);
  }

  /**
   * @name          getUpdateLog
   * @type          Function
   *
   * This function is used to generate the update log string
   * depending on the updated file, data, etc...
   *
   * @param         {Object}     updateObj           The update object given by the proper deamon type
   * @return        {String}                          The generated update string
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  updateLog(updateObj) {
    if (
      this._settings.updateLog &&
      typeof this._settings.updateLog === 'function'
    ) {
      return this._settings.updateLog(updateObj);
    }
    return null;
  }

  /**
   * @name          processParams
   * @type          Function
   *
   * This method can be called to process the passed params object
   * using the function setted in the settings.processParams
   *
   * @param       {Object}        params      The params object to process
   * @param       {Object}        data        The update data object
   * @return      {Object}                    The processed params
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  processParams(params, data) {
    params = Object.assign({}, params);
    if (
      this._settings.processParams &&
      typeof this._settings.processParams === 'function'
    ) {
      params = this._settings.processParams(params, data);
    }
    return params;
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

    __onProcessExit(() => {
      watchPromise.cancel();
    });

    return watchPromise;
  }
}

module.exports = SDeamon;
// module.exports = __SDeamonInterface.implements(SDeamon);
