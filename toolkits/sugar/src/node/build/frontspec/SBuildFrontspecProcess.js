const __SProcessManager = require('../../process/SProcess');
const __SBuildFrontspecActionsStream = require('./SBuildFrontspecActionsStream');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SBuildFrontspecProcess
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the frontspec.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildFrontspecProcess extends __SProcessManager {
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
    super(
      initialParams,
      __deepMerge(
        {
          id: 'SBuildFrontspecProcess',
          name: 'Build Frontspec Process'
        },
        settings
      )
    );
  }

  /**
   * @name              run
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildFrontspecActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj, settings = {}) {
    const actionStream = new __SBuildFrontspecActionsStream(settings);
    this._buildFrontspecActionsStream = actionStream.start(argsObj);
    return super.run(this._buildFrontspecActionsStream);
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
    this._buildFrontspecActionsStream.cancel();
    super.kill();
  }
};
