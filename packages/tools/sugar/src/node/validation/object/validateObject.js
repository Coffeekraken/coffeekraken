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
        define(["require", "exports", "../../error/SObjectValidationError", "../../is/plainObject", "../../object/deepMerge", "../../object/filter", "../../object/get", "../../value/typeof", "../value/validateValue", "./validation/SStaticValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SObjectValidationError_1 = __importDefault(require("../../error/SObjectValidationError"));
    var plainObject_1 = __importDefault(require("../../is/plainObject"));
    var deepMerge_2 = __importDefault(require("../../object/deepMerge"));
    var filter_1 = __importDefault(require("../../object/filter"));
    var get_1 = __importDefault(require("../../object/get"));
    var typeof_2 = __importDefault(require("../../value/typeof"));
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
     * @wip
     *
     * This function take an object, a definition object and validate this one depending on the definition...
     * A definition object is a plain object that specify for each properties, some requirerments like the type, if it is required or not, etc...
     * For more documentation about the definition objects, check the "validateDefinitionObject" function doc.
     *
     * @param       {Object}        objectToCheck       The object to check using the definition one
     * @param       {Object}        definitionObj       The definition object to use
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
    function validateObject(objectToCheck, definitionObj, settings, _argPath) {
        if (settings === void 0) { settings = {}; }
        if (_argPath === void 0) { _argPath = []; }
        settings = deepMerge_2.default({
            throw: true,
            name: null,
            interface: null,
            validationsObj: _validationsObj
        }, settings);
        var issuesObj = {
            $name: settings.name ||
                objectToCheck.constructor.name ||
                objectToCheck.name ||
                'Unnamed',
            $interface: settings.interface,
            $issues: [],
            $messages: {}
        };
        var _loop_1 = function (i) {
            var argName = Object.keys(definitionObj)[i];
            var argDefinition = definitionObj[argName];
            // __SObjectDefinitionInterface.apply(argDefinition);
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
                $name: argName,
                $received: {
                    type: typeof_2.default(value),
                    value: value
                },
                $expected: argDefinition,
                $issues: [],
                $messages: {}
            };
            var validationRes = validateValue_1.default(value, argDefinition, {
                name: argName,
                throw: settings.throw
            });
            if (validationRes !== true) {
                issuesObj[argName] = deepMerge_2.default(issuesObj[argName], validationRes || {}, {
                    array: true
                });
            }
            else {
            }
            Object.keys(settings.validationsObj).forEach(function (validationName) {
                var _a;
                if (!_validationsObj[validationName]) {
                    issuesObj.$issues.push("definitionObj." + validationName + ".unknown");
                    issuesObj.$messages["definitionObj." + validationName + ".unknown"] = "The specified \"<yellow>" + validationName + "</yellow>\" validation is <red>not supported</red>";
                }
                if (validationName === 'static' &&
                    definitionObj.static &&
                    definitionObj.static !== true)
                    return;
                if (!definitionObj.hasOwnProperty(validationName))
                    return;
                if (!definitionObj[validationName])
                    return;
                var validationObj = Object.assign({}, settings.validationsObj[validationName]);
                validationObj.args = validationObj.args.map(function (arg) {
                    if (typeof arg === 'string' && arg.slice(0, 15) === '%definitionObj.') {
                        arg = get_1.default(definitionObj, arg.replace('%definitionObj.', ''));
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
                    issuesObj[argName].$issues.push(validationName);
                    issuesObj[argName].$messages[validationName] = validationResult;
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
                        $issues: []
                    };
                }
                issuesObj[argName] = settings.extendsFn(argName, argDefinition, value, issuesObj[argName]);
            }
            // filter args that have no issues
            issuesObj = filter_1.default(issuesObj, function (item, key) {
                if (Array.isArray(item))
                    return true;
                if (plainObject_1.default(item) && item.$issues) {
                    if (!item.$issues.length)
                        return false;
                    if (issuesObj.$issues.indexOf(key) === -1)
                        issuesObj.$issues.push(key);
                }
                return true;
            });
            // TODO implement the "children" support
            // check if we have some "children" properties
            if (argDefinition.definitionObj &&
                (argDefinition.required ||
                    (objectToCheck !== null && objectToCheck !== undefined))) {
                var childrenValidation_1 = validateObject(objectToCheck || {}, argDefinition.definitionObj, __assign(__assign({}, settings), { throw: false }), __spreadArrays(_argPath, [argName]));
                // console.log('CC', childrenValidation);
                if (childrenValidation_1 !== true && childrenValidation_1.$issues) {
                    childrenValidation_1.$issues.forEach(function (issue) {
                        var issueObj = childrenValidation_1[issue];
                        issueObj.$name = argName + "." + issueObj.name;
                        issuesObj.$issues.push(argName + "." + issue);
                        issuesObj[argName + "." + issue] = issueObj;
                    });
                }
            }
        };
        // loop on the definition object properties
        for (var i = 0; i < Object.keys(definitionObj).length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        if (!issuesObj.$issues.length)
            return true;
        if (settings.throw) {
            throw new SObjectValidationError_1.default(issuesObj);
        }
        return issuesObj;
    }
    return validateObject;
});
