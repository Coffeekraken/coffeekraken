const __SCli = require('../../cli/SCli');
const __packageRoot = require('../../path/packageRoot');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SExpressServerCli
 * @namespace       sugar.node.server.express
 * @type            Class
 * @extends         SCli
 *
 * This class represent the express server cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SExpressServerCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar server.express [arguments]';

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
    hostname: {
      type: 'String',
      alias: 'o',
      description: 'Server hostname',
      default: __sugarConfig('express.hostname') || '127.0.0.1',
      level: 1
    },
    port: {
      type: 'Number',
      alias: 'p',
      description: 'Server port',
      default: __sugarConfig('express.port') || 3000,
      level: 1
    },
    rootDir: {
      type: 'String',
      description: 'Server root directory',
      default: __sugarConfig('express.rootDir') || __packageRoot(process.cwd()),
      level: 1
    },
    viewsDir: {
      type: 'String',
      description: 'Server views directory',
      default:
        __sugarConfig('express.viewsDir') ||
        __packageRoot(process.cwd()) + '/views'
    },
    viewEngine: {
      type: 'String',
      description: 'Server views rendering engine',
      default: __sugarConfig('express.viewEngine') || 'bladePhp'
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
   * @name            run
   * @type            Function
   * @override
   *
   * This method simply override the default one.
   * For arguments documentation, check the SCli class.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(
    argsObj = this._settings.argsObj,
    includeAllArgs = this._settings.includeAllArgs,
    log = true
  ) {
    const process = super.run(argsObj, includeAllArgs);
    if (!log) return process;
    setTimeout(() => {
      this.log(`<green>Your Express server is up and running</green>:

Hostname        : <yellow>${this.runningArgsObj.hostname}</yellow>
Port            : <yellow>${this.runningArgsObj.port}</yellow>
Root directory  : <yellow>${this.runningArgsObj.rootDir}</yellow>
Views directory : <yellow>${this.runningArgsObj.viewsDir}</yellow>
Views engine    : <yellow>${this.runningArgsObj.viewEngine}</yellow>
URL             : <cyan>http://${this.runningArgsObj.hostname}:${this.runningArgsObj.port}</cyan>`);
    });
    return process;
  }
};
