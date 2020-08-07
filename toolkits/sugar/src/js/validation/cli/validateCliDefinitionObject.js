import __validateObjectDefinitionObject from '../object/validateObjectDefinitionObject';
import __deepMerge from '../../object/deepMerge';

/**
 * @name            validateCliDefinitionObject
 * @namespace           js.validation.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]               A settings object to configure your validation process:
 * - bySteps (false) {Boolean}: Specify if you want to have issues back all at a time or each one after the other
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @todo        tests
 *
 * @example       js
 * import validateCliDefinitionObject from '@coffeekraken/sugar/js/cli/validateCliDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateCliDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateCliDefinitionObject(
  definitionObj,
  settings = {}
) {
  settings = __deepMerge(
    {
      bySteps: false
    },
    settings
  );

  let issues = [];

  return __validateObjectDefinitionObject(definitionObj, {
    extendsFn: (argName, argDefinition) => {
      // check alias
      if (argDefinition.alias) {
        if (typeof argDefinition.alias !== 'string') {
          const msg = `The "alias" property of an argument definition object has to be a String. You've passed "${__toString(
            argDefinition.alias
          )}" which is a "${typeof argDefinition.alias}" for your argument "${argName}"...`;
          if (settings.bySteps) {
            return msg;
          }
          issues = [...issues, msg];
        }
        if (argDefinition.alias.length !== 1) {
          const msg = `The "alias" property of an argument definition object has to be a 1 letter String. You've passed "${argDefinition.alias}" for your argument "${argName}"...`;
          if (settings.bySteps) {
            return msg;
          }
          issues = [...issues, msg];
        }
      }
      // check description
      if (!argDefinition.description) {
        const msg = `The property "description" for your argument "${argName}" is missing...`;
        if (settings.bySteps) {
          return msg;
        }
        issues = [...issues, msg];
      }
      if (typeof argDefinition.description !== 'string') {
        const msg = `The property "description" of an argument definition object has to be a String. You've passed "${__toString(
          argDefinition.description
        )}" which is a "${typeof argDefinition.description}" for your argument "${argName}"...`;
        if (settings.bySteps) return msg;
        issues = [...issues, msg];
      }
      // check level
      if (argDefinition.level && typeof argDefinition.level !== 'number') {
        const msg = `The property "level" for your argument "${argName}" has to be a Number. You've passed "${__toString(
          argDefinition.level
        )}" which is a "${typeof argDefinition.level}"...`;
        if (settings.bySteps) return msg;
        issues = [...issues, msg];
      }

      if (!issues.length) return true;
      return issues;
    }
  });
}
