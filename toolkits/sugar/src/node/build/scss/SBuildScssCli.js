const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SBuildScssCliInterface = require('./interface/SBuildScssCliInterface');
const __SBuildScssProcess = require('./SBuildScssProcess');

/**
 * @name            SBuildScssCli
 * @namespace           node.build.scss
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build SCSS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildScssCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.scss %arguments';

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = __SBuildScssCliInterface.definitionObj;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the SCSS build process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SBuildScssProcess;

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
          id: 'build.scss.cli',
          name: 'Cli Build Scss',
          childProcess: {
            pipe: ['log', 'update', 'add', 'unlink', 'state']
          }
        },
        settings
      )
    );
  }
}

// module.exports = SBuildScssCli;
module.exports = __SBuildScssCliInterface.implements(SBuildScssCli);
