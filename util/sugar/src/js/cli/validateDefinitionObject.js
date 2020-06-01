import __validateDefinitionObject from '../object/validateDefinitionObject';

/**
 * @name            validateDefinitionObject
 * @namespace       sugar.js.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @example       js
 * import validateDefinitionObject from '@coffeekraken/sugar/js/cli/validateDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * validateDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateDefinitionObject(definitionObj) {
  return __validateDefinitionObject(definitionObj, (argName, argDefinition) => {
    // check alias
    if (argDefinition.alias) {
      if (typeof argDefinition.alias !== 'string')
        return `The "alias" property of an argument definition object has to be a String. You've passed "${__toString(
          argDefinition.alias
        )}" which is a "${typeof argDefinition.alias}" for your argument "${argName}"...`;
      if (argDefinition.alias.length !== 1)
        return `The "alias" property of an argument definition object has to be a 1 letter String. You've passed "${argDefinition.alias}" for your argument "${argName}"...`;
    }
    // check description
    if (!argDefinition.description)
      return `The property "description" for your argument "${argName}" is missing...`;
    if (typeof argDefinition.description !== 'string')
      return `The property "description" of an argument definition object has to be a String. You've passed "${__toString(
        argDefinition.description
      )}" which is a "${typeof argDefinition.description}" for your argument "${argName}"...`;
    // check level
    if (argDefinition.level && typeof argDefinition.level !== 'number') {
      return `The property "level" for your argument "${argName}" has to be a Number. You've passed "${__toString(
        argDefinition.level
      )}" which is a "${typeof argDefinition.level}"...`;
    }
    return true;
  });
}
