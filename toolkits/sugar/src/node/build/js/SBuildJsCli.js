const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SBuildJsInterface = require('./interface/SBuildJsInterface');
const __SBuildJsProcess = require('./SBuildJsProcess');

/**
 * @name            SBuildJsCli
 * @namespace           sugar.node.build.js
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build JS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildJsCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.js %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildJsInterface;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the SCSS build process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SBuildJsProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    super(
      initialParams,
      __deepMerge(
        {
          id: 'build.js.cli',
          name: 'Cli Build Js',
          processSettings: {},
          childProcessSettings: {
            triggerParent: true
          }
        },
        settings
      )
    );
  }
}

module.exports = __SBuildJsInterface.implements(SBuildJsCli);
