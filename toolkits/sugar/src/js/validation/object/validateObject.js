// TODO: tests
import __validateObjectDefinitionObject from './validateObjectDefinitionObject';
import __toString from '../../string/toString';
import __isOfType from '../../is/ofType';
import __isPlainObject from '../../is/plainObject';
import __isClass from '../../is/class';
import __get from '../../object/get';
import __validateValue from '../value/validateValue';
import __deepMerge from '../../object/deepMerge';
import __parseHtml from '../../console/parseHtml';

/**
 * @name            validateObject
 * @namespace           js.validation.object
 * @type            Function
 *
 * This function take an object, a definition object and validate this one depending on the definition...
 * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
 * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
 *
 * @param       {Object}        objectToCheck       The object to check using the definition one
 * @param       {Object}        definitionObj       The definition object to use
 * @param       {String}        [name='unnamed']    Specify a name for your object. This will be useful during the validation process
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - extendsFn (null) {Function}: Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
 * - validateDefinitionObject (true) {Boolean}: Specify if you want to validate the passed definition object first or not
 * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
 *
 * @todo        tests
 *
 * @example         js
 * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
 * validateObject({
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
export default function validateObject(
  objectToCheck,
  definitionObj,
  name = 'unnamed',
  settings = {},
  _argPath = []
) {
  let issuesObj = {
    name,
    issues: []
  };

  settings = __deepMerge(
    {
      validateDefinitionObject: true
    },
    settings
  );

  // validate the passed definition object first
  if (settings.validateDefinitionObject) {
    const validateDefinitionObjectResult = __validateObjectDefinitionObject(
      definitionObj
    );
    if (validateDefinitionObjectResult !== true) {
      throw new Error(validateDefinitionObjectResult);
    }
  }

  // loop on the definition object properties
  for (let i = 0; i < Object.keys(definitionObj).length; i++) {
    const argName = Object.keys(definitionObj)[i];
    const argDefinition = definitionObj[argName];
    let value = __get(objectToCheck, argName);
    // get the correct value depending on the definitionObj
    let staticIssue = false;
    if (argDefinition.static && !__isClass(objectToCheck)) {
      if (objectToCheck.constructor && objectToCheck.constructor[argName]) {
        value = objectToCheck.constructor[argName];
      } else {
        value = null;
        staticIssue = true;
      }
    }

    const validationRes = __validateValue(value, argDefinition, argName);

    if (validationRes !== true) {
      issuesObj[argName] = __deepMerge(
        issuesObj[argName] || {},
        validationRes || {},
        {
          array: true
        }
      );
      issuesObj[argName].name = argName;
      issuesObj.issues.push(argName);
      if (staticIssue) {
        issuesObj[argName].issues.push('static');
      }
    }

    // check if is an extendsFn
    if (settings.extendsFn) {
      const extendsFnResult = settings.extendsFn(argName, argDefinition, value);
      if (extendsFnResult !== true) {
        // TODO implement an Interface to be sure of what we get back from the extendsFn
        // issues = [...issues, ...extendsFnResult];
      }
    }

    // TODO implement the "children" support
    // check if we have some "children" properties
    // if (argDefinition.children) {
    //   const childrenValidation = validateObject(
    //     objectToCheck[argName] || {},
    //     argDefinition.children,
    //     settings,
    //     [..._argPath, argName]
    //   );
    //   if (childrenValidation !== true) {
    //     if (settings.bySteps) return __parseHtml(childrenValidation);
    //     issues = [...issues, ...childrenValidation];
    //   }
    // }
  }

  if (!issuesObj.issues.length) return true;
  return issuesObj;
}
