const __validateValue = require('../../../../js/validation/value/validateValue');
const __isPath = require('../../fs/isPath');

/**
 * @name            validateValue
 * @namespace       sugar.node.validation.value
 * @type            Function
 *
 * This method simply take a value to validate and a definitionObject
 * that will be used to validate the value. For more informations about
 * the definition objects, check their proper documentations on the site.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - name ('unnamed') {String}: Specify a name. Useful for debugging
 * @return         {Boolean|Object}           true if the check is passed, an Array of String describing the issue if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateValue from '@coffeekraken/sugar/js/validation/value/validateValue';
 * validateValue(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function validateValue(value, definitionObj, settings = {}) {
  // validate value using the base javascript intergration
  return __validateValue(value, definitionObj, {
    ...settings,
    extendFn: (value, definitionObj, settings) => {
      const issuesObj = {
        $issues: [],
        $messages: {}
      };

      return issuesObj;
    }
  });
};
