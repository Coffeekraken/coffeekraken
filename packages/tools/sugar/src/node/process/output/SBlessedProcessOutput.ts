import __SProcessOutput from '../SProcessOutput'

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
export class SBlessedProcessOutput extends __SProcessOutput {

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
  constructor(source: , settings)

}