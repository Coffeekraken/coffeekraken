const __SExpressServerCli = require('../express/SExpressServerCli');
const __frontendServer = require('../frontend/frontend');
const __SPromise = require('../../promise/SPromise');

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
    super({
      id: 'server.frontend',
      name: 'Frontend Server',
      ...settings
    });
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
        const serverPromise = __frontendServer(argsObj);
        __SPromise.pipe(serverPromise, this);
        const res = await serverPromise;
        resolve(res);
      },
      {
        id: 'cli.server.frontend'
      }
    ).start();
  }
};
