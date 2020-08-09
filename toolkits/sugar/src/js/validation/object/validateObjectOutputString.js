import __validateValueOutputString from '../value/validateValueOutputString';
import __parseHtml from '../../console/parseHtml';
import __trimLines from '../../string/trimLines';

/**
 * @name                validateObjectOutputString
 * @namespace           js.validation.object
 * @type                Function
 *
 * This function take the resulting object of the ```validateObject``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateObjectResultObj           The validateObject resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
 *
 * @example       js
 * import validateObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectOutputString';
 * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
 * const resultObj = validateObject({
 *    plop: true,
 *    hello: 'world'
 * }, {
 *    plop: {
 *      type: 'String',
 *      required: true
 *    },
 *    hello: {
 *      type: 'String',
 *      required: true
 *    }
 * });
 * validateObjectOutputString(resultObj);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function validateObjectOutputString(validateObjectResultObj) {
  const stringsArray = [];

  stringsArray.push(
    __trimLines(`
  <underline><bold>Object validation</bold></underline>

  - Name: <yellow>${validateObjectResultObj.name || 'unnamed'}</yellow>
  - Error${validateObjectResultObj.issues.length > 1 ? 's' : ''}: <red>${
      validateObjectResultObj.issues.length
    }</red>
  - Propert${
    validateObjectResultObj.issues.length > 1 ? 'ies' : 'y'
  }: ${validateObjectResultObj.issues
      .map((v) => {
        return `<red>${v}</red>`;
      })
      .join(', ')}`)
  );

  validateObjectResultObj.issues.forEach((attrName) => {
    const attrIssueObj = validateObjectResultObj[attrName];
    const string = __validateValueOutputString(attrIssueObj, {
      name: attrName
    });
    stringsArray.push(string);
  });

  return __parseHtml(stringsArray.join('\n\n'));
}
