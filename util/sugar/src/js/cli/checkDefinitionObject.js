import __isPlainObj from '../is/plainObject';
import __toString from '../string/toString';

/**
 * @name            checkDefinitionObject
 * @namespace       sugar.js.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @return      {Boolean|String}                             true if valid, a string with the error details if not
 *
 * @example       js
 * import checkDefinitionObject from '@coffeekraken/sugar/js/cli/checkDefinitionObject';
 * const definition = {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      description: 'Something cool',
 *      default: 'hello'
 *    }
 * }
 * checkDefinitionObject(definition); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function checkDefinitionObject(definitionObj) {
  if (!__isPlainObj(definitionObj)) {
    return `Sorry but the passed definition object has to be a plain object...`;
  }
  const argNames = Object.keys(definitionObj);
  if (!argNames.length) {
    return `A definition object has to contain at least 1 argument definition...`;
  }
  for (let i = 0; i < argNames.length; i++) {
    const argName = argNames[i];
    const argDefinition = definitionObj[argName];
    // check the type
    const supportedTypes = ['string', 'number', 'object', 'array', 'boolean'];
    if (argDefinition.type === undefined)
      return `An argument definiion object has to contain a "type" property which is not the case for your argument "${argName}"...`;
    if (typeof argDefinition.type !== 'string')
      return `The "type" property of an argument definition object has to be a String. You've passed "${__toString(
        argDefinition.type
      )}" which is a "${typeof argDefinition.type}" for your argument "${argName}"...`;
    if (supportedTypes.indexOf(argDefinition.type.toLowerCase()) === -1)
      return `The "type" property of an argument definition object has to be one of these values "${supportedTypes.join(
        ','
      )}". You've passed "${
        argDefinition.type
      }" for your argument "${argName}"...`;
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
  }
  // return true
  return true;
}
