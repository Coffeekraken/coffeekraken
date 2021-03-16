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
        define(["require", "exports", "../../string/toString", "../../is/plainObject", "../../object/deepMerge", "../../object/filter", "../../object/get", "../../value/typeof", "../value/validateValue", "./validation/SStaticValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                var validationResult = (_a = validationObj.class).apply.apply(_a, __spreadArray([value], validationObj.args));
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
                var childrenValidation_1 = validateObject(objectToCheck || {}, argDefinition.definition, __assign(__assign({}, settings), { throw: false }), __spreadArray(__spreadArray([], _argPath), [argName]));
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
    exports.default = validateObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsbUVBQStDO0lBRS9DLHFFQUFtRDtJQUNuRCxxRUFBaUQ7SUFDakQsK0RBQTJDO0lBQzNDLHlEQUFxQztJQUNyQyw4REFBMEM7SUFDMUMseUVBQXFEO0lBQ3JELHFGQUFpRTtJQUVqRSxJQUFNLGVBQWUsR0FBRztRQUN0QixNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsMkJBQW1CO1lBQzFCLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7U0FDL0I7S0FDRixDQUFDO0lBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Q0c7SUFDSCxTQUFTLGNBQWMsQ0FDckIsYUFBYSxFQUNiLFVBQVUsRUFDVixRQUFhLEVBQ2IsUUFBYTtRQURiLHlCQUFBLEVBQUEsYUFBYTtRQUNiLHlCQUFBLEVBQUEsYUFBYTtRQUViLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixTQUFTLEVBQUUsSUFBSTtZQUNmLGNBQWMsRUFBRSxlQUFlO1NBQ2hDLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLFNBQVMsR0FBRztZQUNkLElBQUksRUFDRixRQUFRLENBQUMsSUFBSTtnQkFDYixhQUFhLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQzlCLGFBQWEsQ0FBQyxJQUFJO2dCQUNsQixTQUFTO1lBQ1gsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQUFTO1lBQzdCLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO2dDQUdPLENBQUM7WUFDUixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVB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