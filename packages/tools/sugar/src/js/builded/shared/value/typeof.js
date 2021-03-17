// @ts-nocheck
// @shared
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
        define(["require", "exports", "../object/deepMerge", "../is/integer", "../is/class", "../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var integer_1 = __importDefault(require("../is/integer"));
    var class_1 = __importDefault(require("../is/class"));
    var upperFirst_1 = __importDefault(require("../string/upperFirst"));
    /**
     * @name          typeof
     * @namespace          sugar.js.value
     * @type          Function
     * @status              beta
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
     * - format ('String') {String}: Specify if you want back a String or an Object
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
        settings = deepMerge_1.default({
            of: false,
            customClass: true
        }, settings);
        // get the real type
        var type;
        if (Array.isArray(value))
            type = 'Array';
        else if (value instanceof Map)
            type = 'Map';
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
            class_1.default(value) &&
            value.name !== undefined) {
            type = upperFirst_1.default(value.name);
        }
        else if (settings.customClass === true &&
            value.constructor !== undefined &&
            value.constructor.name !== undefined) {
            type = upperFirst_1.default(value.constructor.name);
        }
        else if (settings.customClass === false && class_1.default(value)) {
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
                ? __spreadArray([], value.keys()) : Object.keys(value);
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
    exports.default = typeOf;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL3ZhbHVlL3R5cGVvZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBNkM7SUFDN0MsMERBQW1DO0lBQ25DLHNEQUFtQztJQUNuQyxvRUFBK0M7SUFPL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Q0c7SUFDSCxTQUFTLE1BQU0sQ0FBQyxLQUFVLEVBQUUsUUFBOEI7UUFBOUIseUJBQUEsRUFBQSxhQUE4QjtRQUN4RCxRQUFRLEdBQUcsbUJBQVUsQ0FDbkI7WUFDRSxFQUFFLEVBQUUsS0FBSztZQUNULFdBQVcsRUFBRSxJQUFJO1NBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixvQkFBb0I7UUFDcEIsSUFBSSxJQUFZLENBQUM7UUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLElBQUksR0FBRyxPQUFPLENBQUM7YUFDcEMsSUFBSSxLQUFLLFlBQVksR0FBRztZQUFFLElBQUksR0FBRyxLQUFLLENBQUM7YUFDdkMsSUFBSSxLQUFLLEtBQUssSUFBSTtZQUFFLElBQUksR0FBRyxNQUFNLENBQUM7YUFDbEMsSUFBSSxLQUFLLEtBQUssU0FBUztZQUFFLElBQUksR0FBRyxXQUFXLENBQUM7YUFDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUMvQyxJQUFJLGlCQUFNLENBQUMsS0FBSyxDQUFDO1lBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQzthQUNwQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQy9DLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztZQUFFLElBQUksR0FBRyxTQUFTLENBQUM7YUFDakQsSUFBSSxLQUFLLFlBQVksTUFBTTtZQUFFLElBQUksR0FBRyxRQUFRLENBQUM7YUFDN0MsSUFDSCxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUk7WUFDN0IsZUFBUSxDQUFDLEtBQUssQ0FBQztZQUNmLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUN4QjtZQUNBLElBQUksR0FBRyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQ0wsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1lBQzdCLEtBQUssQ0FBQyxXQUFXLEtBQUssU0FBUztZQUMvQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3BDO1lBQ0EsSUFBSSxHQUFHLG9CQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QzthQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVELElBQUksR0FBRyxPQUFPLENBQUM7U0FDaEI7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVU7WUFBRSxJQUFJLEdBQUcsVUFBVSxDQUFDO2FBQ3JELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLElBQUksR0FBRyxRQUFRLENBQUM7O1lBQy9DLElBQUksR0FBRyxTQUFTLENBQUM7UUFFdEIseUNBQXlDO1FBQ3pDLElBQU0sVUFBVSxHQUFHO1lBQ2pCLE1BQU07WUFDTixXQUFXO1lBQ1gsUUFBUTtZQUNSLFNBQVM7WUFDVCxRQUFRO1lBQ1IsU0FBUztZQUNULFNBQVM7U0FDVixDQUFDO1FBQ0YsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEQsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLENBQUMsbUJBQUssS0FBSyxDQUFDLElBQUksRUFBRSxFQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixJQUFNLGVBQWEsR0FBYSxFQUFFLENBQUM7WUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFVBQWU7Z0JBQzdCLElBQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkMsSUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRTtvQkFDN0MsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2lCQUNsQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGVBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3RDLGVBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCx3Q0FBd0M7WUFDeEMsSUFBSSxJQUFJLE1BQUksZUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=