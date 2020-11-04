const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildSnowpackInterface = require('./interface/SBuildSnowpackInterface');
const __childProcess = require('child_process');
const __path = require('path');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name            SBuildSnowpackProcess
 * @namespace           sugar.node.build.scss
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the SCSS files into CSS
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildSnowpackProcess extends __SProcess {
  static interface = __SBuildSnowpackInterface;

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
    super(
      __deepMerge(
        {
          id: 'SBuildSnowpackProcess',
          name: 'Build Snowpack Process'
          // runAsChild: true
        },
        settings
      )
    );
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that execute the actual process code
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildSnowpackActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params, settings = {}) {
    __childProcess.spawn(
      `snowpack dev --config ${__packageRoot(__dirname)}/snowpack.config.js`,
      [],
      {
        shell: true,
        stdio: 'inherit'
      }
    );

    // const actionStream = new __SBuildSnowpackActionsStream({
    //   ...settings,
    //   logs: {
    //     start: false,
    //     success: false
    //   }
    // });
    // const actionStreamProcess = actionStream.start(params);
    // this.bindSPromise(actionStreamProcess);
  }
};
