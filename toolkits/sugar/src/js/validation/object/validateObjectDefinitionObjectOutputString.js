import __validateValueOutputString from '../value/validateValueOutputString';
import __parseHtml from '../../console/parseHtml';
import __trimLines from '../../string/trimLines';

/**
 * @name                validateObjectDefinitionObjectOutputString
 * @namespace           js.validation.object
 * @type                Function
 *
 * This function take the resulting object of the ```validateObjectDefinitionObject``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateObjectDefinitionObjectResultObj           The validateObject resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateObjectDefinitionObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectDefinitionObjectOutputString';
 * import validateObjectDefinitionObject from '@coffeekraken/sugar/js/validation/object/validateObjectDefinitionObject';
 * const resultObj = validateObjectDefinitionObject({
 *    plop: {
 *      type: 'String',
 *      required: true
 *    },
 *    hello: {
 *      type: 'String',
 *      required: true
 *    }
 * });
 * validateObjectDefinitionObjectOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateObjectDefinitionObjectOutputString(
  validateObjectDefinitionObjectResultObj
) {
  const stringsArray = [];

  stringsArray.push(
    __trimLines(`
  <underline><bold>Definition object validation</bold></underline>

  - Name: <yellow>${
    validateObjectDefinitionObjectResultObj.name || 'unnamed'
  }</yellow>
  - Error${
    validateObjectDefinitionObjectResultObj.issues.length > 1 ? 's' : ''
  }: <red>${validateObjectDefinitionObjectResultObj.issues.length}</red>
  - Propert${
    validateObjectDefinitionObjectResultObj.issues.length > 1 ? 'ies' : 'y'
  }: ${validateObjectDefinitionObjectResultObj.issues
      .map((v) => {
        return `<red>${v}</red>`;
      })
      .join(', ')}`)
  );

  validateObjectDefinitionObjectResultObj.issues.forEach((attrName) => {
    if (
      attrName === 'expected' ||
      attrName === 'received' ||
      attrName === 'issues'
    ) {
      return;
    }

    if (
      !validateObjectDefinitionObjectResultObj[attrName] ||
      !validateObjectDefinitionObjectResultObj[attrName].issues
    ) {
      return;
    }

    validateObjectDefinitionObjectResultObj[attrName].issues.forEach(
      (issueName) => {
        const attrIssueObj =
          validateObjectDefinitionObjectResultObj[attrName][issueName];

        const string = __validateValueOutputString(attrIssueObj, {
          name: attrName
        });
        stringsArray.push(string);
      }
    );
  });

  return __parseHtml(stringsArray.join('\n\n'));
}
