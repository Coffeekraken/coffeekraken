const __packageRoot = require('../path/packageRoot');
const __SPromise = require('../promise/SPromise');
const __SProcessManagerInterface = require('./interface/SProcessManagerInterface');
const __SError = require('../error/SError');
const __toString = require('../string/toString');
const __deepMerge = require('../object/deepMerge');
const __SIpc = require('../ipc/SIpc');
const __onProcessExit = require('./onProcessExit');
const __notifier = require('node-notifier');
const __SProcess = require('./SProcess');

/**
 * @name            SProcessManager
 * @namespace       sugar.node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessManagerInterface
 *
 * This class represent a process handler class that will fire up some SProcess processes
 *
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 * - id (processHandler.unnamed) {String}: Specify a unique id for your particular process instance
 * - name (Unnamed Process Handler) {String}: Specify a name for your process instance
 *
 * @see         https://www.npmjs.com/package/node-notifier
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessManager extends __SPromise {
  /**
   * @name        _processesStack
   * @type        Array<SProcess>
   * @private
   *
   * Store all the processes that this manager has launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processesStack = [];

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
   * @name          currentProcess
   * @type          SPromise
   * @private
   *
   * Store the current ```run``` returned promise
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  currentProcess = null;

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
        id: 'SProcessManager',
        name: 'Unnamed Process Manager',
        deamon: null,
        watchParams: ['watch'],
        autoStart: true,
        autoRun: false,
        throw: false,
        processSettings: {}
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
    if (this.currentProcess && this.currentProcess.kill) {
      this.currentProcess.kill();
    }
  }

  start(argsObj = {}, settings = {}) {
    if (this._started) return;
    this._started = true;

    settings = __deepMerge(this._settings, settings);

    if (this.deamon) {
      this.deamon.on('update,*.update', (data, metas) => {
        // do not launch multiple processes at the same time
        if (this.currentProcess) return;
        // check if we have a "deamonUpdate" method
        let params = Object.assign({}, argsObj);
        if (this.deamonUpdate) {
          params = this.deamonUpdate(params, data);
        }
        // run the process again
        this.run(params, settings);
        this.trigger('log', {
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
  run(processPromise = null, settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);

    // check that their's not another processing process
    if (this.currentProcess) {
      if (settings.throw) {
        throw new __SError(
          `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
        );
      } else {
        this.trigger('log', {
          error: true,
          value: `Sorry but you cannot launch multiple processes in the same <yellow>${this.constructor.name}</yellow> instance...`
        });
      }
      return;
    }

    this.currentProcess = new __SProcess({
      ...settings.processSettings
    });
    if (processPromise) this.currentProcess.bindSPromise(processPromise);
    __SPromise.pipe(this.currentProcess, this);
    this._processesStack.push(this.currentProcess);
    this.currentProcess.run();

    if (this.deamon && this.deamon.state === 'watching') {
      this.currentProcess.log({
        value: this.deamon.logs.paused
      });
    }

    this.currentProcess.on('close,cancel,resolve,reject', (data, metas) => {
      if (this.deamon && this.deamon.state === 'watching') {
        this.currentProcess.log({
          value: this.deamon.logs.watching
        });
        setTimeout(() => {
          this.state = 'watching';
        }, 1000);
      }
      this.currentProcess = null;
    });

    return this.currentProcess;
  }
}

// module.exports = SProcess;
module.exports = __SProcessManagerInterface.implements(SProcessManager, [
  __SProcessManagerInterface
]);
