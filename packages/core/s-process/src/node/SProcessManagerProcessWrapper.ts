// @ts-nocheck

import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SProcess from './SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { ISDurationObject } from '@coffeekraken/s-duration';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

import { ISEventEmitterPipeSettingsFilterFn } from '@coffeekraken/s-event-emitter';

/**
 * @name            SProcessManagerProcessWrapper
 * @namespace       s-process
 * @type            Class
 * @extends         SEventEmitter
 * @status              wip
 *
 * This class represent a process manager process wrapper that handle the actual restarting, watch, etc...
 *
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @see         https://www.npmjs.com/package/node-notifier
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISProcessManagerProcessWrapperExecution
  extends ISDurationObject {}

export interface ISProcessManagerProcessWrapperProcessRestartSettings {
  on: string;
  maxTimes: number;
  maxEvery: number;
  delay: number;
  before: Function;
}

export interface ISProcessManagerProcessWrapperProcessLogSettings {
  filter: ISEventEmitterPipeSettingsFilterFn;
}

export interface ISProcessManagerProcessWrapperCtorSettings {
  processManagerProcess: Partial<ISProcessManagerProcessWrapperSettings>;
}

export interface ISProcessManagerProcessWrapperSettings {
  stdio: string;
  restart:
    | Partial<ISProcessManagerProcessWrapperProcessRestartSettings>
    | boolean;
  log: ISProcessManagerProcessWrapperProcessLogSettings;
}

class SProcessManagerProcessWrapper extends __SEventEmitter {
  /**
   * @name          initialParams
   * @type          Object
   *
   * Store the initial params object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get initialParams() {
    return Object.assign({}, this._settings.initialParams);
  }

  /**
   * @name          processInstance
   * @type          SProcess
   *
   * Store the actual processInstance passed through the constructor
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  processInstance: typeof __SProcess;

  /**
   * @name          processManagerProcessSettings
   * @type          ISProcessManagerProcessWrapperSettings
   * @get
   *
   * Access the process manager process settings
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processManagerProcessSettings(): ISProcessManagerProcessWrapperSettings {
    return (<any>this)._settings.processManagerProcess;
  }

  _isDetached = false;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    processInstance,
    settings?: Partial<ISProcessManagerProcessWrapperCtorSettings>
  ) {
    super(
      __deepMerge(
        {
          processManagerProcess: {
            stdio: 'inherit',
            restart: false,
            log: {
              filter: undefined
            }
          }
        },
        settings
      )
    );

    // default restart settings
    const restartDefaultSettings = {
      on: 'reject',
      maxTimes: -1,
      maxEvery: -1,
      delay: 0,
      before: undefined
    };
    if (this.processManagerProcessSettings.restart === true) {
      this.processManagerProcessSettings.restart = restartDefaultSettings;
    } else if (__isPlainObject(this.processManagerProcessSettings.restart)) {
      this.processManagerProcessSettings.restart = {
        ...restartDefaultSettings,
        ...this.processManagerProcessSettings.restart
      };
    }
    // processInstance.processSettings.emitErrorAsEvent = true;
    processInstance.processSettings.stdio = false;
    this.processInstance = processInstance;
  }

  _currentProcessPromise = null;
  _handleRestartFor(processPromise) {
    if (this._isDetached) return;

    this._currentProcessPromise = processPromise;
    processPromise.on(
      'reject',
      async (value, metas) => {
        if (this._isDetached) return;

        await __wait(0);

        this.emit('log', {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `The process "<yellow>${this.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
        });

        // maxEvery
        if (this.processManagerProcessSettings.restart.maxEvery > 0) {
          if (
            this.processInstance.lastExecutionObj.endTime +
              this.processManagerProcessSettings.restart.maxEvery >=
            Date.now()
          ) {
            this.emit('log', {
              group: `s-process-manager-process-wrapper-${this.metas.id}`,
              value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`
            });
            // resolving the global run promise
            if (this._restartingProcessResolve && !this._isDetached) {
              this._restartingProcessResolve(
                this.processInstance.executionsStack
              );
            }
            return;
          }
        }

        // maxTimes
        if (this.processManagerProcessSettings.restart.maxTimes > 0) {
          if (
            this.processInstance.executionsStack.length >=
            this.processManagerProcessSettings.restart.maxTimes
          ) {
            this.emit('log', {
              group: `s-process-manager-process-wrapper-${this.metas.id}`,
              value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`
            });
            // resolving the global run promise
            if (this._restartingProcessResolve && !this._isDetached) {
              this._restartingProcessResolve(
                this.processInstance.executionsStack
              );
            }
            return;
          }
        }

        let newProcessArgs = Object.assign(
          {},
          this.processInstance.lastExecutionObj.params
        );

        // tweak params if a function is passed through settings
        if (
          this.processManagerProcessSettings.restart.before &&
          typeof this.processManagerProcessSettings.restart.before ===
            'function'
        ) {
          newProcessArgs = await this.processManagerProcessSettings.restart.before(
            this.processInstance.lastExecutionObj
          );
        }

        // of the "before" callback returns a nullysh value, do not restart
        if (!newProcessArgs) {
          this.emit('log', {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `Stop restarting the process "<yellow>${this.metas.id}</yellow>"`
          });

          // resolving the global run promise
          if (this._restartingProcessResolve && !this._isDetached) {
            this._restartingProcessResolve(
              this.processInstance.executionsStack
            );
          }

          return;
        }

        if (this.processManagerProcessSettings.restart.delay)
          this.emit(`log`, {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `Waiting <cyan>${
              this.processManagerProcessSettings.restart.delay / 1000
            }s</cyan> before restart...`
          });
        await __wait(this.processManagerProcessSettings.restart.delay);

        this.emit('log', {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `Restarting process "<yellow>${this.metas.id}</yellow>"`
        });

        // restart process
        this._run(newProcessArgs.params, newProcessArgs.settings);
      },
      {
        id: 'restartHandler'
      }
    );
  }

  /**
   * @name        detach
   * @type        Function
   *
   * This method has to be called by the process manager when this process has been detached
   * in order to clear some listeners, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  detach(): void {
    this._isDetached = true;
    if (this._currentProcessPromise)
      this._currentProcessPromise.off('restartHandler');
  }

  _run(paramsOrStringArgs = {}, settings: Partial<ISProcessSettings> = {}) {
    if (this._isDetached) return;
    const promise = this.processInstance.run(paramsOrStringArgs, settings);
    // handle restart
    if (this.processManagerProcessSettings.restart)
      this._handleRestartFor(promise);
    this.pipe(promise, {
      overrideEmitter: true
    });
    return promise;
  }

  /**
   * @name      run
   * @type      Function
   * @async
   *
   * Proxy to the ```run``` method on the passed processInstance
   *
   * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
   * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
   * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _restartingProcessResolve;
  run(paramsOrStringArgs = {}, settings: Partial<ISProcessSettings> = {}) {
    if (this._isDetached) {
      throw new Error(
        `Sorry but you cannot run this "<yellow>${this.metas.id}</yellow>" process cause it has been detached from the process manager`
      );
    }
    return new __SPromise(async ({ resolve }) => {
      this._restartingProcessResolve = resolve;

      // run the process
      const res = await this._run(paramsOrStringArgs, settings);

      // if restart is setted, do not resolve the promis
      if (!this.processManagerProcessSettings.restart && !this._isDetached) {
        resolve(res);
      }
    });
  }
}
export default SProcessManagerProcessWrapper;
