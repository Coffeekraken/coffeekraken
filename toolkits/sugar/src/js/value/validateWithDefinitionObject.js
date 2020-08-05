import __isOfType from '../is/ofType';
import __deepMerge from '../object/deepMerge';
import __isClass from '../is/class';
import __typeof from '../value/typeof';

/**
 * @name          validateWithDefinitionObject
 * @namespace     js.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param         {String}      [name=null]     A name for the check. Usefull for debugging purpose
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * @return         {Boolean|Array<String>}           true if the check is passed, an Array of String describing the issue if not
 *
 * @example       js
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/value/validateWithDefinitionObject';
 * validateWithDefinitionObject(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateWithDefinitionObject(
  value,
  definitionObj,
  name = null,
  settings = {}
) {
  settings = __deepMerge({}, settings);

  let issueObj = {
    expected: definitionObj,
    received: {
      type: __typeof(value),
      value
    },
    issues: []
  };

  // validate type
  if (definitionObj.type) {
    const isOfTypeResult = __isOfType(value, definitionObj.type);
    if (isOfTypeResult !== true) {
      issueObj = {
        ...issueObj,
        ...isOfTypeResult,
        issues: [...issueObj.issues, ...isOfTypeResult.issues]
      };
    }
  }
  // check required
  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      issueObj.issues.push('required');
    }
  }

  // check allowed values
  if (definitionObj.values && Array.isArray(definitionObj.values)) {
    if (definitionObj.values.indexOf(value) === -1) {
      issueObj.issues.push('values');
    }
  }

  if (!issueObj.issues.length) return true;
  return issueObj;
}
