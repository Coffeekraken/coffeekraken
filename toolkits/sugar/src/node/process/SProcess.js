const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __SError = require('../error/SError');
const __toString = require('../string/toString');
const __deepMerge = require('../object/deepMerge');
const __SIpc = require('../ipc/SIpc');
const __onProcessExit = require('../process/onProcessExit');

/**
 * @name            SProcess
 * @namespace       sugar.node.process
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
   * @name          initialParams
   * @type          Object
   *
   * Store the initial params object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  initialParams = {};

  /**
   * @name          _currentPromise
   * @type          SPromise
   * @private
   *
   * Store the current ```run``` returned promise
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentPromise = null;

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
   * @name            triggerParent
   * @type            Function
   * @static
   *
   * This method allows you to "pipe" some promise from a child process to a his parent process promise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static triggerParent(stack, value, metas = {}) {
    const trigger = process.env.GLOBAL_SIPC_TRIGGER_ID
      ? `${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`
      : 'trigger';
    __SIpc.trigger(trigger, {
      stack,
      value,
      metas
    });
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
  constructor(initialParams = {}, settings = {}) {
    settings = __deepMerge(
      {
        id: 'process.unnamed',
        name: 'Unnamed Process',
        deamon: null,
        watchParams: ['watch'],
        autoStart: true,
        autoRun: false,
        throw: false
      },
      settings
    );
    super(settings);

    this.initialParams = Object.assign({}, initialParams);

    // start if autoStart
    if (settings.autoStart) this.start(this.initialParams, settings);
  }

  /**
   * @name            deamon
   * @type            SDeamon
   * @get
   *
   * Access the deamon used with this process. If not exist, will return undefined
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get deamon() {
    return this._settings.deamon || undefined;
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
    if (this._currentPromise && this._currentPromise.cancel) {
      this._currentPromise.cancel();
    }
    // update the state
    this.state = 'killed';
  }

  start(argsObj = {}, settings = {}) {
    if (this._started) return;
    this._started = true;

    settings = __deepMerge(this._settings, settings);

    if (this.deamon) {
      this.deamon.on('update', (data, metas) => {
        // do not launch multiple processes at the same time
        if (this._currentPromise) return;
        // check if we have a "deamonUpdate" method
        let params = Object.assign({}, argsObj);
        if (this.deamonUpdate) {
          params = this.deamonUpdate(params, data);
        }
        // run the process again
        this.run(params, settings);
        this.log({
          clear: true,
          temp: true,
          value: `Restarting the process "<cyan>${
            settings.name || settings.id
          }</cyan>" automatically`
        });
      });
      let watchParam;
      for (let i = 0; i < settings.watchParams.length; i++) {
        if (this.initialParams[settings.watchParams[i]] !== undefined) {
          watchParam = settings.watchParams[i];
          break;
        }
      }
      this.deamon.watch(this.initialParams[watchParam]);
      setTimeout(() => {
        this.state = 'watching';
      });
    }

    if (settings.autoRun) {
      setTimeout(() => {
        this.run(argsObj, settings);
      });
    }
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
    // check that their's not another processing process
    if (this._currentPromise) {
      if (this._settings.throw) {
        throw new __SError(
          `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
        );
      } else {
        this.log({
          error: true,
          value: `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
        });
      }
      return;
    }

    // save the current promise
    this._currentPromise = processPromise;

    // update the process state
    this.state = 'running';

    if (this.deamon && this.deamon.state === 'watching') {
      this.log({
        value: this.deamon.logs.paused
      });
    }

    // save the start timestamp
    this.startTime = Date.now();
    this.endTime = 0;
    this.duration = 0;

    // listen when the process close to calculate duration
    processPromise.on('close,cancel,resolve,reject', (data, metas) => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;

      this.state = metas.stack !== 'reject' ? 'success' : 'error';

      if (this.deamon && this.deamon.state === 'watching') {
        this.log({
          value: this.deamon.logs.watching
        });
        setTimeout(() => {
          this.state = 'watching';
        }, 1000);
      }

      this._currentPromise = null;
    });

    __SPromise.pipe(processPromise, this);

    return processPromise;
  }

  /**
   * @name          log
   * @type          Function
   *
   * This method allows you to log a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to log
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    // setTimeout(() => {
    args.forEach((arg) => {
      this.trigger('log', arg);
      // if (!this._currentPromise) return;
      // this._currentPromise.trigger('log', arg);
    });
    // });
  }
}

// module.exports = SProcess;
module.exports = __SProcessInterface.implements(SProcess, [
  __SProcessInterface
]);
