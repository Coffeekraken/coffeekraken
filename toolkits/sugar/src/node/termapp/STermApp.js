require('../index');
const __SApp = require('../blessed/app/SApp');
const __deepMerge = require('../object/deepMerge');

/**
 * @name            STermApp
 * @namespace           sugar.node.termapp
 * @type            Class
 * @extends         SApp
 *
 * This represent the main class of the Sugar terminal application.
 *
 * @example         js
 * const STermApp = require('@coffeekraken/sugar/node/termapp/STermApp');
 * const myApp = new STermApp();
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STermApp extends __SApp {
  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    settings = __deepMerge({}, settings);

    super(__deepMerge({}, settings));
  }
};
