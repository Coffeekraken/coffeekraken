import {
  ISCommandProcessSettings,
  ISCommandProcessCtorSettings,
  ISCommandProcessParams,
  ISProcessResultObject
} from './ISProcess';
import __SProcess from './SProcess';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SCommandProcessInterface from './interface/SCommandProcessInterface';
import __spawn, {
  ISpawnSettings
} from '@coffeekraken/sugar/node/process/spawn';

/**
 * @name            SCommandProcess
 * @namespace       s-process
 * @type            Class
 * @extends         SProcess
 * @status          wip
 *
 * This class represent an SProcess started with a simple bash command like "ls -la" or whatever
 *
 * @param       {ISCommandProcessCtorSettings}          [settings={}]           Some settings to configure your command process
 *
 * @example         js
 * import { SCommandProcess } from '@coffeekreken/s-process';
 * const commandProcess = new SCommandProcess();
 * commandProcess.run('npm i');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

// @ts-ignore
export default class SCommandProcess extends __SProcess {
  static interfaces = {
    params: __SCommandProcessInterface
  };

  /**
   * @name        commandProcessSettings
   * @type          ISCommandProcessSettings
   * @get
   *
   * Access the command process settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get commandProcessSettings(): ISCommandProcessSettings {
    return (<any>this)._settings.commandProcess;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(
    initialParams?: Partial<ISCommandProcessParams>,
    settings?: Partial<ISCommandProcessCtorSettings>
  ) {
    super(
      initialParams ?? {},
      __deepMerge(
        {
          commandProcess: {}
        },
        settings ?? {},
        {
          process: {
            runAsChild: false
          }
        }
      )
    );
  }

  /**
   * @name          process
   * @type          Function
   * @async
   *
   * Run the actual command through a ```spawn``` call.
   * The spawn function used here is the sugar one stored in "sugar.node.process.spawn"
   *
   * @param         {String}        command         The command you want to execute
   * @param         {ISCommandProcessSettings}      [settings={}]       Some command process settings you want to override
   * @return        {SPromise}                  An SPromise through which you can subscribe for some ```log``` and that will be resolved once the command has ended
   *
   * @since		2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  process(
    params: any,
    settings?: Partial<ISCommandProcessSettings>
  ): Promise<ISProcessResultObject> {
    const set = <ISCommandProcessSettings>(
      __deepMerge(this.commandProcessSettings, settings ?? {})
    );
    return __spawn(params.command, [], {
      returnValueOnly: true,
      ...set.spawnSettings
    });
  }
}
