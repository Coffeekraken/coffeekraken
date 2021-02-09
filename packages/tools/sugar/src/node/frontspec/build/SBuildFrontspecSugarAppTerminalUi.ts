// @ts-nocheck

import __SSugarAppModuleTerminalUi from '../../app/sugar/SSugarAppModuleTerminalUi';

/**
 * @name            SBuildFrontspecSugarAppTerminalUi
 * @namespace       sugar.node.build.frontspec
 * @type            Class
 * @extends         SSugarAppModuleTerminalUi
 * @status              wip
 *
 * This class represent the display of the build js module for the terminal
 *
 * @param           {Object}            [settings={}]           An object of settings to configure your display
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBuildFrontspecSugarAppTerminalUi extends __SSugarAppModuleTerminalUi {
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
