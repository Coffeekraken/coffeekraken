// @ts-nocheck

import __SProcess from '../../process/SProcess';
import __SSugarApp from './SSugarApp';
import __SSugarAppInterface from './interface/SSugarAppInterface';

/**
 * @name            SSugarAppProcess
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SProcess
 * @wip
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarAppProcess extends __SProcess {
  static interface = __SSugarAppInterface;

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
      id: 'sugar.app.process',
      name: 'Sugar App Process',
      ...settings
    });
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params: any, settings = {}) {
    // new sugar ui instance
    this._sugarUiInstance = new __SSugarApp({});
    this.bindSPromise(this._sugarUiInstance);
  }
}
