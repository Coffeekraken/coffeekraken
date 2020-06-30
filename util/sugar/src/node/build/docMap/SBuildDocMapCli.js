const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name            SBuildDocMapCli
 * @namespace       node.build.docMap
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build documentation cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildDocMapCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.docMap [arguments]';

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
      default: __sugarConfig('build.docMap.input') || 'src/**/*',
      level: 1
    },
    output: {
      type: 'String',
      alias: 'o',
      description: 'Output file path',
      default:
        __sugarConfig('build.docMap.output') ||
        `${__packageRoot()}/docMap.json`,
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
