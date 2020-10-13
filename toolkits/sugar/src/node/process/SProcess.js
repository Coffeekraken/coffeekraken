const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __notifier = require('node-notifier');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __isChildProcess = require('../is/childProcess');
const __SIpc = require('../ipc/SIpc');

/**
 * @name                SProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SPromise
 *
 * This class represent an SProcess run iteration that store things like
 * the result, the startTime, endTime, duration, state, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcess extends __SPromise {
  /**
   * @name      id
   * @type      String
   * @get
   *
   * Access the process id (not the same as a node process id)
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get id() {
    return this._settings.id;
  }

  /**
   * @name      state
   * @type      String
   *
   * Access the process state like 'idle', 'running', 'killed', 'error', 'success'
   *
   * @since     2.0.0
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
      ['idle', 'running', 'killed', 'error', 'success'].indexOf(value) === -1
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
          'success'
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
   * @name      duration
   * @type      Number
   * @get
   *
   * Access the process duration when this one is finished
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  duration = -1;

  /**
   * @name      startTime
   * @type      Number
   * @get
   *
   * Access the process startTime when this one has started
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  startTime = Date.now();

  /**
   * @name      endTime
   * @type      Number
   * @get
   *
   * Access the process endTime when this one is finished
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  endTime = -1;

  /**
   * @name      stdout
   * @type      Array<String>
   * @get
   *
   * Access the process stdout stack
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stdout = [];

  /**
   * @name      stderr
   * @type
   * @get
   *
   * Access the process stderr stack
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stderr = [];

  /**
   * @name        result
   * @type        Mixed
   *
   * Access the process result
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  result = null;

  /**
   * @name            constructor
   * @type            Function
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
          promise: null,
          notifications: {
            enable: true,
            start: {
              title: null,
              message: `Process is running...`,
              icon: `${__packageRoot(
                __dirname
              )}/src/data/notifications/ck_start.png`
            },
            success: {
              title: null,
              message: `Process has finish successfully`,
              icon: `${__packageRoot(
                __dirname
              )}/src/data/notifications/ck_success.png`
            },
            error: {
              title: null,
              message: `Something went wrong...`,
              icon: `${__packageRoot(
                __dirname
              )}/src/data/notifications/ck_error.png`
            }
          }
        },
        settings
      )
    );
    if (!this._settings.notifications.start.title) {
      this._settings.notifications.start.title = `${this._settings.name} (${this._settings.id})`;
    }
    if (!this._settings.notifications.success.title) {
      this._settings.notifications.success.title = `${this._settings.name} (${this._settings.id})`;
    }
    if (!this._settings.notifications.error.title) {
      this._settings.notifications.error.title = `${this._settings.name} (${this._settings.id})`;
    }
    __SProcessInterface.apply(this);

    // check if a promise has been passed in the settings
    if (this._settings.promise && this._settings.promise instanceof Promise) {
      this._promise = this._settings.promise;
      this._initExternalPromiseListeners();
    }

    // this.log('start');
    // this.on('resolve', () => {
    //   this.log({
    //     value: 'end'
    //   });
    // });

    // add the listeners
    this.on('resolve,reject,cancel,finally', (data, metas) => {
      this.result = data;
      this.endTime = Date.now();
      this.duration = Date.now() - this.startTime;
      if (metas.stack === 'resolve') this.state = 'success';
      else if (metas.stack === 'reject') this.state = 'error';
      else if (metas.stack === 'cancel') this.state = 'killed';
      else this.state = 'idle';

      if (this.state === 'success') {
        if (this._settings.notifications.enable) {
          __notifier.notify(this._settings.notifications.success);
        }
      } else if (this.state === 'error') {
        if (this._settings.notifications.enable) {
          __notifier.notify(this._settings.notifications.error);
        }
      }

      return this;
    });
  }

  /**
   * @name      _initExternalPromiseListeners
   * @type      Function
   * @private
   *
   * Add the listeners on the passed promise to handle the states updates etc automatically
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initExternalPromiseListeners() {
    __SPromise.pipe(this._promise, this);
  }

  /**
   * @name      run
   * @type      Function
   * @async
   *
   * Access the process run when this one is finished
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(settings = {}) {
    settings = __deepMerge(this._settings, settings);

    if (settings.notifications.enable) {
      __notifier.notify(settings.notifications.start);
    }

    this.trigger(`start`, this);
  }

  /**
   * @name      kill
   * @type      Function
   *
   * This method will simply kill the process and call the "cancel" method
   * on the SPromise super instance as well as on the passed "promise" instance
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    // call the cancel method on the parent SPromise instance
    this.cancel();
    // cancel the passed promise
    if (this._promise && this.promise.cancel) this._promise.cancel();
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
  log(...logs) {
    logs.forEach((log) => {
      this.stdout.push(log.value || log.toString());
      if (!__isChildProcess()) {
        this.trigger('log', log);
      } else {
        __SIpc.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
          stack: 'log',
          value: log,
          metas: {
            pid: process.pid,
            stack: 'log'
          }
        });
      }
    });
  }

  /**
   * @name          error
   * @type          Function
   *
   * This method allows you to error a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to error
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error(...errors) {
    errors.forEach((error) => {
      this.stderr.push(error.value || error.toString());
      if (!__isChildProcess()) {
        this.trigger('error', error);
      } else {
        __SIpc.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
          stack: 'error',
          value: error,
          metas: {
            pid: process.pid,
            stack: 'error'
          }
        });
      }
    });
  }
};
