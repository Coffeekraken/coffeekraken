// @ts-nocheck

import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SProcess from './SProcess';
import __SPromise from '@coffeekraken/s-promise';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { ISDurationObject } from '@coffeekraken/s-duration';

/**
 * @name            SProcessManagerProcess
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

export interface ISProcessManagerProcessExecution extends ISDurationObject {}

export interface ISProcessManagerProcessProcessRestartSettings {
  on: string;
  max: number;
  delay: number;
  before: Function;
}

export interface ISProcessManagerProcessCtorSettings {
  processManagerProcess: Partial<ISProcessManagerProcessSettings>;
}

export interface ISProcessManagerProcessSettings {
  // stdio:
  restart: Partial<ISProcessManagerProcessProcessRestartSettings> | boolean;
}

class SProcessManagerProcess extends __SEventEmitter {
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
   * @type          ISProcessManagerProcessSettings
   * @get
   *
   * Access the process manager process settings
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processManagerProcessSettings(): ISProcessManagerProcessSettings {
    return (<any>this)._settings.processManagerProcess;
  }

  /**
   * @name          _restartsStack
   * @type          Array<ISProcessManagerProcessExecution>
   * @private
   *
   * Store each restarts with times, params, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _restartsStack: ISProcessManagerProcessExecution[] = [];

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
    settings?: Partial<ISProcessManagerProcessCtorSettings>
  ) {
    super(
      __deepMerge(
        {
          processManagerProcess: {
            stdio: 'inherit',
            restart: {
              on: 'error,reject',
              max: -1,
              delay: 0,
              processParams: undefined
            }
          }
        },
        settings
      )
    );

    processInstance.processSettings.emitErrorAsEvent = true;
    processInstance.processSettings.stdio = false;

    this.processInstance = processInstance;

    processInstance.on(
      this.processManagerProcessSettings.restart.on,
      async (value, metas) => {
        await __wait(0);

        this.emit('log', {
          value: `The process "<yellow>${processInstance.metas.id}</yellow>" has been stoped after a(n) <red>${processInstance.lastExecutionObj.state}</red> after <cyan>${processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
        });

        let newProcessArgs = Object.assign(
          {},
          processInstance.lastExecutionObj
        );

        // tweak params if a function is passed through settings
        if (
          this.processManagerProcessSettings.restart.before &&
          typeof this.processManagerProcessSettings.restart.before ===
            'function'
        ) {
          newProcessArgs = await this.processManagerProcessSettings.restart.before(
            processInstance.lastExecutionObj
          );
        }

        // of the "before" callback returns a nullysh value, do not restart
        if (!newProcessArgs) {
          this.emit('log', {
            value: `Stop restarting the process "<yellow>${processInstance.metas.id}</yellow>"`
          });
          return;
        }

        if (this.processManagerProcessSettings.restart.delay)
          this.emit(`log`, {
            value: `Waiting <cyan>${
              this.processManagerProcessSettings.restart.delay / 1000
            }s</cyan> before restart...`
          });
        await __wait(this.processManagerProcessSettings.restart.delay);

        this.emit('log', {
          value: `Restarting process "<yellow>${processInstance.metas.id}</yellow>"`
        });

        // restart process
        this.run(newProcessArgs.params, newProcessArgs.settings);
      }
    );
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
  run(paramsOrStringArgs = {}, settings: Partial<ISProcessSettings> = {}) {
    const promise = this.processInstance.run(paramsOrStringArgs, settings);
    this.pipe(promise, {
      // overrideEmitter: true
    });
    return promise;
  }
}
export default SProcessManagerProcess;
