const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SBuildConfigCli
 * @namespace           node.build.config
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build JS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildConfigCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.config %arguments';

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
      type: 'String',
      alias: 'i',
      description: 'Input files glob pattern',
      default: __sugarConfig('build.config.input') || 'src/config/*.config.js',
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.config.outputDir') || 'dist/config',
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
    super(
      __deepMerge(
        {
          id: 'build.config.cli',
          name: 'Build Config Cli'
        },
        settings
      )
    );
  }
};
