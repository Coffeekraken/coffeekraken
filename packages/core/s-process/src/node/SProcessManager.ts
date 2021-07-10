// @ts-nocheck

import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SProcess from './SProcess';
import __SStdio from '@coffeekraken/s-stdio';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __SProcessManagerProcessWrapper, {
  ISProcessManagerProcessWrapperSettings
} from './SProcessManagerProcessWrapper';

/**
 * @name            SProcessManager
 * @namespace       s-process
 * @type            Class
 * @extends         SEventEmitter
 * @status              wip
 *
 * This class represent a process handler class that will fire up some SProcess processes
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

export interface ISProcessManagerProcessSettings
  extends ISProcessManagerProcessWrapperSettings {}

export interface ISProcessManagerCtorSettings {
  processManager: Partial<ISProcessManagerSettings>;
}
export interface ISProcessManagerSettings {
  stdio: __SStdio | string;
}

class SProcessManager extends __SEventEmitter {
  /**
   * @name        _processesStack
   * @type        Record<string, SProcess>
   * @private
   *
   * Store all the processes that this manager has launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processesStack: Record<string, __SProcess> = {};

  /**
   * @name          processManageSettings
   * @type          ISProcessManageSettings
   * @get
   *
   * Access the process manager process settings
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get processManagerSettings(): ISProcessManageSettings {
    return (<any>this)._settings.processManager;
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
  constructor(settings?: Partial<ISProcessManagerCtorSettings>) {
    super(
      __deepMerge(
        {
          processManager: {
            stdio: 'terminal',
            stdioSettings: {}
          }
        },
        settings ?? {}
      )
    );

    if (this.processManagerSettings.stdio) {
      (async () => {
        this._stdio = await __SStdio.new(
          [],
          this.processManagerSettings.stdio,
          this.processManagerSettings.stdioSettings
        );
      })();
    }
  }

  /**
   * @name        attachProcess
   * @type        Function
   *
   * This method allows you to attach a process to the manager with
   * his proper settings like restart, etc...
   *
   * @param       {String}        id                    A uniquid for your process
   * @param       {SProcess}      processInstance       The actual process instance
   * @param       {ISProcessManagerProcessWrapperSettings}     [settings={}]       Some settings to configure your added process management like restart, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  attachProcess(
    id: string,
    processInstance: __SProcess,
    settings?: Partial<ISProcessManagerProcessWrapperSettings>
  ): void {
    // avoid multiple same processes
    if (this._processesStack[id])
      throw new Error(
        `<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`
      );

    const instanceId =
      this.constructor.name === 'SProcessManager'
        ? `SPM.${id}`
        : `${this.constructor.name}.${id}`;
    const processManagerProcess = new __SProcessManagerProcessWrapper(
      processInstance,
      {
        metas: {
          color: __getColorFor(instanceId, {
            scope: this.constructor.name
          }),
          id: instanceId
        },
        processManagerProcess: settings ?? {}
      }
    );

    // register process for stdio
    if (this._stdio) this._stdio.registerSource(processManagerProcess);

    this._processesStack[id] = processManagerProcess;
  }

  /**
   * @name          detachProcess
   * @type          Function
   *
   * Simple method to detach a process from the manager using his id.
   *
   * @param       {String}      id        The process id to detach
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  detachProcess(id: string): void {
    if (!this._processesStack[id])
      throw new Error(
        `<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`
      );
    this._processesStack[id].detach();
  }

  /**
   * @name      run
   * @type      Function
   * @async
   *
   * Proxy to the ```run``` method on the passed processInstance for the specified process id
   *
   * @param     {String}              processId             The process id you want to run
   * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
   * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
   * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(
    processId,
    paramsOrStringArgs = {},
    settings: Partial<ISProcessSettings> = {}
  ) {
    if (!this._processesStack[processId])
      throw new Error(
        `<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${id}</magenta>"`
      );
    // emit a run event
    this.emit(`${processId}.run`, {
      time: Date.now()
    });
    // run the process
    const promise = this._processesStack[processId].run(
      paramsOrStringArgs,
      settings
    );
    this.pipe(promise, {
      prefixEvent: processId,
      exclude: [],
      overrideEmitter: true
    });
    return promise;
  }
}
export default SProcessManager;
