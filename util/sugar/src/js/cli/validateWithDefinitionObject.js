import __validateWithDefinitionObject from '../object/validateWithDefinitionObject';
import __validateDefinitionObject from './validateDefinitionObject';

/**
 * @name            validateWithDefinitionObject
 * @namespace       sugar.js.cli
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {Boolean}       [validateDefinitionObject=true]       Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|String}                    Return true if all is ok, and a simple string that describe the issue if it's not
 *
 * @example         js
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/object/validateWithDefinitionObject';
 * validateWithDefinitionObject({
 *    arg1: 'hello',
 *    arg2: false
 * }, {
 *    arg1: {
 *      type: 'String',
 *      required: true
 *    },
 *    arg2: {
 *      type: 'Boolean',
 *      required: true
 *    }
 * }); // => true
 *
 * @since     2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateWithDefinitionObject(
  objectToCheck,
  definitionObj,
  validateDefinitionObject = true
) {
  // validate definition object first
  if (validateDefinitionObject) {
    const validateDefinitionObjectResult = __validateDefinitionObject(
      definitionObj
    );
    if (validateDefinitionObjectResult !== true)
      return validateDefinitionObjectResult;
  }

  return __validateWithDefinitionObject(
    objectToCheck,
    definitionObj,
    (argName, argDefinition, value) => {
      return true;
    },
    false // validateDefinitionOject. No need cause we already have done this in this function
  );
}
