import __completeArgsObject from '../cli/completeArgsObject';
import __path from 'path';
import __convert from '../time/convert';
import __wait from '../time/wait';
import __isClass from '../is/class';
import __onProcessExit from './onProcessExit';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '../object/deepMerge';
import __packageRoot from '../path/packageRoot';
import __isChildProcess from '../is/childProcess';
import __SIpcClient from '../ipc/SIpcClient';
import __SError from '../error/SError';
import __buildCommandLine from '../cli/buildCommandLine';
import __parseArgs from '../cli/parseArgs';
import __argsToObject from '../cli/argsToObject';
import __childProcess from 'child_process';
import __stdio from '../stdio/stdio';
import __stackTrace from 'stack-trace';
import __argsToString from '../cli/argsToString';
import __toString from '../string/toString';
import __copy from '../clipboard/copy';
import __spawn from './spawn';
import __parseHtml from '../console/parseHtml';
import __uniqid from '../string/uniqid';
import __SEventEmitter from '../event/SEventEmitter';
import __SProcessSettingsInterface from './interface/SProcessSettingsInterface';
import __SNotification from '../notification/SNotification';
import __SDuration from '../time/SDuration';

import { ILog } from '../log/log';
import { ISpawnSettings } from './spawn';
import { ISClass as __ISClass } from '../class/SClass';
import { ISStdio } from '../stdio/SStdio';
import { ISPromise } from '@coffeekraken/s-promise';
import { ISEventEmitter } from '../event/SEventEmitter';
import { ISInterface, ISInterfaceCtor } from '../interface/SInterface';

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
}

export interface ISProcessSettings {
  asyncStart: boolean;
  stdio: ISStdio;
  throw: boolean;
  runAsChild: boolean;
  paramsInterface: ISInterface | ISInterfaceCtor;
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
  ): Promise<any>;
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
      apply: true,
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
   * Can come from the static ```interfaces.params``` property or the ```settings.paramsInterface``` one.
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
    return (<any>this._settings).process;
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
    paramsOrStringArgs: String | Record<string, any> = {},
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
    initialParams: Record<string, unknown>,
    settings: ISProcessCtorSettings = {}
  ) {
    super(
      __deepMerge(
        {
          process: {}
        },
        settings
      )
    );

    // save initial params
    this.initialParams = Object.assign({}, initialParams);

    // get the definition from interface or settings
    this.paramsInterface = this.getInterface('params');
    if (this.processSettings.paramsInterface !== undefined)
      this.paramsInterface = this.processSettings.paramsInterface;

    // handle process exit
    __onProcessExit(async (state) => {
      this.state(state);
    });

    this._processPath = this.processSettings.processPath;
    for (var callSite of __stackTrace.get()) {
      if (callSite.getFunctionName() === this.constructor.name) {
        this._processPath = callSite.getFileName();
        break;
      }
    }
    if (!this._processPath) {
      throw new __SError(
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
  async run(
    paramsOrStringArgs = {},
    settings: Partial<ISProcessSettings> = {}
  ) {
    const processSettings = <ISProcessSettings>(
      __deepMerge(this.processSettings, settings)
    );

    if (this.currentExecutionObj !== undefined) {
      if (processSettings.throw === true) {
        throw new Error(
          `Sorry but you can not execute multiple process of the "<yellow>${
            this.name || this.id || this.constructor.name
          }</yellow>" SProcess instance...`
        );
      }
      return;
    }

    if (!__isChildProcess() && processSettings.stdio && !this.stdio) {
      this.stdio = __stdio(this, processSettings.stdio, {});
    }

    this._duration = new __SDuration();

    // init the currentExecution object
    // @ts-ignore
    this.currentExecutionObj = {
      state: 'idle',
      stdout: [],
      stderr: []
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

    await __wait(50);

    let paramsObj: any = __argsToObject(paramsOrStringArgs, {
      definition: {
        ...(this.paramsInterface !== undefined
          ? this.paramsInterface.definition
          : {}),
        processPath: {
          type: 'String'
        }
      }
    });

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

    // update state
    this.state('running');

    if (processSettings.runAsChild && !__isChildProcess()) {
      // build the command to run depending on the passed command in the constructor and the params
      const commandToRun = __buildCommandLine(
        `node --enable-source-maps ${__path.resolve(
          __dirname,
          '../../cli/sugar.cli.js'
        )} process.runChild [arguments]`,
        {
          ...paramsObj,
          processPath: this._processPath
        },
        {
          definition: {
            ...(this.paramsInterface !== undefined
              ? this.paramsInterface.definition
              : {}),
            processPath: {
              type: 'String',
              required: true
            }
          },
          alias: false
        }
      );

      // run child process
      this._processPromise = __spawn(commandToRun, [], {
        ...(processSettings.spawnSettings || {})
      });
    } else {
      // run the actual process using the "process" method
      this._processPromise = (<any>this).process(this._params, settings);

      if (
        __isChildProcess() &&
        process.send &&
        typeof process.send === 'function'
      ) {
        this._processPromise &&
          this._processPromise.on('*', (value, metas) => {
            process.send !== undefined &&
              process.send({
                value,
                metas
              });
          });
      }
    }

    this.pipe(<ISEventEmitter>(<unknown>this._processPromise), {});

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
        this.kill(data);
      });

    // updating state when needed
    this._processPromise &&
      this._processPromise.on(
        [
          'resolve:1',
          'reject:1',
          'cancel:1',
          'close.error:1',
          'close.killed:1'
        ].join(','),
        (data, metas) => {
          if (metas.event === 'resolve' || metas.event === 'close.success')
            this.state('success');
          else if (metas.event === 'reject' || metas.event === 'close.error')
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
    this._processPromise?.registerProxy('resolve', (value) => {
      if (value.spawn && value.value !== undefined) value = value.value;
      return {
        value,
        ...this.executionsStack.pop()
      };
      return value;
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

    let data;
    const strArray: string[] = [];
    if (
      !__isChildProcess() &&
      this._settings // @todo      check why this is causing context problem after 2 or 3 kill run...
    ) {
      switch (state) {
        case 'success':
          if (this.processSettings.decorators === true) {
            this.log({
              color: 'green',
              type: 'heading',
              value: `The <yellow>${this.name || 'process'}</yellow> <cyan>${
                this.id
              }</cyan> execution has finished <green>successfully</green> in <yellow>${__convert(
                this.currentExecutionObj?.duration,
                __convert.SECOND
              )}s</yellow>`
            });
          }
          // this.emit('notification', {
          //   type: 'success',
          //   title: `${this.id} success`
          // });
          break;
        case 'running':
          if (this.processSettings.decorators === true) {
            // log a start message
            this.log({
              type: 'heading',
              value: `Starting the <yellow>${
                this.name || 'process'
              }</yellow> <cyan>${this.id}</cyan> execution...`
            });
          }
          // this.emit('notification', {
          //   type: 'start',
          //   title: `${this.id} starting`
          // });
          break;
        case 'error':
          if (this.processSettings.decorators === true) {
            // @ts-ignore
            data = this.currentExecutionObj.stderr.toString();
            strArray.push(' ');
            strArray.push(
              `<red>${'-'.repeat(process.stdout.columns - 4)}</red>`
            );
            strArray.push(
              `<red>Something went wrong</red> during the <yellow>${
                this.name || 'process'
              }</yellow> <cyan>${this.id}</cyan> execution.`
            );
            if (
              this.currentExecutionObj &&
              this.currentExecutionObj.stderr.length
            ) {
              strArray.push(`Here's some details:`);
              strArray.push(data);
            }
            strArray.push(
              `<red>${'-'.repeat(process.stdout.columns - 4)}</red>`
            );
            strArray.push(' ');
            this.log({
              value: strArray.join('\n')
            });
          }
          // this.emit('notification', {
          //   type: 'error',
          //   title: `${this.id} error`
          // });
          break;
        case 'killed':
          if (this.processSettings.decorators === true) {
            // @ts-ignore
            data = this.currentExecutionObj.stderr.toString();
            strArray.push(' ');
            strArray.push(
              `<red>${'-'.repeat(process.stdout.columns - 4)}</red>`
            );
            strArray.push(
              `The <yellow>${this.name || 'process'}</yellow> <cyan>${
                this.id
              }</cyan> execution has been <red>killed</red>.`
            );
            if (
              this.currentExecutionObj &&
              this.currentExecutionObj.stderr.length
            ) {
              strArray.push(`Here's some details:`);
              strArray.push(data);
            }
            strArray.push(
              `<red>${'-'.repeat(process.stdout.columns - 4)}</red>`
            );
            strArray.push(' ');
            this.log({
              value: strArray.join('\n')
            });
          }
          // this.emit('notification', {
          //   type: 'error',
          //   title: `${this.id} killed`
          // });
          break;
      }
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
   * @param       {String}        message           The message you want to log
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
   * @param       {String}        message           The message you want to error
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
