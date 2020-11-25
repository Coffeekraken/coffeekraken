"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
const toString_1 = __importDefault(require("../../string/toString"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
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
    settings = deepMerge_1.default({
        name: settings.name || validateValueResultObj.$name,
        interface: settings.interface || validateValueResultObj.$interface
    });
    if (settings.name) {
        issuesArray.push(`<yellow>│</yellow> ${settings.name}\n<yellow>│</yellow>`);
    }
    if (validateValueResultObj.$received) {
        const string = `<yellow>│</yellow> - Received value: <yellow>${toString_1.default(validateValueResultObj.$received.value, { beautify: true })}</yellow>`;
        issuesArray.push(string);
    }
    validateValueResultObj.$issues.forEach((issue) => {
        if (validateValueResultObj.$messages[issue]) {
            issuesArray.push(`<yellow>│</yellow> - ${validateValueResultObj.$messages[issue]}`);
        }
    });
    return parseHtml_1.default(issuesArray.join('\n')) + '\n';
}
module.exports = validateValueOutputString;
