// @ts-nocheck

import SProcessStdio from '../SProcessStdio';
import ISBlessedProcessStdio from // ISBlessedProcessStdioSettings,
// ISBlessedProcessStdioCtor,
// ISBlessedProcessStdioLog
'./interface/ISBlessedProcessStdio';
import ISPromise from '../../../promise/interface/ISPromise';
import SBlessedStdio from '../../../blessed/stdio/SBlessedStdio';

/**
 * @name          SBlessedProcessStdio
 * @namespace     sugar.node.process.Stdio
 * @type          Class
 * @extends       SProcessStdio
 * @wip
 *
 * This class represent the blessed based process Stdio
 * to display nicely all the logs, errors, etc...
 *
 * @param       {Array<SProcess>|SProcess}      source      The sources (usually SProcess instances) that you want to display the Stdio for
 * @param       {IBlessedProcessStdioSettings}     [settings={}]       Some settings to configure your Stdio instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedProcessStdio from '@coffeekraken/sugar/node/process/stdio/SBlessedProcessStdio';
 * const myProcess = new MyCoolProcess();
 * const blessedStdio = new SBlessedProcessStdio(myProcess);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISBlessedProcessStdioCtor = class SBlessedProcessStdio
  extends SProcessStdio
  implements ISBlessedProcessStdio {
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
    settings: ISBlessedProcessStdioSettings
  ) {
    super(source, settings);
    this._Stdio = new SBlessedStdio(source, {
      ...this._settings,
      attach: true
    });
  }

  /**
   * @name            log
   * @type            Function
   *
   * This method allows you to log something
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...logs: ISBlessedProcessStdioLog): void {
    this._Stdio.log(...logs);
  }
};

export = Cls;
