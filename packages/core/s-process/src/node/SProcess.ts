import __SPromise from '@coffeekraken/s-promise';
import __path from 'path';
import __stackTrace from 'stack-trace';
import { ISClass as __ISClass } from '@coffeekraken/s-class';
import __buildCommandLine from '@coffeekraken/sugar/shared/cli/buildCommandLine';
import __SEventEmitter, { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import { ILog } from '@coffeekraken/sugar/shared/log/log';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __SDuration from '@coffeekraken/s-duration';
import { ISInterface, ISInterfaceCtor } from '@coffeekraken/s-interface';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __SStdio, { ISStdio } from '@coffeekraken/s-stdio';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __spawn, {
  ISpawnSettings
} from '@coffeekraken/sugar/node/process/spawn';
import __toJson from '@coffeekraken/sugar/shared/object/toJson';

// process.on('uncaughtException', function (err) {
//   console.log('CAUGHT__', err);
// });
// process.on('unhandledRejection', function (err) {
//   console.log('CAUGHT', err);
// });

/**
 * @name                SProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SEventEmitter
 * @status              wip
 *
 * This class represent an SProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISProcessObject {
  state: string;
  startTime: number;
  endTime: number;
  duration: number;
  stdout: string[];
  stderr: string[];
  value: any;
}

export interface ISProcessNotificationSettings {
  enable: boolean;
}

export interface ISProcessCtorSettings {
  process?: Partial<ISProcessSettings>;
}

export interface ISProcessProcessObj {
  startTime: number;
  endTime: number;
  duration: number;
  state: string;
  stdout: any[];
  stderr: any[];
  params: any;
  settings: Partial<ISProcessSettings>;
}

export interface ISProcessSettings {
  asyncStart: boolean;
  killOnError: boolean;
  emitErrorAsEvent: boolean;
  stdio: ISStdio;
  throw: boolean;
  runAsChild: boolean;
  interface: ISInterface | ISInterfaceCtor;
  processPath: string;
  notification: ISProcessNotificationSettings;
  env: Record<string, unknown>;
  spawn: Record<string, unknown>;
  decorators: boolean;
  spawnSettings: ISpawnSettings;
  exitAtEnd: boolean;
}

export interface ISProcessCtor {
  new (params: Record<string, unknown>, settings: ISProcessSettings): ISProcess;
}
export interface ISProcessInternal extends __ISClass {
  run(
    paramsOrStringArgs: Record<string, unknown> | string,
    settings: ISProcessSettings
  ): any;
  kill(data: any): void;
  log(...logs: ILog[]): void;
  error(...errors: ILog[]): void;
}
export interface ISProcess extends ISProcessInternal {
  process(params: Record<string, unknown>, settings?: any);
}

class SProcess extends __SEventEmitter implements ISProcessInternal {
  static interfaces = {
    settings: {
      on: '_settings.process',
      class: __SProcessSettingsInterface
    }
  };

  /**
   * @name      params
   * @type      String
   * @get
   *
   * Access the process params
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _params?: Record<string, unknown>;
  get params() {
    return this._params;
  }

  /**
   * @name      stdio
   * @type      SProcessOutput
   *
   * Access the stdio class initiated if exists
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  stdio = undefined;

  /**
   * @name      state
   * @type      String
   *
   * Access the process state like 'idle', 'ready', 'running', 'killed', 'error', 'success'
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _state = 'idle';

  /**
   * @name      executionsStack
   * @type      ISProcessProcessObj[]
   *
   * This array store each executions informations in separated objects
   * that store the duration, startTime, endTime, state, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  executionsStack: ISProcessProcessObj[] = [];

  /**
   * @name     currentExecutionObj
   * @type      ISProcessProcessObj
   *
   * Store the current execution object info like startTime, endTime, duration, state, etc...
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  currentExecutionObj?: ISProcessProcessObj;

  /**
   * @name      paramsInterface
   * @type      Object
   *
   * Store the parameters interface to apply on the params object and on the initialParams object.
   * Can come from the static ```interfaces.params``` property or the ```settings.interface``` one.
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  paramsInterface: any;

  /**
   * @name      initialParams
   * @type      Object
   * @private
   *
   * Store the initial params passed in the constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  initialParams: Record<string, unknown>;

  /**
   * @name      _processPromise
   * @type      ISPromise
   * @private
   *
   * Store the current process promise returned by the ```spawn``` function
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processPromise?: __SPromise;

  /**
   * @name      _processPath
   * @type      String
   * @private
   *
   * Store the process class path
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _processPath?: string;

  get processSettings(): ISProcessSettings {
    return (<any>this)._settings.process;
  }

  /**
   * @name            run
   * @type            Function
   * @static
   * @async
   *
   * Static "run" function to use as a shortcut of the new, and run call
   *
   * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
   * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
   * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static async run(
    paramsOrStringArgs: string | Record<string, any> = {},
    settings: Partial<ISProcessSettings> = {}
  ) {
    const instance = new this({});
    return instance.run(paramsOrStringArgs, settings);
  }

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
  constructor(
    initialParams?: Record<string, unknown>,
    settings?: ISProcessCtorSettings
  ) {
    super(
      __deepMerge(
        {
          process: {}
        },
        settings ?? {}
      )
    );

    // save initial params
    this.initialParams = Object.assign({}, initialParams ?? {});

    // get the definition from interface or settings
    this.paramsInterface =
      (<any>this).constructor.interface ?? this.getInterface('params');
    if (this.processSettings.interface !== undefined)
      this.paramsInterface = this.processSettings.interface;

    // handle process exit
    __onProcessExit(async (state) => {
      this.state(state);
    });

    this._processPath = this.processSettings.processPath;
    for (const callSite of __stackTrace.get()) {
      if (callSite.getFunctionName() === this.constructor.name) {
        this._processPath = callSite.getFileName();
        break;
      }
    }
    if (!this._processPath) {
      throw new Error(
        `An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`
      );
    }

    // ready if not an asyncStart process
    if (this.processSettings.asyncStart === false) {
      setTimeout(() => {
        this.ready();
      });
    }
  }

  /**
   * @name        lastExecutionObj
   * @type        ISProcessProcessObj
   *
   * Get the last execution object
   *
   * @since       2.0.0
   *
   */
  get lastExecutionObj(): ISProcessProcessObj | -1 {
    if (!this.executionsStack.length) return -1;
    return <ISProcessProcessObj>(
      this.executionsStack[this.executionsStack.length - 1]
    );
  }

  /**
   * @name        process
   * @type        Function
   * @abstract
   *
   * This is the method you have to implement in you SProcess class. It will be called
   * when you call the ```run``` method with the params, etc...
   * You have to return an SPromise instance in order that the SProcess class is able to keep
   * track of your process state, logs, etc...
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name      ready
   * @type      Function
   *
   * This method allows you to set the process in the "ready" state.
   * This will make the stdio initialize, etc...
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  ready() {
    if (this.state() === 'ready') return;
    this.state('ready');
  }

  /**
   * @name      run
   * @type      Function
   * @async
   *
   * Run the process by calling the ```process``` method implemented on your
   * SProcess class (if exists).
   * Take care of starting timers for duration tracking, etc...
   *
   * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
   * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
   * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _duration: any;
  _restarted = 0;
  run(paramsOrStringArgs = {}, settings: Partial<ISProcessSettings> = {}) {
    const processSettings = <ISProcessSettings>(
      __deepMerge(this.processSettings, settings)
    );

    if (this.currentExecutionObj !== undefined) {
      if (processSettings.throw === true) {
        throw new Error(
          `Sorry but you can not execute multiple process of the "<yellow>${
            this.metas.name || this.metas.id || this.constructor.name
          }</yellow>" SProcess instance...`
        );
      }
      return;
    }

    if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
      this.stdio = __SStdio.new(this, processSettings.stdio, {});
    }

    this._duration = new __SDuration();

    // init the currentExecution object
    // @ts-ignore
    this.currentExecutionObj = {
      state: 'idle',
      stdout: [],
      stderr: [],
      settings: Object.assign({}, settings)
    };
    if (this.currentExecutionObj) {
      this.currentExecutionObj.stdout.toString = () => {
        if (!this.currentExecutionObj) return '';
        return this.currentExecutionObj.stdout
          .map((item) => {
            return __toString(item);
          })
          .join('\n');
      };
      this.currentExecutionObj.stderr.toString = () => {
        if (!this.currentExecutionObj) return '';
        return this.currentExecutionObj.stderr
          .map((item) => {
            return __toString(item);
          })
          .join('\n');
      };
    }

    const paramsObj = this.paramsInterface.apply(paramsOrStringArgs, {
      baseObj: this.initialParams ?? {}
    }).value;

    // check if asking for the help
    if (paramsObj.help === true && this.paramsInterface !== undefined) {
      const helpString = this.paramsInterface.render();
      this.emit('log', {
        value: helpString
      });
      return;
    }

    // save current process params
    this._params = Object.assign({}, paramsObj);

    // add params in the current execution object
    // @ts-ignore
    this.currentExecutionObj.params = Object.assign({}, paramsObj);

    // update state
    this.state('running');

    if (processSettings.runAsChild && !__isChildProcess()) {
      // build the command to run depending on the passed command in the constructor and the params
      const commandToRun = __buildCommandLine(
        `node --enable-source-maps ${__path.resolve(
          __dirname,
          'runAsChild.cli.js'
        )} [arguments]`,
        {
          ...paramsObj,
          processPath: this._processPath,
          _settings: processSettings
        }
      );

      // run child process
      this._processPromise = __spawn(commandToRun, [], {
        ...(processSettings.spawnSettings || {})
      });
    } else {
      // run the actual process using the "process" method
      this._processPromise = (<any>this).process(this._params, processSettings);

      if (
        __isChildProcess() &&
        process.send &&
        typeof process.send === 'function'
      ) {
        this._processPromise &&
          this._processPromise.on('*', (value, metas) => {
            if (value.value && value.value instanceof Error) {
              value.value = __toString(value.value);
            }
            // console.log('EEE', value);
            process.send !== undefined &&
              process.send({
                value,
                metas
              });
          });
      }
    }

    this.pipe(<ISEventEmitter>(<unknown>this._processPromise), {});

    if (this._processPromise?.promiseSettings) {
      this._processPromise.promiseSettings.emitErrorAsEvent = this.processSettings.emitErrorAsEvent;
    }

    // listen for "data" and "log" events
    this._processPromise &&
      this._processPromise.on('log', (data, metas) => {
        if (this.currentExecutionObj) {
          this.currentExecutionObj.stdout.push(data);
        }
      });
    // listen for errors
    this._processPromise &&
      this._processPromise.on('error,reject', (data, metas) => {
        if (this.currentExecutionObj) {
          this.currentExecutionObj.stderr.push(data);
        }
        if (!this.processSettings.killOnError && metas.event === 'error')
          return;
        // this.kill(data);
      });

    // updating state when needed
    this._processPromise &&
      this._processPromise.on(
        [
          'resolve:1',
          'reject:1',
          'cancel:1',
          'error:1',
          'success:1',
          'close.success:1',
          'close.error:1',
          'close.killed:1'
        ].join(','),
        (data, metas) => {
          if (metas.event === 'resolve' || metas.event === 'close.success')
            this.state('success');
          else if (
            metas.event === 'reject' ||
            metas.event === 'error' ||
            metas.event === 'close.error'
          )
            this.state('error');
          else if (metas.event === 'cancel' || metas.event === 'close.killed')
            this.state('killed');
          else this.state('idle');
        }
      );

    this._processPromise &&
      this._processPromise.on('finally', (value, metas) => {
        // @ts-ignore
        if (this.processSettings.exitAtEnd === true) {
          process.exit();
        }
      });

    // register some proxies
    this._processPromise?.registerProxy('resolve,reject', (value) => {
      if (value.value !== undefined) value = value.value;
      return {
        value,
        ...this.executionsStack[this.executionsStack.length - 1]
      };
    });

    // return the process promise
    return this._processPromise;
  }

  state(value?: string) {
    if (!value) return this._state;
    if (
      ['idle', 'ready', 'running', 'killed', 'error', 'success'].indexOf(
        value
      ) === -1
    ) {
      throw new Error(
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

    // emit an event
    this.emit(`state.${value}`, undefined);
    this.emit('state', value);
    this._state = value;
    this._onStateChange(value);
    return this._state;
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
  kill(data) {
    // call the cancel method on the parent SPromise instance
    this.cancel(data);
  }

  /**
   * @name        cancel
   * @type        Function
   *
   *
   * This method allows you to cancel the process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cancel(data) {
    if (this.state() === 'running') this.state('killed');
    // cancel the passed promise
    if (this._processPromise && this._processPromise.cancel) {
      this._processPromise.cancel(data);
      setTimeout(() => {
        this.emit('error', data);
      }, 50);
    }
  }

  /**
   * @name        _onStateChange
   * @type        Function
   * @private
   *
   * This method is called each tie the state change to reflect
   * this in the console feed
   *
   * @param     {String}        state       The new state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _onStateChange(state) {
    // update the current execution state
    if (!this.currentExecutionObj) return;

    this.currentExecutionObj.state = state;

    // check if is the end of the process
    if (state === 'killed' || state === 'error' || state === 'success') {
      this.currentExecutionObj = {
        ...this.currentExecutionObj,
        ...this._duration.end()
      };
    }

    if (state === 'success' || state === 'killed' || state === 'error') {
      // push the currentExecutionObj into the execution stack
      this.executionsStack.push(Object.assign({}, this.currentExecutionObj));
      // reset the currentExecutionObj
      this.currentExecutionObj = undefined;
    }
  }

  /**
   * @name          isRunning
   * @type          Function
   *
   * This method allows you to check if the process is currently running or not
   *
   * @return      {Boolean}         true if is running, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isRunning() {
    return this.state() === 'running';
  }

  /**
   * @name          isIdle
   * @type          Function
   *
   * This method allows you to check if the process is currently idle or not
   *
   * @return      {Boolean}         true if is idle, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isIdle() {
    return this.state() === 'idle';
  }

  /**
   * @name          isReady
   * @type          Function
   *
   * This method allows you to check if the process is currently ready or not
   *
   * @return      {Boolean}         true if is ready, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isReady() {
    return this.state() !== 'idle';
  }

  /**
   * @name          isKilled
   * @type          Function
   *
   * This method allows you to check if the process has been killed or not
   *
   * @return      {Boolean}         true if is killed, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isKilled() {
    return this.state() === 'killed';
  }

  /**
   * @name          isError
   * @type          Function
   *
   * This method allows you to check if the process is in error state or not
   *
   * @return      {Boolean}         true if is in error state, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isError() {
    return this.state() === 'error';
  }

  /**
   * @name          isSuccess
   * @type          Function
   *
   * This method allows you to check if the process is in success state or not
   *
   * @return      {Boolean}         true if is in success state, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isSuccess() {
    return this.state() === 'success';
  }

  /**
   * @name          log
   * @type          Function
   *
   * This method allows you to log a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to log
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...logs: ILog[]) {
    logs.forEach((log) => {
      if (this.currentExecutionObj) {
        this.currentExecutionObj.stdout.push(log.value || log.toString());
      }
      this.emit('log', log);
    });
  }

  /**
   * @name          error
   * @type          Function
   *
   * This method allows you to error a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to error
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  error(...errors: ILog[]) {
    errors.forEach((error) => {
      if (this.currentExecutionObj) {
        this.currentExecutionObj.stderr.push(error.value || error.toString());
      }
      this.emit('error', error);
    });
  }
}

export default SProcess;
