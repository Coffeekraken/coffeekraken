const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __getExtendsStack = require('../class/getExtendsStack');
const __SError = require('../error/SError');
const __toString = require('../string/toString');

/**
 * @name            SProcess
 * @namespace       node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessInterface
 *
 * This class represent a process in the sugar toolkit
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcess extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        idle, running, killed, error, success, watching
   *
   * Store the process state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get state() {
    return this._state;
  }
  set state(value) {
    this._setState(value);
  }
  _state = 'idle';
  _setState(value) {
    if (
      ['idle', 'running', 'killed', 'error', 'success', 'watching'].indexOf(
        value
      ) === -1
    ) {
      throw new __SError(
        `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
          value
        )}</magenta>" of your "<cyan>${
          this.constructor.name
        }</cyan>" class can contain only one of these values: ${[
          'idle',
          'running',
          'killed',
          'error',
          'success',
          'watching'
        ]
          .map((i) => {
            return `"<green>${i}</green>"`;
          })
          .join(', ')}`
      );
    }

    // trigger an event
    this.trigger('state', value);

    this._state = value;
  }

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(null, {
      id: 'process.unnamed',
      name: 'Unnamed Process',
      ...settings
    }).start();
  }

  /**
   * @name             run
   * @type              Function
   *
   * This method is meant to be overrided by the subclass
   * in order to run the actual process code.
   *
   * @param         {Function}        processFn         The function that will be called with the SPromise parameters (resolve, reject, trigger and cancel) so you can manage the process state
   * @return        {SPromise}                          An SPromise instance that you have to return in your run method
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(processPromise) {
    // const promise = new __SPromise(() => {}, {
    //   id: this._settings.id,
    //   name: this._settings.name
    // }).start();

    // update the process state
    this.state = 'running';

    // execute the processFn
    // const processPromise = processFn(
    //   promise.resolve.bind(this),
    //   promise.reject.bind(this),
    //   promise.trigger.bind(this),
    //   promise.cancel.bind(this),
    //   promise
    // );

    __SPromise.pipe(processPromise, this);
    // __SPromise.pipe(processPromise, promise);

    // update the process state
    // this.state = 'success';

    return processPromise;
  }
}

module.exports = __SProcessInterface.implements(SProcess, [
  __SProcessInterface
]);
