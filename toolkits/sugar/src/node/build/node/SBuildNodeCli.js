const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SBuildNodeCli
 * @namespace           node.build.node
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build Node cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildNodeCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.node %arguments';

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
      default: __sugarConfig('build.node.input') || 'src/node/*.(js|ts/tsx)',
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.node.outputDir') || 'dist/node',
      level: 1
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.node.map'),
      level: 1
    },
    prod: {
      type: 'Boolean',
      description: 'Generate the production ready files',
      default: __sugarConfig('build.node.prod'),
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
          id: 'build.node',
          name: 'Build Node'
        },
        settings
      )
    );
  }
};
