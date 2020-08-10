const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name            SBuildDocNavCli
 * @namespace       node.build.docNav
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build documentation cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildDocNavCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.docNav %arguments';

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    input: {
      type: 'String|Array<String>',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('build.docNav.input') || 'src/**/*',
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.docNav.outputDir') || __packageRoot(),
      level: 1
    }
  };

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(settings);
  }
};
