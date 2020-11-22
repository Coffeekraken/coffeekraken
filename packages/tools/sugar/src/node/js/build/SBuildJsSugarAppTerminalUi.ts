const __SSugarAppModuleTerminalUi = require('../../app/sugar/SSugarAppModuleTerminalUi');

/**
 * @name            SBuildJsSugarAppTerminalUi
 * @namespace       sugar.node.build.js
 * @type            Class
 * @extends         SSugarAppModuleTerminalUi
 *
 * This class represent the display of the build js module for the terminal
 *
 * @param           {Object}            [settings={}]           An object of settings to configure your display
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsSugarAppTerminalUi extends __SSugarAppModuleTerminalUi {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(sources, settings = {}) {
    super(sources, settings);
  }
};
