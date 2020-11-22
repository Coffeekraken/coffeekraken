import __parseHtml from '../../console/parseHtml';
import __toString from '../../string/toString';
import __deepMerge from '../../object/deepMerge';
/**
 * @name                validateValueOutputString
 * @namespace           sugar.js.validation.value
 * @type                Function
 *
 * This function take the resulting object of the ```validateValue``` one and transform it into
 * a nice human readable string.
 *
 * @param         {Object}          validateValueResultObj           The validateValue resulting object
 * @return        {String}                                        A human readable string of the resulting object
 *
 * @todo          tests
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
export default function validateValueOutputString(validateValueResultObj, settings = {}) {
    let issuesArray = [];
    settings = __deepMerge({
        name: settings.name || validateValueResultObj.$name,
        interface: settings.interface || validateValueResultObj.$interface
    });
    if (settings.name) {
        issuesArray.push(`<yellow>│</yellow> ${settings.name}\n<yellow>│</yellow>`);
    }
    if (validateValueResultObj.$received) {
        let string = `<yellow>│</yellow> - Received value: <yellow>${__toString(validateValueResultObj.$received.value, { beautify: true })}</yellow>`;
        // if (__isNode()) {
        //   const __packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');
        //   string = string.replace(`${__packageRoot()}/`, '');
        //   string = string.replace(`${__packageRoot(__dirname)}/`, '');
        // }
        issuesArray.push(string);
    }
    validateValueResultObj.$issues.forEach((issue) => {
        if (validateValueResultObj.$messages[issue]) {
            issuesArray.push(`<yellow>│</yellow> - ${validateValueResultObj.$messages[issue]}`);
        }
    });
    return __parseHtml(issuesArray.join('\n')) + '\n';
}
