// @ts-nocheck
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
            var validationResult = (_a = validationObj.class).apply.apply(_a, __spreadArray([value], validationObj.args));
            if (validationResult !== true) {
                issueObj.issues.push(validationName);
                issueObj.messages[validationName] = validationResult;
            }
        });
        if (settings.extendFn && typeof settings.extendFn === 'function') {
            var additionalIssues = settings.extendFn(value, definition, settings) || [];
            issueObj.issues = __spreadArray(__spreadArray([], issueObj.issues), (additionalIssues.issues || []));
            issueObj.messages = __spreadArray(__spreadArray([], issueObj.messages), (additionalIssues.messages || []));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVWYWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbGlkYXRlVmFsdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJZCxxRUFBaUQ7SUFDakQsOERBQTBDO0lBRzFDLG1FQUErQztJQUUvQyx5RkFBcUU7SUFDckUsaUZBQTZEO0lBQzdELGlGQUE2RDtJQUM3RCxxRkFBaUU7SUFFakUsSUFBTSxlQUFlLEdBQUc7UUFDdEIsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLDZCQUFxQjtZQUM1QixJQUFJLEVBQUUsRUFBRTtTQUNUO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLHlCQUFpQjtZQUN4QixJQUFJLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUNsQztRQUNELElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSx5QkFBaUI7WUFDeEIsSUFBSSxFQUFFLENBQUMsa0JBQWtCLENBQUM7U0FDM0I7UUFDRCxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsMkJBQW1CO1lBQzFCLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQzdCO0tBQ0YsQ0FBQztJQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQ0c7SUFDSCxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDckQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxJQUFJO1lBQ2QsY0FBYyxFQUFFLGVBQWU7U0FDaEMsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQ0UsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLENBQUM7WUFDdkMsVUFBVSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQ2hDO1lBQ0EsS0FBSyxHQUFH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