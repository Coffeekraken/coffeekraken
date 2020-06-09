const __SExpressServerCli = require('../express/SExpressServerCli');
const __packageRoot = require('../../path/packageRoot');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SFrontendServerCli
 * @namespace       sugar.node.server.frontend
 * @type            Class
 * @extends         SExpressServerCli
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontendServerCli extends __SExpressServerCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar server.frontend [arguments]';

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
    ...__SExpressServerCli.definitionObj
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
   * For arguments documentation, check the SExpressServerCli class.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(
    argsObj = this._settings.argsObj,
    includeAllArgs = this._settings.includeAllArgs
  ) {
    const process = super.run(argsObj, includeAllArgs, false);

    setTimeout(() => {
      this.log(`<green>Your Frontend Express server is up and running</green>:

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
