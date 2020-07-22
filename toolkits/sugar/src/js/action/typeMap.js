const __SUrlAction = require('./browser/SUrlAction');

/**
 * @name            typeMap
 * @namespace       js.action
 * @type            Object
 *
 * Object that map a string "type" like "url", "login", etc... to his proper SAction class
 *
 * @since         2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {
  browser: {
    url: __SUrlAction
  }
};
