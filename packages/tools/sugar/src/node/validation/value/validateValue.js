"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SValueValidationError_1 = __importDefault(require("../../error/SValueValidationError"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const typeof_1 = __importDefault(require("../../value/typeof"));
const SRequiredValidation_1 = __importDefault(require("./validation/SRequiredValidation"));
const SPathValidation_1 = __importDefault(require("./validation/SPathValidation"));
const STypeValidation_1 = __importDefault(require("./validation/STypeValidation"));
const SValuesValidation_1 = __importDefault(require("./validation/SValuesValidation"));
const _validationsObj = {
    required: {
        class: SRequiredValidation_1.default,
        args: []
    },
    path: {
        class: SPathValidation_1.default,
        args: ['%definitionObj.path.exists']
    },
    type: {
        class: STypeValidation_1.default,
        args: ['%definitionObj.type']
    },
    values: {
        class: SValuesValidation_1.default,
        args: ['%definitionObj.values']
    }
};
/**
 * @name          validateValue
 * @namespace     sugar.js.validation.value
 * @type          Function
 * @wip
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - name ('unnamed') {String}: Specify a name. Useful for debugging
 * - extendFn (null) {Function}: Specify a function that will be called after the default validations checks and before the return or throw statements. It will have as arguments the "value" to check, the "definitionObj" and the "settings" object. You then can make your checks and return an array of "issues" like ["path","other"], etc...
 * @return         {Boolean|Object}           true if the check is passed, an Array of String describing the issue if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import validateValue from '@coffeekraken/sugar/js/validation/value/validateValue';
 * validateValue(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateValue(value, definitionObj, settings = {}) {
    settings = deepMerge_1.default({
        name: 'unnamed',
        throw: true,
        extendFn: null,
        validationsObj: _validationsObj
    }, settings);
    if ((value === null || value === undefined) &&
        definitionObj.default !== undefined) {
        value = definitionObj.default;
    }
    if (value === null || (value === undefined && !definitionObj.required)) {
        return true;
    }
    const issueObj = {
        $expected: definitionObj,
        $received: {
            type: typeof_1.default(value),
            value
        },
        $name: settings.name,
        $issues: [],
        $messages: {}
    };
    Object.keys(settings.validationsObj).forEach((validationName, i) => {
        if (!_validationsObj[validationName]) {
            issueObj.$issues.push(`definitionObj.${validationName}.unknown`);
            issueObj.$messages[`definitionObj.${validationName}.unknown`] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
        }
        if (!definitionObj[validationName])
            return;
        const validationObj = Object.assign({}, settings.validationsObj[validationName]);
        validationObj.args = validationObj.args.map((arg) => {
            if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
                arg = definitionObj[arg.replace('%definitionObj.', '')];
            }
            return arg;
        });
        const validationResult = validationObj.class.apply(value, ...validationObj.args);
        if (validationResult !== true) {
            issueObj.$issues.push(validationName);
            issueObj.$messages[validationName] = validationResult;
        }
    });
    if (settings.extendFn && typeof settings.extendFn === 'function') {
        const additionalIssues = settings.extendFn(value, definitionObj, settings) || [];
        issueObj.$issues = [
            ...issueObj.$issues,
            ...(additionalIssues.$issues || [])
        ];
        issueObj.$messages = [
            ...issueObj.$messages,
            ...(additionalIssues.$messages || [])
        ];
    }
    if (!issueObj.$issues.length)
        return true;
    if (settings.throw) {
        throw new SValueValidationError_1.default(issueObj);
    }
    return issueObj;
}
module.exports = validateValue;
