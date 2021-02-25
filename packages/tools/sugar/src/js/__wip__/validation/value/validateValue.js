// @ts-nocheck
import __deepMerge from '../../object/deepMerge';
import __typeof from '../../value/typeof';
import __toString from '../../string/toString';
import __SRequiredValidation from './validation/SRequiredValidation';
import __SPathValidation from './validation/SPathValidation';
import __STypeValidation from './validation/STypeValidation';
import __SValuesValidation from './validation/SValuesValidation';
const _validationsObj = {
    required: {
        class: __SRequiredValidation,
        args: []
    },
    path: {
        class: __SPathValidation,
        args: ['%definition.path.exists']
    },
    type: {
        class: __STypeValidation,
        args: ['%definition.type']
    },
    values: {
        class: __SValuesValidation,
        args: ['%definition.values']
    }
};
/**
 * @name          validateValue
 * @namespace     sugar.js.validation.value
 * @type          Function
 * @status              wip
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definition     THe definition object
 * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
 * - name ('unnamed') {String}: Specify a name. Useful for debugging
 * - extendFn (null) {Function}: Specify a function that will be called after the default validations checks and before the return or throw statements. It will have as arguments the "value" to check, the "definition" and the "settings" object. You then can make your checks and return an array of "issues" like ["path","other"], etc...
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
function validateValue(value, definition, settings = {}) {
    settings = __deepMerge({
        name: 'unnamed',
        throw: true,
        extendFn: null,
        validationsObj: _validationsObj
    }, settings);
    if ((value === null || value === undefined) &&
        definition.default !== undefined) {
        value = definition.default;
    }
    if (value === null || (value === undefined && !definition.required)) {
        return true;
    }
    const issueObj = {
        expected: definition,
        received: {
            type: __typeof(value),
            value
        },
        name: settings.name,
        issues: [],
        messages: {}
    };
    Object.keys(settings.validationsObj).forEach((validationName, i) => {
        if (!_validationsObj[validationName]) {
            issueObj.issues.push(`definition.${validationName}.unknown`);
            issueObj.messages[`definition.${validationName}.unknown`] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
        }
        if (!definition[validationName])
            return;
        const validationObj = Object.assign({}, settings.validationsObj[validationName]);
        validationObj.args = validationObj.args.map((arg) => {
            if (typeof arg === 'string' && arg.slice(0, 15) === '%definition.') {
                arg = definition[arg.replace('%definition.', '')];
            }
            return arg;
        });
        const validationResult = validationObj.class.apply(value, ...validationObj.args);
        if (validationResult !== true) {
            issueObj.issues.push(validationName);
            issueObj.messages[validationName] = validationResult;
        }
    });
    if (settings.extendFn && typeof settings.extendFn === 'function') {
        const additionalIssues = settings.extendFn(value, definition, settings) || [];
        issueObj.issues = [...issueObj.issues, ...(additionalIssues.issues || [])];
        issueObj.messages = [
            ...issueObj.messages,
            ...(additionalIssues.messages || [])
        ];
    }
    if (!issueObj.issues.length)
        return true;
    if (settings.throw) {
        throw __toString(issueObj, {
            beautify: true
        });
    }
    return issueObj;
}
export default validateValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUlkLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBRzFDLE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBRS9DLE9BQU8scUJBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxpQkFBaUIsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLGlCQUFpQixNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sbUJBQW1CLE1BQU0sZ0NBQWdDLENBQUM7QUFFakUsTUFBTSxlQUFlLEdBQUc7SUFDdEIsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsRUFBRTtLQUNUO0lBQ0QsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztLQUNsQztJQUNELElBQUksRUFBRTtRQUNKLEtBQUssRUFBRSxpQkFBaUI7UUFDeEIsSUFBSSxFQUFFLENBQUMsa0JBQWtCLENBQUM7S0FDM0I7SUFDRCxNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsbUJBQW1CO1FBQzFCLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO0tBQzdCO0NBQ0YsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFDSCxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3JELFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsSUFBSTtRQUNYLFFBQVEsRUFBRSxJQUFJO1FBQ2QsY0FBYyxFQUFFLGVBQWU7S0FDaEMsRUFDRCxRQUFR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