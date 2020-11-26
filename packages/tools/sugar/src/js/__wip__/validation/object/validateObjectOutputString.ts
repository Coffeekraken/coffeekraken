// @ts-nocheck

import __validateValueOutputString from '../value/validateValueOutputString';
import __parseHtml from '../../console/parseHtml';
import __trimLines from '../../string/trimLines';
import __toString from '../../string/toString';

/**
 * @name                validateObjectOutputString
 * @namespace           sugar.js.validation.object
 * @type                Function
 * @wip
 *
 * This function take the resulting object of the ```validateObject``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateObjectResultObj           The validateObject resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateObjectOutputString(validateObjectResultObj, settings = {}) {
  const stringsArray = [];

  stringsArray.push(
    __trimLines(`
  <underline><green>Object validation</green></underline>

  ${
    validateObjectResultObj.$interface
      ? `- Interface:  <cyan>${validateObjectResultObj.$interface}</cyan>`
      : ''
  }
  - Name:       <yellow>${validateObjectResultObj.$name || 'unnamed'}</yellow>
  - Error${validateObjectResultObj.$issues.length > 1 ? 's' : ''}:${
      validateObjectResultObj.$issues.length > 1 ? '' : ' '
    }     <red>${validateObjectResultObj.$issues.length}</red>
  - Propert${validateObjectResultObj.$issues.length > 1 ? 'ies' : 'y'}:${
      validateObjectResultObj.$issues.length > 1 ? '' : '  '
    } ${validateObjectResultObj.$issues
      .map((v) => {
        return `<magenta>${v}</magenta>`;
      })
      .join(', ')}`)
  );

  validateObjectResultObj.$issues.forEach((attrName) => {
    const attrIssueObj = validateObjectResultObj[attrName];
    const string = __validateValueOutputString(attrIssueObj, {
      interface: validateObjectResultObj.$interface,
      name: `<yellow>${validateObjectResultObj.$name}</yellow>.<magenta>${attrName}</magenta>`
    });
    stringsArray.push(string);
  });

  return __parseHtml(stringsArray.join('\n\n'));
}
export = validateObjectOutputString;
