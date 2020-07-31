const __SExpressServerCli = require('../express/SExpressServerCli');
const __frontendServer = require('../frontend/frontend');
const __isChildProcess = require('../../is/childProcess');
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
   * @name          afterCommand
   * @type          String
   * @static
   *
   * Store a command that you want to launch after the actual one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // static afterCommand = 'sugar util.kill server.frontend';

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
      ...settings
    });
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
    const server = __frontendServer(argsObj);
    return server;
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
  // run(argsObj = this._settings.argsObj, settings = {}) {
  //   const process = super.run(argsObj, settings);

  //   console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(process)));

  //   // if (__isChildProcess() && !process.on) {
  //   //   throw process;
  //   // }

  //   //   process.on('start', () => {
  //   //     this
  //   //       .log(`# Your <primary>Frontend Express</primary> server is <green>up and running</green>:

  //   // - Hostname        : <yellow>${this.runningArgsObj.hostname}</yellow>
  //   // - Port            : <yellow>${this.runningArgsObj.port}</yellow>
  //   // - Root directory  : <yellow>${this.runningArgsObj.rootDir}</yellow>
  //   // - Views directory : <yellow>${this.runningArgsObj.viewsDir}</yellow>
  //   // - Views engine    : <yellow>${this.runningArgsObj.viewEngine}</yellow>
  //   // - URL             : <cyan>http://${this.runningArgsObj.hostname}:${this.runningArgsObj.port}</cyan>`);
  //   //   });
  //   return process;
  // }
};
