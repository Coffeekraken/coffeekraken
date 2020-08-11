import __isPlainObj from '../../is/plainObject';
import __toString from '../../string/toString';
import __deepMerge from '../../object/deepMerge';
import __typeof from '../../value/typeof';
import __SDefinitionObjectError from '../../error/SDefinitionObjectError';
import __validateValue from '../../validation/value/validateValue';
import __definitionObjectDefinition from './definitionObjectDefinition';

// TODO: tests

/**
 * @name            validateObjectDefinitionObject
 * @namespace           js.validation.object
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - extendsFn (null) {Function}: Specify a function that will be called at first to extend your validation process
 * - name ('unnamed') {String}: Specify a name for debugging purposes
 * - throw (true) {Boolean}: Specify if you want to throw an error if something goes wrong
 * - definitionObj ({}) {Object}: Specify the definition object that will be used to validate the passed one... Weird I know ;)
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateObjectDefinitionObject from '@coffeekraken/sugar/js/object/validateObjectDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateObjectDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateObjectDefinitionObject(
  definitionObj,
  settings = {}
) {
  settings = __deepMerge(
    {
      definitionObj: __definitionObjectDefinition,
      throw: true,
      extendsFn: null,
      name: 'unnamed'
    },
    settings
  );

  let issuesObj = {
    name: settings.name,
    issues: []
  };

  if (!__isPlainObj(definitionObj)) {
    issuesObj.expected = {
      type: 'Object<Object>'
    };
    issuesObj.received = {
      type: __typeof(definitionObj),
      value: definitionObj
    };
    issuesObj.issues.push('type');
  }
  const argNames = Object.keys(definitionObj);
  if (!argNames.length) {
    throw new Error(
      `Sorry but a <yellow>definition object</yellow> has to have at least 1 property declared...`
    );
    // issuesObj.issues.push('arguments.required');
  }
  for (let i = 0; i < argNames.length; i++) {
    const argName = argNames[i];
    const argDefinition = definitionObj[argName];

    const argIssuesObj = {
      issues: []
    };

    Object.keys(argDefinition).forEach((definitionPropName) => {
      const definitionPropValue = argDefinition[definitionPropName];
      const expectedDefinitionObj = settings.definitionObj[definitionPropName];

      if (!expectedDefinitionObj) {
        argIssuesObj.issues.push(definitionPropName);
        argIssuesObj[definitionPropName] = {
          issues: ['definitionObject.unknown'],
          name: definitionPropName
        };
        return;
      }

      const definitionPropValidationResult = __validateValue(
        definitionPropValue,
        expectedDefinitionObj,
        {
          name: argName,
          throw: settings.throw
        }
      );

      if (definitionPropValidationResult !== true) {
        argIssuesObj.issues.push(definitionPropName);
        argIssuesObj[definitionPropName] = __deepMerge(
          argIssuesObj,
          definitionPropValidationResult,
          {
            array: true
          }
        );
      }
    });

    if (argIssuesObj.issues.length) {
      issuesObj.issues.push(argName);
      issuesObj[argName] = argIssuesObj;
    }
  }

  if (!issuesObj.issues.length) return true;

  if (settings.throw) {
    throw new __SDefinitionObjectError(issuesObj);
  }

  return issuesObj;
}
