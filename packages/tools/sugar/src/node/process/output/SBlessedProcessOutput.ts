import SProcessOutput from '../SProcessOutput';
import ISBlessedProcessOutput, {
  ISBlessedProcessOutputSettings,
  ISBlessedProcessOutputCtor
} from './interface/ISBlessedProcessOutput';
import ISPromise from '../../promise/interface/ISPromise';
import SBlessedOutput from '../../blessed/SBlessedOutput';

/**
 * @name          SBlessedProcessOutput
 * @namespace     sugar.node.process.output
 * @type          Class
 * @extends       SProcessOutput
 *
 * This class represent the blessed based process output
 * to display nicely all the logs, errors, etc...
 *
 * @param       {Array<SProcess>|SProcess}      source      The sources (usually SProcess instances) that you want to display the output for
 * @param       {IBlessedProcessOutputSettings}     [settings={}]       Some settings to configure your output instance
 *
 * @example       js
 * import SBlessedProcessOutput from '@coffeekraken/sugar/node/process/output/SBlessedProcessOutput';
 * const myProcess = new MyCoolProcess();
 * const blessedOutput = new SBlessedProcessOutput(myProcess);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISBlessedProcessOutputCtor = class SBlessedProcessOutput
  extends SProcessOutput
  implements ISBlessedProcessOutput {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    source: ISPromise | ISPromise[],
    settings: ISBlessedProcessOutputSettings
  ) {
    super(source, settings);
    new SBlessedOutput(this._sources, this._settings);
  }
};

export default Cls;
