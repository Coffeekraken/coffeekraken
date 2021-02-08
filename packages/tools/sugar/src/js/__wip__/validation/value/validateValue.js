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
    return validateValue;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSWQscUVBQWlEO0lBQ2pELDhEQUEwQztJQUcxQyxtRUFBK0M7SUFFL0MseUZBQXFFO0lBQ3JFLGlGQUE2RDtJQUM3RCxpRkFBNkQ7SUFDN0QscUZBQWlFO0lBRWpFLElBQU0sZUFBZSxHQUFHO1FBQ3RCLFFBQVEsRUFBRTtZQUNSLEtBQUssRUFBRSw2QkFBcUI7WUFDNUIsSUFBSSxFQUFFLEVBQUU7U0FDVDtRQUNELElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSx5QkFBaUI7WUFDeEIsSUFBSSxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDbEM7UUFDRCxJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUseUJBQWlCO1lBQ3hCLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDO1NBQzNCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLDJCQUFtQjtZQUMxQixJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztTQUM3QjtLQUNGLENBQUM7SUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUNHO0lBQ0gsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3JELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxlQUFlO1NBQ2hDLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUNFLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO1lBQ3ZDLFVBQVUsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUNoQztZQUNBLEtBQUssR0FB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