const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SSugarAppInterface = require('./interface/SSugarAppInterface');
const __SSugarAppProcess = require('./SSugarAppProcess');

/**
 * @name            SSugarAppCli
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SCli
 *
 * This class represent the Sugar UI cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar app.sugar %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SSugarAppInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the SCSS build process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SSugarAppProcess;

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
          id: 'SSugarAppCli',
          name: 'Sugar App CLI'
        },
        settings
      )
    );
  }
}

// module.exports = SSugarAppCli;
module.exports = __SSugarAppInterface.implements(SSugarAppCli);
