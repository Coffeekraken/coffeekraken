import __SProcess, { ISProcess } from './SProcess';
// import __buildCommandLine from '@coffeekraken/sugar/shared/cli/buildCommandLine';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

/**
 * @name          SCliProcess
 * @namespace     sugar.node.process
 * @Type          Class
 *
 * This class represent a subset of the SProcess class to make the use of command lines based process easy
 * and clean.
 *
 * @param       {String}        command         The command that will be used to run the process
 * @param       {ISCliProcessSettings}        [settings={}]       Some settings to configure your process
 *
 * @todo        Doc
 * @todo        Tests
 *
 * @example       js
 * import SCliProcess from '@coffeekraken/sugar/node/process/SCliProcess';
 * const pro = new SCliProcess('tsc {arguments} --watch');
 * await pro.run({
 *    some: 'arguments'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISCliProcessCtorSettings {
  cliProcess?: ISCliProcessSettings;
}

export interface ISCliProcessSettings {
  definition: any;
  spawn: any;
}

export interface ISCliProcessCtor {
  new (command: string, settings?: ISCliProcessSettings): ISCliProcess;
}

export interface ISCliProcess extends ISProcess {
  command?: string;
}

class SCliProcess extends __SProcess implements ISCliProcess {
  /**
   * @name      command
   * @type      String
   *
   * Store the constructor passed command
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  command: string;

  /**
   * @name      cliProcessSettings
   * @type      ISCliProcessSettings
   * @get
   *
   * Get the cliProcessSettings
   *
   * @since     2.0.0
   *
   */
  get cliProcessSettings(): ISCliProcessSettings {
    return (<any>this)._settings.cliProcess;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(command: string, settings: ISCliProcessCtorSettings = {}) {
    super(
      {},
      __deepMerge(
        {
          process: {
            runAsChild: false
          },
          cliProcess: {}
        },
        settings
      )
    );
    // save the command
    this.command = command;
  }

  /**
   * @name        process
   * @type        Function
   * @async
   *
   * Override the ```SProcess.process``` method to allow the execution
   * of command line process
   *
   * @param     {Object}       params         The passed params in object format
   * @param     {ISCliProcessSettings}      [settings={}]     Some settings to override the ones passed in the constructor
   * @return    {Promise}            An Promise instance that will be resolved once the process is finished or in error
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(
    params: Record<string, unknown>,
    settings: Partial<ISCliProcessSettings> = {}
  ): Promise<any> {
    const cliProcessSettings = <ISCliProcessSettings>(
      __deepMerge(this.cliProcessSettings, settings)
    );

    // build the command line
    // @WIP
    // const command = __buildCommandLine(this.command, params, {
    //   definition:
    //     cliProcessSettings.definition || this.paramsInterface?.definition || {},
    //   alias: false
    // });
    const command = 'ls -la';

    // @ts-ignore
    const pro = __spawn(command, [], {
      ...(this.cliProcessSettings.spawn || this.processSettings.spawn || {})
    });

    // @ts-ignore
    return pro;
  }
}
export default SCliProcess;
