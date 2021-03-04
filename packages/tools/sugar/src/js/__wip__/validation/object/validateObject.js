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
    exports.default = validateObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVPYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxtRUFBK0M7SUFFL0MscUVBQW1EO0lBQ25ELHFFQUFpRDtJQUNqRCwrREFBMkM7SUFDM0MseURBQXFDO0lBQ3JDLDhEQUEwQztJQUMxQyx5RUFBcUQ7SUFDckQscUZBQWlFO0lBRWpFLElBQU0sZUFBZSxHQUFHO1FBQ3RCLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSwyQkFBbUI7WUFDMUIsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQztTQUMvQjtLQUNGLENBQUM7SUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDRztJQUNILFNBQVMsY0FBYyxDQUNyQixhQUFhLEVBQ2IsVUFBVSxFQUNWLFFBQWEsRUFDYixRQUFhO1FBRGIseUJBQUEsRUFBQSxhQUFhO1FBQ2IseUJBQUEsRUFBQSxhQUFhO1FBRWIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLElBQUk7WUFDWCxJQUFJLEVBQUUsSUFBSTtZQUNWLFNBQVMsRUFBRSxJQUFJO1lBQ2YsY0FBYyxFQUFFLGVBQWU7U0FDaEMsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksU0FBUyxHQUFHO1lBQ2QsSUFBSSxFQUNGLFFBQVEsQ0FBQyxJQUFJO2dCQUNiLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDOUIsYUFBYSxDQUFDLElBQUk7Z0JBQ2xCLFNBQVM7WUFDWCxTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7Z0NBR08sQ0FBQztZQUNSLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMs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