const __frontendServer = require('../frontend/frontend');
const __SProcess = require('../../process/SProcess');
const __SPromise = require('../../promise/SPromise');
const __SError = require('../../error/SError');

/**
 * @name            SFrontendServerProcess
 * @namespace           node.server.frontend
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontendServerProcess extends __SProcess {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(params = {}, settings = {}) {
    super(params, {
      id: 'process.server.frontend',
      name: 'Frontend Server Process',
      ...settings
    });
  }

  /**
   * @name              run
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj) {
    this._frontendServerProcess = __frontendServer(argsObj);
    return super.run(this._frontendServerProcess);
  }

  /**
   * @name          kill
   * @type          Function
   *
   * Method that allows you to kill the process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    this._frontendServerProcess.cancel();
    super.kill();
  }
};
