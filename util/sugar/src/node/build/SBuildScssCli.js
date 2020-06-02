const __SCli = require('../cli/SCli');
const __sugarConfig = require('../config/sugar');

/**
 * @name            SBuildScssCli
 * @namespace       sugar.node.build
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build SCSS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildScssCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar build.scss [arguments]';

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
      default: __sugarConfig('build.scss.input') || 'src/scss/**/*.scss',
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.scss.outputDir') || 'dist/css',
      level: 1
    },
    style: {
      type: 'String',
      alias: 's',
      description: 'Output style (nested,expanded,compact,compressed)',
      default: __sugarConfig('build.scss.style') || 'expanded',
      level: 1
    },
    map: {
      type: 'Boolean',
      alias: 'm',
      description: 'Generate a sourcemap file',
      default: __sugarConfig('build.scss.map') || true,
      level: 1
    },
    prod: {
      type: 'Boolean',
      alias: 'p',
      description: 'Generate the production ready files',
      default: __sugarConfig('build.scss.prod') || false,
      level: 1
    },
    'import.sugar': {
      type: 'Boolean',
      description: 'Import the coffeekraken sugar toolkit',
      default: __sugarConfig('build.scss.import.sugar') || true,
      level: 1
    },
    'vendor.sass': {
      type: 'Object',
      description: 'Object passed to the sass compiler',
      default: __sugarConfig('build.scss.vendor.sass') || {},
      level: 2
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
