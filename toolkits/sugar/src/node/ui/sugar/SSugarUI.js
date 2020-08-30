const __deepMerge = require('../../object/deepMerge');
const __SPromise = require('../../promise/SPromise');
const __sugarConfig = require('../../config/sugar');
const __SSugarUiModuleInterface = require('./interface/SSugarUiModuleInterface');

/**
 * @name            SSugarUi
 * @namespace       node.ui.sugar
 * @type            Class
 * @extends         SPromise
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-ui.config.js``` file
 * - Instantiate all the modules like frontend server, build scss, etc...
 * - Configure the frontend server to serve all the needed files like js or css ones, etc...
 * - Open a socket connection to allow the front modules parts to talk with the back parts easily
 *
 * @todo        Complete the documentation
 *
 * @param       {Object}              [settings={}]           An object of settings to configure your sugar ui:
 * -
 *
 * @example         js
 * const SSugarUi = require('@coffeekraken/sugar/node/ui/sugar/SSugarUi');
 * const sugarUi = new SSugarUi();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUi extends __SPromise {
  /**
   * @name              _modulesObjs
   * @type              Object<Object>
   * @private
   *
   * Store the registered modules objects
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesObjs = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    settings = __deepMerge({
      id: 'ui.sugar'
    });

    super(null, settings).start();

    // load and check each modules
    this._loadModules(__sugarConfig('sugar-ui.modules'));

    console.log(this._modulesObjs);
  }

  /**
   * @name            _loadModules
   * @type            Function
   * @private
   *
   * This method simply load and check all the registered modules
   * before being able to continue the process...
   *
   * @param       {Object}      modulesObj        An object of SSugarUiModuleInterface compatible modules
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadModules(modulesObj) {
    // loop on all registered modules
    Object.keys(modulesObj).forEach((moduleIdx) => {
      const moduleObj = __SSugarUiModuleInterface.applyAndComplete(
        modulesObj[moduleIdx],
        {
          name: `${this.constructor.name}.modules.${moduleIdx}`
        }
      );

      // add the validated module in the _modulesObjArray property
      this._modulesObjs[moduleIdx] = moduleObj;
    });
  }
};
