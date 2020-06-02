const __SCli = require('../cli/SCli');
const __packageRoot = require('../path/packageRoot');

/**
 * @name            SExpressServerCli
 * @namespace       sugar.node.server
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
    host: {
      type: 'String',
      alias: 'o',
      description: 'Server hostname',
      default: 'localhost',
      level: 1
    },
    port: {
      type: 'Number',
      alias: 'p',
      description: 'Server port',
      default: 3000,
      level: 1
    },
    rootDir: {
      type: 'String',
      description: 'Server root directory',
      default: __packageRoot(process.cwd()),
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
    includeAllArgs = this._settings.includeAllArgs
  ) {
    const process = super.run(argsObj, includeAllArgs);
    setTimeout(() => {
      this.log(`<green>Your Express server is up and running</green>:

Host      : <yellow>${this.runningArgsObj.host}</yellow>
Port      : <yellow>${this.runningArgsObj.port}</yellow>
Directory : <yellow>${this.runningArgsObj.rootDir}</yellow>
URL       : <cyan>http://${this.runningArgsObj.host}:${this.runningArgsObj.port}</cyan>`);
    });
    return process;
  }
};
