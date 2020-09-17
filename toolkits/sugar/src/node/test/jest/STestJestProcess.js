const __SProcess = require('../../process/SProcess');
const __SPromise = require('../../promise/SPromise');
const __SFsDeamon = require('../../deamon/fs/SFsDeamon');
const __buildCommandLine = require('../../cli/buildCommandLine');
const __STestJestCliInterface = require('./interface/STestJestCliInterface');
const __childProcess = require('child_process');

/**
 * @name            STestJestProcess
 * @namespace           sugar.node.test.jest
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that launch the tests on javascript files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STestJestProcess extends __SProcess {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    super(initialParams, {
      id: 'process.test.jest',
      name: 'Test Jest Process',
      deamon: {
        class: __SFsDeamon,
        watchArgs: [initialParams.watch, settings],
        runOn: ['update', 'add', 'unlink'],
        processParams: (params, data) => {
          return params;
        }
      },
      ...settings
    });
  }

  /**
   * @name              run
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj, settings = {}) {
    return super.run(
      new __SPromise((resolve, reject, trigger, cancel) => {
        const input = argsObj.input;
        delete argsObj.input;

        const commandToRun = __buildCommandLine(
          `jest ${input}`,
          __STestJestCliInterface.definitionObj,
          argsObj
        );

        __childProcess.spawnSync(commandToRun, null, {
          stdio: 'inherit',
          shell: true
        });

        resolve();
      })
    );
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
    super.kill();
  }
};
