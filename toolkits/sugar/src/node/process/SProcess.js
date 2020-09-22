const __IPC = require('node-ipc').IPC;
const __isChildProcess = require('../is/childProcess');
const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __SError = require('../error/SError');
const __toString = require('../string/toString');
const __deepMerge = require('../object/deepMerge');
const __SProcessDeamonSettingInterface = require('./interface/SProcessDeamonSettingInterface');
const __SDeamon = require('../deamon/SDeamon');

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
    if (!__isChildProcess()) return;
    if (!process.env.CHILD_PROCESS_IPC_PARENT_SERVER_ID) {
      throw new __SError(
        `You try to use the "<yellow>triggerParent</yellow>" static method but it seems that you don't have the environment variable "<cyan>CHILD_PROCESS_IPC_PARENT_SERVER_ID</cyan>" setted. This mean that you don't have spawned your child process using the SChildProcess class...`
      );
    }

    let ipc;
    let id = `SChildProcess_client_${process.env.CHILD_PROCESS_IPC_PARENT_SERVER_ID}`;
    let serverId = `SChildProcess_server_${process.env.CHILD_PROCESS_IPC_PARENT_SERVER_ID}`;

    function whenServerReady() {
      ipc.of[serverId].emit('message', {
        stack,
        value,
        metas
      });
    }

    if (!SProcess._ipcChildInstance) {
      ipc = new __IPC();
      ipc.config.silent = true;
      ipc.config.id = id;
      ipc.config.retry = 1500;
      ipc.connectTo(serverId, () => {
        ipc.of[serverId].on('connect', () => {
          whenServerReady();
        });
      });
      SProcess._ipcChildInstance = ipc;
    } else {
      ipc = SProcess._ipcChildInstance;
      whenServerReady();
    }

    // const logString = __toString({
    //   $triggerParent: true,
    //   value,
    //   metas
    // });
    // if (typeof value === 'string' && value.trim() === '') return;
    // // if (logString.length >= 8192) {
    // //   const tmpDir = __tmp.dirSync().name;
    // //   const tmpName = `${tmpDir}/${metas.id}.txt`;
    // //   __fs.writeFileSync(tmpName, logString);
    // //   console.log(
    // //     __toString({
    // //       $file: tmpName
    // //     })
    // //   );
    // // } else {
    // //   console.log(logString);
    // // }
    // console.log(logString);
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
        throw: false
      },
      settings
    );
    super(settings);

    this.initialParams = Object.assign({}, initialParams);

    // this.constructor.triggerParent(
    //   {
    //     value: initialParams
    //   },
    //   {
    //     stack: 'log'
    //   }
    // );

    if (settings.deamon) {
      settings.deamon.on('update', (data, metas) => {
        this.constructor.triggerParent(
          'log',
          {
            value: metas.stack
          },
          {}
        );
        // do not launch multiple processes at the same time
        if (this._currentPromise) return;
        // check if we have a "deamonUpdate" method
        if (this.deamonUpdate) {
          const res = this.deamonUpdate(Object.assign({}, initialParams), {
            ...data,
            metas
          });

          console.log(res);
        }
      });
      let watchParam;
      for (let i = 0; i < this._settings.watchParams.length; i++) {
        if (this.initialParams[this._settings.watchParams[i]] !== undefined) {
          watchParam = this._settings.watchParams[i];
          break;
        }
      }
      SProcess.triggerParent(
        'log',
        {
          value: initialParams[watchParam]
        },
        {}
      );
      settings.deamon.watch(initialParams[watchParam]);
    }

    // if (settings.deamon && typeof settings.deamon === 'object') {
    //   // init the deamon class
    //   this._deamonInstance = new settings.deamon.class(
    //     settings.deamon.settings || {}
    //   );

    //   const stacks = Array.isArray(settings.deamon.runOn)
    //     ? settings.deamon.runOn.join(',')
    //     : '*';

    //   this._deamonInstance.on(stacks, (data, metas) => {
    //     // check if a process is already running
    //     if (this._currentPromise) return;

    //     // process the initial params with the "processParams" function if exists
    //     let params = Object.assign({}, initialParams);
    //     if (
    //       settings.deamon.processParams &&
    //       typeof settings.deamon.processParams === 'function'
    //     ) {
    //       params = settings.deamon.processParams(params, data);
    //     }

    //     // launch a new process
    //     this.run(params, settings);

    //     this.log({
    //       clear: true,
    //       value: `Restarting the process "<yellow>${
    //         this._settings.name || this._settings.id
    //       }</yellow>" automatically`
    //     });
    //   });

    //   // launch the deamon if all is ready
    //   if (this._deamonInstance && settings.deamon.watchArgs) {
    //     this._deamonInstance.watch.apply(
    //       this._deamonInstance,
    //       settings.deamon.watchArgs
    //     );
    //   }
    // }
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
  run(processPromise, argsObj = {}, settings = {}) {
    // check that their's not another processing process
    if (this._currentPromise) {
      if (this._settings.throw) {
        throw new __SError(
          `Sorry but you cannot launch multiple processes in the sams <yellow>${this.constructor.name}</yellow> instance...`
        );
      } else {
        this.log({
          error: true,
          value: `Sorry but you cannot launch multiple processes in the sams <yellow>${this.constructor.name}</yellow> instance...`
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
    processPromise.on('close,cancel,resolve,reject', () => {
      this.endTime = Date.now();
      this.duration = this.endTime - this.startTime;

      if (this.deamon && this.deamon.state === 'watching') {
        this.log({
          value: this.deamon.logs.watching
        });
        this.state = 'watching';
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
      if (!this._currentPromise) return;
      this._currentPromise.trigger('log', arg);
    });
    // });
  }
}

// module.exports = SProcess;
module.exports = __SProcessInterface.implements(SProcess, [
  __SProcessInterface
]);
