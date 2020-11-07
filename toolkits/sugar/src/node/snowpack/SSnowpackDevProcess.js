const __SProcess = require('../process/SProcess');
const __SSnowpackInterface = require('./interface/SSnowpackInterface');
const __childProcess = require('child_process');
const __argsToString = require('../cli/argsToString');

/**
 * @name            SSnowpackDevProcess
 * @namespace           sugar.node.snowpack
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the snowpack dev process
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSnowpackDevProcess extends __SProcess {
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
      id: 'SSnowpackDevProcess',
      name: 'Snowpack Dev Process',
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
    __childProcess.spawn(`snowpack dev ${string}`, [], {
      shell: true,
      stdio: 'inherit'
    });
  }
};
