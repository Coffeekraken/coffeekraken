import __validateWithDefinitionObject from '../object/validateWithDefinitionObject';
import __validateDefinitionObject from './validateDefinitionObject';
import __deepMerge from '../object/deepMerge';

/**
 * @name            validateWithDefinitionObject
 * @namespace           js.cli
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
  settings = {}
) {
  settings = __deepMerge(
    {
      validateDefinitionObject: true,
      bySteps: false
    },
    settings
  );

  let issues = [];

  // validate definition object first
  if (settings.validateDefinitionObject) {
    const validateDefinitionObjectResult = __validateDefinitionObject(
      definitionObj
    );
    if (validateDefinitionObjectResult !== true) {
      if (settings.bySteps) return validateDefinitionObjectResult;
    }
    issues = [...issues, ...validateDefinitionObjectResult];
  }

  const validationResult = __validateWithDefinitionObject(
    objectToCheck,
    definitionObj,
    {
      validateDefinitionObject: false,
      bySteps: settings.bySteps
    }
  );
  if (validationResult !== true) {
    if (settings.bySteps) return validationResult;
    issues = [...issues, ...validationResult];
  }

  if (!issues.length) return true;
  return issues;
}
