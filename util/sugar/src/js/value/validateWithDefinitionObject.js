import __isOfType from '../is/ofType';

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
 * @return         {Boolean|String}           true if the check is passed, a string describing the issue if not
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
  name = null
) {
  // validate type
  if (value !== undefined && definitionObj.type) {
    const isOfTypeResult = __isOfType(value, definitionObj.type, true);
    if (isOfTypeResult !== true) {
      return `${name}: ${isOfTypeResult}`;
    }
  }
  // check required
  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      return `The property "<yellow>${name}</yellow>" is <green>required</green>...`;
    }
  }

  return true;
}
