const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SBuildFrontspecInterface = require('./interface/SBuildFrontspecInterface');
const __SBuildFrontspecProcess = require('./SBuildFrontspecProcess');

/**
 * @name            SBuildFrontspecCli
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build Frontspec cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildFrontspecCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.frontspec %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildFrontspecInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the SCSS build process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SBuildFrontspecProcess;

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
          id: 'SBuildFrontspecCli',
          name: 'Cli Build Frontspec'
        },
        settings
      )
    );
  }
}

// module.exports = SBuildFrontspecCli;
module.exports = __SBuildFrontspecInterface.implements(SBuildFrontspecCli);
