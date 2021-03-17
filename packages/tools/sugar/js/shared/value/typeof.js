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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC92YWx1ZS90eXBlb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQTZDO0lBQzdDLDBEQUFtQztJQUNuQyxzREFBbUM7SUFDbkMsb0VBQStDO0lBTy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOENHO0lBQ0gsU0FBUyxNQUFNLENBQUMsS0FBVSxFQUFFLFFBQThCO1FBQTlCLHlCQUFBLEVBQUEsYUFBOEI7UUFDeEQsUUFBUSxHQUFHLG1CQUFVLENBQ25CO1lBQ0UsRUFBRSxFQUFFLEtBQUs7WUFDVCxXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsb0JBQW9CO1FBQ3BCLElBQUksSUFBWSxDQUFDO1FBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ3BDLElBQUksS0FBSyxZQUFZLEdBQUc7WUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVM7WUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDO2FBQzVDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLElBQUksR0FBRyxRQUFRLENBQUM7YUFDL0MsSUFBSSxpQkFBTSxDQUFDLEtBQUssQ0FBQztZQUFFLElBQUksR0FBRyxTQUFTLENBQUM7YUFDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUMvQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7WUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO2FBQ2pELElBQUksS0FBSyxZQUFZLE1BQU07WUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQzdDLElBQ0gsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1lBQzdCLGVBQVEsQ0FBQyxLQUFLLENBQUM7WUFDZixLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDeEI7WUFDQSxJQUFJLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7YUFBTSxJQUNMLFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtZQUM3QixLQUFLLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFDL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUNwQztZQUNBLElBQUksR0FBRyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLGVBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1RCxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ2hCO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVO1lBQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQzthQUNyRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDOztZQUMvQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBRXRCLHlDQUF5QztRQUN6QyxJQUFNLFVBQVUsR0FBRztZQUNqQixNQUFNO1lBQ04sV0FBVztZQUNYLFFBQVE7WUFDUixTQUFTO1lBQ1QsUUFBUTtZQUNSLFNBQVM7WUFDVCxTQUFTO1NBQ1YsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxDQUFDLG1CQUFLLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkIsSUFBTSxlQUFhLEdBQWEsRUFBRSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFlO2dCQUM3QixJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZDLElBQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQzdDLEVBQUUsRUFBRSxLQUFLO29CQUNULFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztpQkFDbEMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxlQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUN0QyxlQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMvQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsd0NBQXdDO1lBQ3hDLElBQUksSUFBSSxNQUFJLGVBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQztTQUN4QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLE1BQU0sQ0FBQyJ9