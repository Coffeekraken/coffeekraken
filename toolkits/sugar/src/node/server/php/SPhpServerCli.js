const __SCli = require('../../cli/SCli');
const __SPhpServerInterface = require('./interface/SPhpServerInterface');
/**
 * @name            SPhpServerCli
 * @namespace           node.server.php
 * @type            Class
 * @extends         SCli
 *
 * This class represent the PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPhpServerCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'php -S %hostname:%port -t %rootDir %router %arguments';

  /**
   * @name          interface
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SPhpServerInterface;

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
    const pro = super.run(argsObj, includeAllArgs);
    if (!log) return pro;

    setTimeout(() => {
      this.log(`<green>Your PHP server is up and running</green>:

Hostname       : <yellow>${this.runningArgsObj.hostname}</yellow>
Port           : <yellow>${this.runningArgsObj.port}</yellow>
Root directory : <yellow>${this.runningArgsObj.rootDir}</yellow>
URL            : <cyan>http://${this.runningArgsObj.hostname}:${this.runningArgsObj.port}</cyan>`);
    });
    return pro;
  }
};
