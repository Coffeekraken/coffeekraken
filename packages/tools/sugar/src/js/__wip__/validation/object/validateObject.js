// @ts-nocheck
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        define(["require", "exports", "../../string/toString", "../../is/plainObject", "../../object/deepMerge", "../../object/filter", "../../object/get", "../../value/typeof", "../value/validateValue", "./validation/SStaticValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    var toString_1 = __importDefault(require("../../string/toString"));
    var plainObject_1 = __importDefault(require("../../is/plainObject"));
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var filter_1 = __importDefault(require("../../object/filter"));
    var get_1 = __importDefault(require("../../object/get"));
    var typeof_1 = __importDefault(require("../../value/typeof"));
    var validateValue_1 = __importDefault(require("../value/validateValue"));
    var SStaticValidation_1 = __importDefault(require("./validation/SStaticValidation"));
    var _validationsObj = {
        static: {
            class: SStaticValidation_1.default,
            args: ['%object', '%property']
        }
    };
    /**
     * @name            validateObject
     * @namespace           sugar.js.validation.object
     * @type            Function
     * @status              wip
     *
     * This function take an object, a definition object and validate this one depending on the definition...
     * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
     * For more documentation about the definition objects, check the "validatedefinitionect" function doc.
     *
     * @param       {Object}        objectToCheck       The object to check using the definition one
     * @param       {Object}        definition       The definition object to use
     * @param       {String}        [name='unnamed']    Specify a name for your object. This will be useful during the validation process
     * @param       {Object}        [settings={}]         An object of settings to configure your validation process:
     * - throw (true) {Boolean}: Specify if you want to throw an error when something goes wrong
     * - extendsFn (null) {Function}: Specify a function that will be called for each properties with the arguments "argName", "argDefinition" and "value" to let you the possibility to extend this validation function
     * @return      {Boolean|Array<String>}                    Return true if all is ok, and an Array of string that describe the issue if it's not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
     * validateObject({
     *    arg1: 'hello',
     *    arg2: false
     * }, {
     *    arg1: {
     *      type: 'String',
     *      required: true
     *    },
     *    arg2: {
     *      type: 'Boolean',
     *      required: true
     *    }
     * }); // => true
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateObject(objectToCheck, definition, settings, _argPath) {
        if (settings === void 0) { settings = {}; }
        if (_argPath === void 0) { _argPath = []; }
        settings = deepMerge_1.default({
            throw: true,
            name: null,
            interface: null,
            validationsObj: _validationsObj
        }, settings);
        var issuesObj = {
            name: settings.name ||
                objectToCheck.constructor.name ||
                objectToCheck.name ||
                'Unnamed',
            interface: settings.interface,
            issues: [],
            messages: {}
        };
        var _loop_1 = function (i) {
            var argName = Object.keys(definition)[i];
            var argDefinition = definition[argName];
            var value = get_1.default(objectToCheck, argName);
            if (value === undefined || value === null) {
                if (objectToCheck.constructor &&
                    objectToCheck.constructor[argName] !== undefined) {
                    value = objectToCheck.constructor[argName];
                }
            }
            if (!argDefinition.required && (value === undefined || value === null)) {
                return "break";
            }
            issuesObj[argName] = {
                name: argName,
                received: {
                    type: typeof_1.default(value),
                    value: value
                },
                expected: argDefinition,
                issues: [],
                messages: {}
            };
            var validationRes = validateValue_1.default(value, argDefinition, {
                name: argName,
                throw: settings.throw
            });
            if (validationRes !== true) {
                issuesObj[argName] = deepMerge_1.default(issuesObj[argName], validationRes || {}, {
                    array: true
                });
            }
            else {
            }
            Object.keys(settings.validationsObj).forEach(function (validationName) {
                var _a;
                if (!_validationsObj[validationName]) {
                    issuesObj.issues.push("definition." + validationName + ".unknown");
                    issuesObj.messages["definition." + validationName + ".unknown"] = "The specified \"<yellow>" + validationName + "</yellow>\" validation is <red>not supported</red>";
                }
                if (validationName === 'static' &&
                    definition.static &&
                    definition.static !== true)
                    return;
                if (!definition.hasOwnProperty(validationName))
                    return;
                if (!definition[validationName])
                    return;
                var validationObj = Object.assign({}, settings.validationsObj[validationName]);
                validationObj.args = validationObj.args.map(function (arg) {
                    if (typeof arg === 'string' && arg.slice(0, 15) === '%definition.') {
                        arg = get_1.default(definition, arg.replace('%definition.', ''));
                    }
                    if (typeof arg === 'string' && arg === '%object') {
                        arg = objectToCheck;
                    }
                    if (typeof arg === 'string' && arg === '%property') {
                        arg = argName;
                    }
                    return arg;
                });
                var validationResult = (_a = validationObj.class).apply.apply(_a, __spreadArrays([value], validationObj.args));
                if (validationResult !== true) {
                    issuesObj[argName].issues.push(validationName);
                    issuesObj[argName].messages[validationName] = validationResult;
                }
            });
            // handle "lazy" properties
            if ((argDefinition.lazy && objectToCheck[argName] === null) ||
                objectToCheck[argName] === undefined) {
                if (!objectToCheck.__validateObjectObservedProperties) {
                    Object.defineProperty(objectToCheck, '__validateObjectObservedProperties', {
                        value: [],
                        writable: true,
                        enumerable: false
                    });
                }
                if (objectToCheck.__validateObjectObservedProperties.indexOf(argName) !== -1) {
                }
                else {
                    var descriptor_1 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(objectToCheck), argName);
                    objectToCheck.__validateObjectObservedProperties.push(argName);
                    Object.defineProperty(objectToCheck, argName, {
                        set: function (value) {
                            // validate the passed value
                            var validationResult = validateValue_1.default(value, argDefinition, __assign(__assign({}, settings), { throw: true, name: settings.name + "." + argName }));
                            if (descriptor_1 && descriptor_1.set)
                                return descriptor_1.set(value);
                            objectToCheck["__" + argName] = value;
                            return value;
                        },
                        get: function () {
                            if (descriptor_1 && descriptor_1.get)
                                descriptor_1.get();
                            return objectToCheck["__" + argName];
                        }
                    });
                }
            }
            // check if is an extendsFn
            if (settings.extendsFn) {
                if (!issuesObj[argName]) {
                    issuesObj[argName] = {
                        issues: []
                    };
                }
                issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
            }
            // filter args that have no issues
            issuesObj = filter_1.default(issuesObj, function (item, key) {
                if (Array.isArray(item))
                    return true;
                if (plainObject_1.default(item) && item.issues) {
                    if (!item.issues.length)
                        return false;
                    if (issuesObj.issues.indexOf(key) === -1)
                        issuesObj.issues.push(key);
                }
                return true;
            });
            // TODO implement the "children" support
            // check if we have some "children" properties
            if (argDefinition.definition &&
                (argDefinition.required ||
                    (objectToCheck !== null && objectToCheck !== undefined))) {
                var childrenValidation_1 = validateObject(objectToCheck || {}, argDefinition.definition, __assign(__assign({}, settings), { throw: false }), __spreadArrays(_argPath, [argName]));
                if (childrenValidation_1 !== true && childrenValidation_1.issues) {
                    childrenValidation_1.issues.forEach(function (issue) {
                        var issueObj = childrenValidation_1[issue];
                        issueObj.name = argName + "." + issueObj.name;
                        issuesObj.issues.push(argName + "." + issue);
                        issuesObj[argName + "." + issue] = issueObj;
                    });
                }
            }
        };
        // loop on the definition object properties
        for (var i = 0; i < Object.keys(definition).length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        if (!issuesObj.issues.length)
            return true;
        if (settings.throw) {
            throw toString_1.default(issuesObj, {
                beautify: true
            });
        }
        return issuesObj;
    }
    return validateObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG1FQUErQztJQUUvQyxxRUFBbUQ7SUFDbkQscUVBQWlEO0lBQ2pELCtEQUEyQztJQUMzQyx5REFBcUM7SUFDckMsOERBQTBDO0lBQzFDLHlFQUFxRDtJQUNyRCxxRkFBaUU7SUFFakUsSUFBTSxlQUFlLEdBQUc7UUFDdEIsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLDJCQUFtQjtZQUMxQixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO1NBQy9CO0tBQ0YsQ0FBQztJQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bd0NHO0lBQ0gsU0FBUyxjQUFjLENBQ3JCLGFBQWEsRUFDYixVQUFVLEVBQ1YsUUFBYSxFQUNiLFFBQWE7UUFEYix5QkFBQSxFQUFBLGFBQWE7UUFDYix5QkFBQSxFQUFBLGFBQWE7UUFFYixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLElBQUk7WUFDZixjQUFjLEVBQUUsZUFBZTtTQUNoQyxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUc7WUFDZCxJQUFJLEVBQ0YsUUFBUSxDQUFDLElBQUk7Z0JBQ2IsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUM5QixhQUFhLENBQUMsSUFBSTtnQkFDbEIsU0FBUztZQUNYLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztZQUM3QixNQUFNLEVBQUUsRUFBRTtZQUNWLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztnQ0FHTyxDQUFDO1lBQ1IsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxV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