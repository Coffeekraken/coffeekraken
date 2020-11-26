// @ts-nocheck

import __parseHtml from '../../console/parseHtml';
import __toString from '../../string/toString';
import __deepMerge from '../../object/deepMerge';
import __isNode from '../../is/node';

/**
 * @name                validateValueOutputString
 * @namespace           sugar.js.validation.value
 * @type                Function
 * @wip
 *
 * This function take the resulting object of the ```validateValue``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateValueResultObj           The validateValue resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import validateValueOutputString from '@coffeekraken/sugar/js/validation/object/validateValueOutputString';
 * import validateValue from '@coffeekraken/sugar/js/validation/object/validateValue';
 * const resultObj = validateValue(true, {
 *    type: 'String',
 *    required: true
 * });
 * validateValueOutputString(resultObj);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateValueOutputString(validateValueResultObj, settings = {}) {
  const issuesArray = [];

  settings = __deepMerge({
    name: settings.name || validateValueResultObj.$name,
    interface: settings.interface || validateValueResultObj.$interface
  });

  if (settings.name) {
    issuesArray.push(`<yellow>│</yellow> ${settings.name}\n<yellow>│</yellow>`);
  }

  if (validateValueResultObj.$received) {
    const string = `<yellow>│</yellow> - Received value: <yellow>${__toString(
      validateValueResultObj.$received.value,
      { beautify: true }
    )}</yellow>`;

    issuesArray.push(string);
  }

  validateValueResultObj.$issues.forEach((issue) => {
    if (validateValueResultObj.$messages[issue]) {
      issuesArray.push(
        `<yellow>│</yellow> - ${validateValueResultObj.$messages[issue]}`
      );
    }
  });

  return __parseHtml(issuesArray.join('\n')) + '\n';
}
export = validateValueOutputString;
