const __SProcess = require('../process/SProcess');
const __SSnowpackInterface = require('./interface/SSnowpackInterface');
const __childProcess = require('child_process');
const __argsToString = require('../cli/argsToString');

/**
 * @name            SSnowpackBuildProcess
 * @namespace           sugar.node.snowpack
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the snowpack build process
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSnowpackBuildProcess extends __SProcess {
  static interface = __SSnowpackInterface;

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
      id: 'SSnowpackBuildProcess',
      name: 'Snowpack Build Process',
      ...settings
    });
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that actually execute the process
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params, settings = {}) {
    const string = __argsToString(params, {
      definitionObj: this.constructor.interface.definitionObj
    });
    __childProcess.spawn(`snowpack build ${string}`, [], {
      shell: true,
      env: {
        ...process.env,
        SNOWPACK_IS_BUILD: true
      },
      stdio: 'inherit'
    });
  }
};
