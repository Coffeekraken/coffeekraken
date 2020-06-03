import __validateDefinitionObject from '../object/validateDefinitionObject';
import __isOfType from './ofType';

/**
 * @name              validateWithDefinitionObject
 * @namespace         sugar.js.is
 * @type              Function
 *
 * This function take an property value and an argument definition object
 * to check if the passed value is valid
 *
 * @param         {Mixed}           value         The value to check
 * @param         {Object}          definitionObj       The argument definition object
 * @param       {Boolean}       [validateDefinitionObj=true]       Specify if you want to validate the passed definition object first or not
 * @return        {String|Boolean}                Return true if all is ok, and a string describing the error if not
 *
 * @example       js
 * import isValidateWithDefinitionObject from '@coffeekraken/sugar/js/is/validateWithDefinitionObject';
 * isValidateWidthDefinitionObject('something', {
 *    type: 'String',
 *    required: true
 * }); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateWithDefinitionObject(
  value,
  argDefinitionObj,
  validateDefinitionObj = true
) {
  // validate the passed definition object first
  if (validateDefinitionObj) {
    const validateDefinitionObjResult = __validateDefinitionObject(
      argDefinitionObj
    );
    if (validateDefinitionObjResult !== true)
      return validateDefinitionObjResult;
  }

  // validate type
  if (value !== undefined && argDefinitionObj.type) {
    const isOfTypeResult = __isOfType(value, argDefinition.type, true);
    if (isOfTypeResult !== true) {
      return isOfTypeResult;
    }
  }
  // check required
  if (argDefinition.required === true) {
    if (value === null || value === undefined) {
      return `The passed value is <green>required</green>...`;
    }
  }
}
