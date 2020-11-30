// @ts-nocheck
// @shared
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
        define(["require", "exports", "../parse/parseTypeDefinitionString", "../value/typeof", "../value/typeDefinitionArrayObjectToString", "../type/_SType"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parseTypeDefinitionString_1 = __importDefault(require("../parse/parseTypeDefinitionString"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var typeDefinitionArrayObjectToString_1 = __importDefault(require("../value/typeDefinitionArrayObjectToString"));
    var _SType_1 = __importDefault(require("../type/_SType"));
    /**
     * @name              ofType
     * @namespace           sugar.js.is
     * @type              Function
     * @beta
     *
     * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
     * if the value pass the test or not...
     *
     * @param       {Mixed}        value          The value to check
     * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
     * @return      {Boolean|Object}                    true if the value pass the test, an object with two sub-objects describing the issue. 1 names "$expected" and the othet names "$received"
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import isOfType from '@coffeekraken/sugar/js/is/ofType';
     * ifOfType(true, 'Boolean'); // => true
     * isOfType(12, 'String|Number'); // => true
     * isOfType(['hello',true], 'Array<String>'); // => { $expected: { type: 'Array<String>' }, $received: { type: 'Array<String|Boolean>' }}
     * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function ofType(value, argTypeDefinition) {
        var definitionArray = argTypeDefinition;
        // parsing the argument definition string
        if (typeof argTypeDefinition === 'string') {
            definitionArray = parseTypeDefinitionString_1.default(argTypeDefinition);
        }
        var typeOfValue = typeof_1.default(value);
        var issueObj = {
            $received: {
                type: typeof_1.default(value, { of: true }),
                value: value
            },
            $expected: {
                type: typeDefinitionArrayObjectToString_1.default(definitionArray)
            },
            $issues: ['type']
        };
        var _loop_1 = function (i) {
            var definition = definitionArray[i];
            // if ((value === null || value === undefined) && definition.type) {
            //   issueObj.received.type = __typeof(value);
            // }
            // Array | Object
            if (definition.type === 'Array' || definition.type === 'Object') {
                // Array
                if (definition.type === 'Array') {
                    // make sure the value is an array
                    if (typeOfValue === 'Array' && !definition.of)
                        return { value: true };
                    // Object
                }
                else if (definition.type === 'Object') {
                    if (typeOfValue === 'Object' && !definition.of)
                        return { value: true };
                }
                if (definition.of &&
                    (Array.isArray(value) || typeof value === 'object')) {
                    var loopOn = Array.isArray(value)
                        ? __spreadArrays(value.keys()) : Object.keys(value);
                    var checkValuesResult_1 = true;
                    var receivedTypes_1 = [];
                    loopOn.forEach(function (valueIndex) {
                        var valueToCheck = value[valueIndex];
                        if (ofType(valueToCheck, definition.of) !== true) {
                            checkValuesResult_1 = false;
                        }
                        var typeString = typeof_1.default(valueToCheck);
                        if (receivedTypes_1.indexOf(typeString) === -1) {
                            receivedTypes_1.push(typeString);
                        }
                    });
                    if (checkValuesResult_1)
                        return { value: true };
                    // if (!checkValuesResult) {
                    //   issueObj.received.type = `${typeOfValue}<${receivedTypes.join('|')}>`;
                    // }
                }
            }
            // generate a new type to check
            var TypeCls = new _SType_1.default(definition.type);
            console.log(TypeCls);
        };
        for (var i = 0; i < definitionArray.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return issueObj;
    }
    function getBaseClass(targetClass) {
        var stack = [];
        if (targetClass instanceof Function) {
            var baseClass = targetClass;
            while (baseClass) {
                var newBaseClass = Object.getPrototypeOf(baseClass);
                if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                    stack.push(newBaseClass.name);
                    baseClass = newBaseClass;
                }
                else {
                    break;
                }
            }
            return stack;
        }
    }
    return ofType;
});
