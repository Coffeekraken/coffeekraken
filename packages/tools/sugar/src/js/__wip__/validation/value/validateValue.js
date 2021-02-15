// @ts-nocheck
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/deepMerge", "../../value/typeof", "../../string/toString", "./validation/SRequiredValidation", "./validation/SPathValidation", "./validation/STypeValidation", "./validation/SValuesValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var typeof_1 = __importDefault(require("../../value/typeof"));
    var toString_1 = __importDefault(require("../../string/toString"));
    var SRequiredValidation_1 = __importDefault(require("./validation/SRequiredValidation"));
    var SPathValidation_1 = __importDefault(require("./validation/SPathValidation"));
    var STypeValidation_1 = __importDefault(require("./validation/STypeValidation"));
    var SValuesValidation_1 = __importDefault(require("./validation/SValuesValidation"));
    var _validationsObj = {
        required: {
            class: SRequiredValidation_1.default,
            args: []
        },
        path: {
            class: SPathValidation_1.default,
            args: ['%definition.path.exists']
        },
        type: {
            class: STypeValidation_1.default,
            args: ['%definition.type']
        },
        values: {
            class: SValuesValidation_1.default,
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
    function validateValue(value, definition, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
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
        var issueObj = {
            expected: definition,
            received: {
                type: typeof_1.default(value),
                value: value
            },
            name: settings.name,
            issues: [],
            messages: {}
        };
        Object.keys(settings.validationsObj).forEach(function (validationName, i) {
            var _a;
            if (!_validationsObj[validationName]) {
                issueObj.issues.push("definition." + validationName + ".unknown");
                issueObj.messages["definition." + validationName + ".unknown"] = "The specified \"<yellow>" + validationName + "</yellow>\" validation is <red>not supported</red>";
            }
            if (!definition[validationName])
                return;
            var validationObj = Object.assign({}, settings.validationsObj[validationName]);
            validationObj.args = validationObj.args.map(function (arg) {
                if (typeof arg === 'string' && arg.slice(0, 15) === '%definition.') {
                    arg = definition[arg.replace('%definition.', '')];
                }
                return arg;
            });
            var validationResult = (_a = validationObj.class).apply.apply(_a, __spreadArrays([value], validationObj.args));
            if (validationResult !== true) {
                issueObj.issues.push(validationName);
                issueObj.messages[validationName] = validationResult;
            }
        });
        if (settings.extendFn && typeof settings.extendFn === 'function') {
            var additionalIssues = settings.extendFn(value, definition, settings) || [];
            issueObj.issues = __spreadArrays(issueObj.issues, (additionalIssues.issues || []));
            issueObj.messages = __spreadArrays(issueObj.messages, (additionalIssues.messages || []));
        }
        if (!issueObj.issues.length)
            return true;
        if (settings.throw) {
            throw toString_1.default(issueObj, {
                beautify: true
            });
        }
        return issueObj;
    }
    exports.default = validateValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlkLHFFQUFpRDtJQUNqRCw4REFBMEM7SUFHMUMsbUVBQStDO0lBRS9DLHlGQUFxRTtJQUNyRSxpRkFBNkQ7SUFDN0QsaUZBQTZEO0lBQzdELHFGQUFpRTtJQUVqRSxJQUFNLGVBQWUsR0FBRztRQUN0QixRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsNkJBQXFCO1lBQzVCLElBQUksRUFBRSxFQUFFO1NBQ1Q7UUFDRCxJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUseUJBQWlCO1lBQ3hCLElBQUksRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHlCQUFpQjtZQUN4QixJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztTQUMzQjtRQUNELE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSwyQkFBbUI7WUFDMUIsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDN0I7S0FDRixDQUFDO0lBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlDRztJQUNILFNBQVMsYUFBYSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUNyRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxjQUFjLEVBQUUsZUFBZTtTQUNoQyxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFDRSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUN2QyxVQUFVLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFDaEM7WUFDQSxLQUFLLEdB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