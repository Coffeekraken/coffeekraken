import __deepMerge from '../../object/deepMerge';
import __SDefinitionObjectInterface from '../interface/SDefinitionObjectInterface';
import __validateObject from './validateObject';

/**
 * @name            validateDefinitionObject
 * @namespace       sugar.js.validation.object
 * @type            Function
 *
 * This function simply take a definition object and validate it
 *
 * @param       {Object}          definitionObject        The definition object to validate
 * @param       {Object}          [settings={}]           An object of settings to configure your validation process:
 * - name (Unnamed) {String}: Specify a name for your definition object validation. It helps a lot when you need to debug things
 *
 * @example       js
 * import validateDefinitionObject from '@coffeekraken/sugar/js/validation/object/validateDefinitionObject';
 * validateDefinitionObject({
 *    myProp: {
 *      type: 'String',
 *      required: true
 *    },
 *    otherProp: {
 *      type: 'Boolean'
 *    }
 * }); // => true
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateDefinitionObject(
  definitionObject,
  settings = {}
) {
  settings = __deepMerge(
    {
      name: 'Unnamed'
    },
    settings
  );

  let issuesObj = {
    $name: settings.name,
    $issues: [],
    $messages: {}
  };

  // loop on each definition object props
  Object.keys(definitionObject).forEach((argName) => {
    const argDefinitionObj = definitionObject[argName];
    // validate this
    const res = __validateObject(
      argDefinitionObj,
      __SDefinitionObjectInterface.definitionObj,
      {
        throw: true,
        name: `${settings.name}.${argName}`
      }
    );
  });
}
