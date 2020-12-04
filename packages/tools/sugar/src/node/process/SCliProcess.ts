import __SProcess from './SProcess';
import __buildCommandLine from '../cli/buildCommandLine';
import ISCliProcess, {
  ISCliProcessCtor,
  ISCliProcessSettings
} from './interface/ISCliProcess';
import __onProcessExit from './onProcessExit';

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
const Cls: ISCliProcessCtor = class SCliProcess
  extends __SProcess
  implements ISCliProcess {
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
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(command: string, settings: ISCliProcessSettings = {}) {
    super(settings);
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
  async process(
    params: object,
    settings: ISCliProcessSettings = {}
  ): Promise<any> {
    // build the command line
    const command = __buildCommandLine(this.command, params, {
      definition: this.definition,
      alias: false
    });

    const childProcess = __childProcess.spawn(command, [], {
      env: settings.env,
      shell: true
    });

    __onProcessExit(() => {
      childProcess.kill();
    });

    childProcess.on('close', (code, signal) => {
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
  }
};
export = Cls;
