import __validateObjectDefinitionObject from '../object/validateObjectDefinitionObject';
import __deepMerge from '../../object/deepMerge';
import __cliDefinitionObjectDefinition from './cliDefinitionObjectDefinition';

/**
 * @name            validateCliDefinitionObject
 * @namespace           js.validation.cli
 * @type            Function
 *
 * This function take a definition object as parameter and check if all is valid.
 *
 * @param       {Object}        definitionObj         The definition object to check
 * @param       {Object}        [settings={}]               A settings object to configure your validation process:
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
  settings = __deepMerge({}, settings);

  return __validateObjectDefinitionObject(definitionObj, {
    ...settings,
    definitionObj: __cliDefinitionObjectDefinition
  });
}
