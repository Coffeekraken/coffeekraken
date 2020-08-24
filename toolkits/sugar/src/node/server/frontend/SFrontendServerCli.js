const __SCli = require('../../cli/SCli');
const __SFrontendServerProcess = require('./SFrontendServerProcess');
const __SExpressServerInterface = require('../express/interface/SExpressServerInterface');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SFrontendServerCli
 * @namespace           node.server.frontend
 * @type            Class
 * @extends         SExpressServerCli
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontendServerCli extends __SCli {
  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static command = 'sugar server.frontend %arguments';

  /**
   * @name          definitionObj
   * @type          String
   * @static
   *
   * Store the cli definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = __SExpressServerInterface.definitionObj;

  /**
   * @name          processClass
   * @type          SProcess
   * @static
   *
   * Store the process class that will be used to run the frontend server
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static processClass = __SFrontendServerProcess;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(args = {}, settings = {}) {
    super(
      args,
      __deepMerge(
        {
          id: 'server.frontend',
          name: 'Frontend Server',
          childProcess: {
            pipe: ['log']
          }
        },
        settings
      )
    );
  }
}

module.exports = __SExpressServerInterface.implements(
  SFrontendServerCli,
  __SExpressServerInterface
);
