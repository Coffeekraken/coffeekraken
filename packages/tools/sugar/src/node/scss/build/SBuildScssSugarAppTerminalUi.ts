import __SSugarAppModuleTerminalUi from '../../app/sugar/SSugarAppModuleTerminalUi';

/**
 * @name            SBuildScssSugarAppTerminalUi
 * @namespace       sugar.node.build.scss
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
export default class SBuildScssSugarAppTerminalUi extends __SSugarAppModuleTerminalUi {
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
}
