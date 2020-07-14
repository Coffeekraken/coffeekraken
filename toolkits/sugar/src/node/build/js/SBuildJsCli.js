const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SBuildJsCli
 * @namespace           node.build.js
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build JS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.js [arguments]';

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
      default: __sugarConfig('build.js.input') || 'src/js/*.js',
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.js.outputDir') || 'dist/js',
      level: 1
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.js.map'),
      level: 1
    },
    pack: {
      type: 'Boolean|Array',
      alias: 'p',
      description:
        'Specify some files to pack using webpack, true to pack all the files or false to simply process them using babel',
      default: __sugarConfig('build.js.pack'),
      level: 1
    },
    prod: {
      type: 'Boolean',
      description: 'Generate the production ready files',
      default: __sugarConfig('build.js.prod'),
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
