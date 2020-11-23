// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const __SProcess = require('../../process/SProcess');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const __SSugarApp = require('./SSugarApp');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const __SSugarAppInterface = require('./interface/SSugarAppInterface');

/**
 * @name            SSugarAppProcess
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = class SSugarAppProcess extends __SProcess {
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_sugarUiInstance' does not exist on type... Remove this comment to see the full error message
    this._sugarUiInstance = new __SSugarApp({});
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'bindSPromise' does not exist on type 'SS... Remove this comment to see the full error message
    this.bindSPromise(this._sugarUiInstance);
  }
};
