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
        define(["require", "exports", "../object/deepMerge", "../is/integer", "../is/class", "../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var integer_1 = __importDefault(require("../is/integer"));
    var class_2 = __importDefault(require("../is/class"));
    var upperFirst_1 = __importDefault(require("../string/upperFirst"));
    /**
     * @name          typeof
     * @namespace          sugar.js.value
     * @type          Function
     * @beta
     *
     * This function return the correct type of the passed value.
     * It support the recognition of arrays and return 'Array' as property type.
     * You can olso ask the function to gives you the "of" types of the passed value. This mean that if you
     * pass an Array like so "[10,'Hello',true]" and that you ask for "of" types, it will returns you
     * "Array<Integer|String|Boolean>".
     * Another feature is to ask the result as an object like so:
     * {
     *    type: 'Array',
     *    of: ['Integer','String','Boolean']
     * }
     * You can ask also the typeof function to returns you the actual class name if the passed value is an instance
     * of an custom class.
     *
     * @param       {Mixed}    value    The value to get the type of
     * @param       {Object}    [settings={}]         An object of settings to configure your type get process:
     * - of (false) {Boolean}: Specify if you want to get the "child" properties types for Objects, Arrays and custom classes
     * - format ('String') {String}: Specify if you want back a String of an Object
     * - customClass (true) {Boolean}: Specify if you want the custom classes to return theirs real names or simply Object
     * @return      {String|Object}               The type in string format, of an object if the setting "object" is set to true
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import typeof from '@coffeekraken/sugar/js/value/typeof';
     * typeof(true); // => Boolean
     * typeof(10); // => Integer
     * typeof(12.4); // => Number
     * typeof(['Hello']); // => Array
     * typeof(['Hello',true], { of: true }); // => Array<String|Boolean>
     *
     * class MyCoolClass {
     *    // ...
     * }
     * const myInstance = new MyCoolClass();
     * typeof(myInstance, { customClass: true }); // => MyCoolClass
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function typeOf(value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_2.default({
            of: false,
            customClass: true
        }, settings);
        // get the real type
        var type;
        if (Array.isArray(value))
            type = 'Array';
        else if (value === null)
            type = 'Null';
        else if (value === undefined)
            type = 'Undefined';
        else if (typeof value === 'string')
            type = 'String';
        else if (integer_1.default(value))
            type = 'Integer';
        else if (typeof value === 'number')
            type = 'Number';
        else if (typeof value === 'boolean')
            type = 'Boolean';
        else if (value instanceof RegExp)
            type = 'RegExp';
        else if (settings.customClass === true &&
            class_2.default(value) &&
            value.name !== undefined) {
            type = upperFirst_1.default(value.name);
        }
        else if (settings.customClass === true &&
            value.constructor !== undefined &&
            value.constructor.name !== undefined) {
            type = upperFirst_1.default(value.constructor.name);
        }
        else if (settings.customClass === false && class_2.default(value)) {
            type = 'Class';
        }
        else if (typeof value === 'function')
            type = 'Function';
        else if (typeof value === 'object')
            type = 'Object';
        else
            type = 'Unknown';
        // check if need to get the "child" types
        var avoidTypes = [
            'Null',
            'Undefined',
            'String',
            'Integer',
            'Number',
            'Boolean',
            'Unknown'
        ];
        if (settings.of === true && !avoidTypes.includes(type)) {
            var loopOn = Array.isArray(value)
                ? __spreadArrays(value.keys()) : Object.keys(value);
            var receivedTypes_1 = [];
            loopOn.forEach(function (valueIndex) {
                var valueToCheck = value[valueIndex];
                var childType = typeOf(valueToCheck, {
                    of: false,
                    customClass: settings.customClass
                });
                if (!receivedTypes_1.includes(childType)) {
                    receivedTypes_1.push(childType);
                }
            });
            // save the "of" types in the result obj
            type += "<" + receivedTypes_1.join('|') + ">";
        }
        return type;
    }
    ;
    return typeOf;
});
