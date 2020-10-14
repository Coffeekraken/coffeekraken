const __SBuildJsActionsStream = require('./SBuildJsActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildJsInterface = require('./interface/SBuildJsInterface');
const __isChildProcess = require('../../is/childProcess');

/**
 * @name            SBuildJsProcess
 * @namespace           sugar.node.build.js
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the JS files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsProcess extends __SProcess {
  static interface = __SBuildJsInterface;

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
      __filename,
      __deepMerge(
        {
          id: 'SBuildJsProcess',
          name: 'Build JS Process'
        },
        settings
      )
    );
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
    const actionStream = new __SBuildJsActionsStream(settings);
    this._buildJsActionStream = actionStream.start(params);
    this.bindSPromise(this._buildJsActionStream);
  }
};
