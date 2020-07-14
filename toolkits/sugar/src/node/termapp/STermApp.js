const __SApp = require('../blessed/app/SApp');
const __deepMerge = require('../object/deepMerge');
const __SConfig = require('../config/SConfig');
const __SConfigFsAdapter = require('../config/adapters/SConfigFsAdapter');
const __packageRoot = require('../path/packageRoot');
const __exitCleanup = require('../process/exitCleanup');

/**
 * @name            STermApp
 * @namespace           node.termapp
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

    // exit cleanup
    __exitCleanup();

    super(__deepMerge({}, settings));
  }
};
