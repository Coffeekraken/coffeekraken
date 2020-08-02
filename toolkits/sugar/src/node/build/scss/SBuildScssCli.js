const __SCli = require('../../cli/SCli');
const __sugarConfig = require('../../config/sugar');
const __SBuildScssActionsStream = require('../../build/scss/SBuildScssActionsStream');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');

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
    super(
      __deepMerge(
        {
          id: 'build.scss',
          name: 'Build Scss'
        },
        settings
      )
    );
  }

  /**
   * @name            _run
   * @type            Function
   * @private
   *
   * This method is the one that will be called once you call ```run```.
   * The params passed are processed by the ```run``` parent method so you can
   * confidently trust them.
   * You MUST return an SPromise instance so that the spawned process can be
   * managed automatically in the parent ```run``` method.
   *
   * @param       {Object}        argsObj         The object of passed arguments
   * @param       {Object}        [settings={}]     The passed settings object
   * @return      {SPromise}                      An SPromise instance through which the parent method can register for events like "success", "stdout.data", etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _run(argsObj, settings = {}) {
    return new __SPromise(
      async function (resolve, reject, trigger, cancel) {
        const stream = new __SBuildScssActionsStream({});
        const streamPromise = stream.start(argsObj);
        __SPromise.pipe(streamPromise, this);
        const res = await streamPromise;
        resolve(res.streamObj.data);
      },
      {
        id: 'cli.build.scss'
      }
    ).start();
  }
};
