// @ts-nocheck

import __frontendServer from './frontend';
import __SProcess from '../../process/SProcess';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';

/**
 * @name            SFrontendServerProcess
 * @namespace           sugar.node.server.frontend
 * @type            Class
 * @extends         SProcess
 * @wip
 *
 * This class represent the frontend server Cli based on the express server one
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SFrontendServerProcess extends __SProcess {
  static interface = __SFrontendServerInterface;

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
      id: 'SFrontendServerProcess',
      name: 'Frontend Server Process',
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
    this._frontendServerProcess = __frontendServer(params);
    this.bindSPromise(this._frontendServerProcess);
  }
}
