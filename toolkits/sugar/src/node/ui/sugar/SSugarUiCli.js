const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SSugarUiInterface = require('./interface/SSugarUiInterface');
const __SSugarUiProcess = require('./SSugarUiProcess');

/**
 * @name            SSugarUiCli
 * @namespace           node.ui.sugar
 * @type            Class
 * @extends         SCli
 *
 * This class represent the Sugar UI cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarUiCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar ui.sugar %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SSugarUiInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the SCSS build process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SSugarUiProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(args = {}, settings = {}) {
    super(
      args,
      __deepMerge(
        {
          id: 'ui.sugar.cli',
          name: 'Sugar UI'
        },
        settings
      )
    );
  }
}

// module.exports = SSugarUiCli;
module.exports = __SSugarUiInterface.implements(SSugarUiCli);
