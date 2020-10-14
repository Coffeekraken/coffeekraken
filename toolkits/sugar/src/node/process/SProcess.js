const __convert = require('../time/convert');
const __wait = require('../time/wait');
const __isClass = require('../is/class');
const __onProcessExit = require('./onProcessExit');
const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __notifier = require('node-notifier');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __isChildProcess = require('../is/childProcess');
const __SIpc = require('../ipc/SIpc');
const __SError = require('../error/SError');
const __buildCommandLine = require('../cli/buildCommandLine');
const __parseArgs = require('../cli/parseArgs');
const __childProcess = require('child_process');
const __output = require('./output');
const { settings } = require('cluster');

/**
 * @name                SProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SPromise
 *
 * This class represent an SProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
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
   * @name      name
   * @type      String
   * @get
   *
   * Access the process name (not the same as a node process name)
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get name() {
    return this._settings.name;
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
   * @name        value
   * @type        Mixed
   *
   * Access the process result value
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  value = null;

  /**
   * @name        isKilling
   * @type        Boolean
   *
   * Tell is the process is in kill state or not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isKilling = false;

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
  constructor(processPath, settings = {}) {
    super(
      __deepMerge(
        {
          output: {},
          runAsChild: false,
          definitionObj: {},
          triggerParent: true,
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
          },
          env: {
            ...process.env,
            CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
              ? process.env.CHILD_PROCESS_LEVEL + 1
              : 1,
            IS_CHILD_PROCESS: true
          }
        },
        settings
      )
    );

    this._processPath = processPath;
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

    // add the listeners
    this.on('resolve,reject,cancel,finally', (data, metas) => {
      this.value = data;
      this.endTime = Date.now();
      this.duration = Date.now() - this.startTime;
      if (metas.stack === 'resolve') this.state = 'success';
      else if (metas.stack === 'reject') this.state = 'error';
      else if (metas.stack === 'cancel') this.state = 'killed';
      else this.state = 'idle';

      if (this.state === 'success') {
        // log a success message
        this.log({
          value: `<yellow>${'-'.repeat(
            process.stdout.columns - 4
          )}</yellow>\nThe <yellow>${this.name}</yellow> (<cyan>${
            this.id
          }</cyan>) process has finished <green>successfully</green> in <yellow>${__convert(
            this.duration,
            __convert.SECOND
          )}s</yellow>`
        });
        if (!__isChildProcess()) {
          if (this._settings.notifications.enable) {
            __notifier.notify(this._settings.notifications.success);
          }
        }
      } else if (this.state === 'error') {
        this.log({
          value: `<red>${'-'.repeat(
            process.stdout.columns - 4
          )}</red>\n<red>Something went wrong</red> during the <yellow>${
            this.name
          }</yellow> (<cyan>${this.id}</cyan>) process execution`
        });
        if (!__isChildProcess()) {
          if (this._settings.notifications.enable) {
            __notifier.notify(this._settings.notifications.error);
          }
        }
      }
      return this.toObject();
    });

    if (__isChildProcess()) {
      this.on('*', (data, metas) => {
        __SIpc.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
          stack: metas.stack,
          value: data,
          metas: {
            pid: process.pid,
            ...metas
          }
        });
      });
      return;
    }

    if (!__isChildProcess()) {
      if (this._settings.output) {
        if (__isClass(settings.output)) {
          const outputInstance = new settings.output(this);
        } else {
          const outputSettings =
            typeof settings.output === 'object' ? settings.output : {};
          __output(this, outputSettings);
        }
      }
    }
  }

  /**
   * @name      toObject
   * @type      Function
   *
   * This method allows you to transform this instance into
   * a plain object that you can use whenever you want
   *
   * @return    {Object}      The object version of this instance
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return {
      state: this.state,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.duration,
      stdout: this.stdout,
      stderr: this.stderr,
      value: this.value
    };
  }

  /**
   * @name      bindSPromise
   * @type      Function
   *
   * This method allows you to bind a SPromise instance to
   * this proces. That allows the SProcess instance to listen
   * for errors, end of process, etc automatically
   *
   * @param     {SPromise}      promise       An SPromise instance that you want to bind to this process
   * @return    {SProcess}                    Maintain the chainability
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  bindSPromise(promise) {
    if (!(promise instanceof __SPromise)) {
      throw new __SError(
        `Sorry but the passed promise parameter to the "bindSPromise" method has to be an SPromise instance and you've passed a "${typeof promise}"`
      );
    }
    this._promise = promise;
    __SPromise.pipe(this._promise, this, {
      exclude: ['resolve', 'reject', 'cancel', 'finally']
    });
    // __SPromise.map(this._promise, this);

    this._promise.on('resolve,reject,cancel,finally', (data, metas) => {
      this[metas.stack](data);
      this.log({
        value: 'RESO'
      });
    });
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
  async run(paramsOrStringArgs = {}, settings = {}) {
    settings = __deepMerge(this._settings, settings);

    await __wait(100);

    let paramsObj = paramsOrStringArgs;
    if (typeof paramsObj === 'string') {
      paramsObj = __parseArgs(paramsObj, {
        definitionObj: this.constructor.interface
          ? {
              ...this.constructor.interface.definitionObj,
              processPath: {
                type: 'String'
              }
            }
          : null
      });
    }

    if (settings.runAsChild && !__isChildProcess()) {
      // build the command to run depending on the passed command in the constructor and the params
      const commandToRun = __buildCommandLine(
        'sugar process.runChild [arguments]',
        {
          ...paramsObj,
          processPath: this._processPath
        },
        {
          definitionObj: {
            ...this.constructor.interface.definitionObj,
            processPath: {
              type: 'String',
              required: true
            }
          },
          alias: false
        },
        {}
      );

      this._currentChildProcess = __childProcess.spawn(commandToRun, [], {
        env: settings.env,
        shell: true
      });

      __onProcessExit(() => {
        this._currentChildProcess.kill();
      });

      this._currentChildProcess.on('close', (code, signal) => {
        if (this.stderr.length) {
          this.reject(this.stderr.join('\n'));
          const error = new __SError(this.stderr.join('\n'));
          this.error(`<yellow>Child Process</yellow>\n${error.message}`);
        } else if (this._isKilling || (!code && signal)) {
          this.kill();
        } else if (code === 0 && !signal) {
          this.resolve();
        } else {
          this.reject();
        }
        // reset isKilling boolean
        this._isKilling = false;
      });

      if (await __SIpc.isServer()) {
        __SIpc.on(
          `${settings.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`,
          (data, socket) => {
            this.trigger(data.stack, data.value, data.metas);
          }
        );
      }

      // stdout data
      if (this._currentChildProcess.stdout) {
        this._currentChildProcess.stdout.on('data', (data) => {
          this.log({
            value: data.toString()
          });
        });
      }
      // stderr data
      if (this._currentChildProcess.stderr) {
        this._currentChildProcess.stderr.on('data', (error) => {
          this.error({
            error: true,
            value: error.toString()
          });
        });
      }

      if (settings.notifications.enable) {
        __notifier.notify(settings.notifications.start);
      }

      this.trigger(`start`, this.toObject());

      return;
    }

    // log a start message
    this.log({
      value: `Starting the <yellow>${this.name}</yellow> (<cyan>${
        this.id
      }</cyan>) process...\n<yellow>${'-'.repeat(
        process.stdout.columns - 4
      )}</yellow>`
    });

    // run the actual process using the "process" method
    return this.process(paramsObj, settings);
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
    this.isKilling = true;
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
      this.trigger('log', log);
      // if (!__isChildProcess()) {
      // } else {
      //   __SIpc.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
      //     stack: 'log',
      //     value: log,
      //     metas: {
      //       pid: process.pid,
      //       stack: 'log'
      //     }
      //   });
      // }
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
      this.trigger('error', error);
      // if (!__isChildProcess()) {
      // } else {
      //   __SIpc.trigger(`${process.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`, {
      //     stack: 'error',
      //     value: error,
      //     metas: {
      //       pid: process.pid,
      //       stack: 'error'
      //     }
      //   });
      // }
    });
  }
};
