const __SPromise = require('../../promise/SPromise');
const __SSugarUi = require('./SSugarUI');

/**
 * @name            SSugarUiModule
 * @namespace           node.ui.sugar
 * @type            Class
 * @extends         SPromise
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUiModule extends __SPromise {
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
    super(null, {
      id: 'ui.sugar.module',
      name: 'Sugar UI Module',
      ...settings
    }).start();
  }
};
