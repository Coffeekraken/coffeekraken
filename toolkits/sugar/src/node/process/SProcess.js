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
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 * - id (process.unnamed) {String}: Specify a unique id for your particular process instance
 * - name (Unnamed Process) {String}: Specify a name for your process instance
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
   * @name          duration
   * @type          Number
   *
   * Store the process duration. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  duration = 0;

  /**
   * @name          startTime
   * @type          Number
   *
   * Store the process startTime. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  startTime = 0;

  /**
   * @name          endTime
   * @type          Number
   *
   * Store the process endTime. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  endTime = 0;

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
   * @name            success
   * @type            Function
   *
   * This method take care of the things to do when the process
   * has finished successfully like update the state, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  success() {
    // update the state
    this.state = 'success';
  }

  /**
   * @name            kill
   * @type            Function
   *
   * This method take care of the things to do when the process
   * has beek killed like update the state, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    // update the state
    this.state = 'killed';
  }

  /**
   * @name             run
   * @type              Function
   *
   * This method is meant to be overrided by the subclass
   * in order to run the actual process code.
   * Your ```run``` method has to call this one at the end and pass it an SPromise instance that represent your process.
   * This will be usefull to automate some tasks like the duration calculation, updating the state automatically,
   * pipe the events from your process promise to this process class directly, etc...
   *
   * @param         {SPromise}        processPromise         The actual process promise representing your ongoing process. This methid will subscribe to events like "close" on the promise to actually take care of duration calculation, etc...
   * @return        {SPromise}                          An SPromise instance that you have to return in your run method
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(processPromise) {
    // update the process state
    this.state = 'running';

    // save the start timestamp
    this.startTime = Date.now();
    this.endTime = 0;
    this.duration = 0;

    // listen when the process close to calculate duration
    processPromise.on('close,cancel,resolve,reject', () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;
    });

    // __SPromise.pipe(processPromise, this);

    return processPromise;
  }
}

module.exports = __SProcessInterface.implements(SProcess, [
  __SProcessInterface
]);
