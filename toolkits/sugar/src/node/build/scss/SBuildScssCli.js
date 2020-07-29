const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __packageRoot = require('../../path/packageRoot');
const __SBuildScssActionsStream = require('../../build/scss/SBuildScssActionsStream');
const __output = require('../../process/output');

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
      default: __sugarConfig('build.scss.input'),
      level: 1
    },
    outputDir: {
      type: 'String',
      alias: 'o',
      description: 'Output directory path',
      default: __sugarConfig('build.scss.outputDir'),
      level: 1
    },
    watch: {
      type: 'String|Object',
      alias: 'w',
      description: 'Watch files glob pattern or settings object',
      default: __sugarConfig('build.scss.watch'),
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
    sugarJsonDirs: {
      type: 'String|Array<String>',
      alias: 'a',
      description: 'Specify the directory where to search for sugar.json files',
      default: __sugarConfig('core.sugarJsonDirs'),
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

  /**
   * @name            childRun
   * @type            Function
   * @override
   *
   * This method is the one that will be called once you call ```run```  inside a child process.
   * At first, the SCli class check if you are running in a child process. If not, it will
   * generate one to run your actual logic. This function represent the code that will
   * be actually runned.
   *
   * @param       {Object}        argsObj         The object of passed arguments
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  childRun(argsObj) {
    const stream = new __SBuildScssActionsStream();
    const proc = stream.start(argsObj);
    __output(proc);
    return proc;
  }
};
