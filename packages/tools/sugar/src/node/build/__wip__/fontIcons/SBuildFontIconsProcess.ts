// @ts-nocheck

const __SBuildFontIconsActionsStream = require('./SBuildFontIconsActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildFontIconsInterface = require('./interface/SBuildFontIconsInterface');

/**
 * @name            SBuildFontIconsProcess
 * @namespace           sugar.node.build.fontIcons
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the font icons files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildFontIconsProcess extends __SProcess {
  static interface = __SBuildFontIconsInterface;

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
          id: 'SBuildFontIconsProcess',
          name: 'Build Font Icons Process'
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
    const actionStream = new __SBuildFontIconsActionsStream({
      ...settings,
      logs: {
        success: false,
        start: false
      }
    });
    this._buildFontIconsActionsStream = actionStream.start(params);
    this.bindSPromise(this._buildFontIconsActionsStream);
  }
};
