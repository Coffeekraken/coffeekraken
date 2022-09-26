"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isClass_1 = __importDefault(require("../is/isClass"));
const isInteger_1 = __importDefault(require("../is/isInteger"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const upperFirst_1 = __importDefault(require("../string/upperFirst"));
/**
 * @name          typeof
 * @namespace            js.value
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * import { __typeof } from '@coffeekraken/sugar/type';
 * __typeof(true); // => Boolean
 * __typeof(10); // => Integer
 * __typeof(12.4); // => Number
 * __typeof(['Hello']); // => Array
 * __typeof(['Hello',true], { of: true }); // => Array<String|Boolean>
 *
 * class MyCoolClass {
 *    // ...
 * }
 * const myInstance = new MyCoolClass();
 * __typeof(myInstance, { customClass: true }); // => MyCoolClass
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __typeof(value, settings = {}) {
    settings = (0, deepMerge_1.default)({
        of: false,
        customClass: true,
    }, settings);
    // get the real type
    let type;
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
    else if ((0, isInteger_1.default)(value))
        type = 'Integer';
    else if (typeof value === 'number')
        type = 'Number';
    else if (typeof value === 'boolean')
        type = 'Boolean';
    else if (value instanceof RegExp)
        type = 'RegExp';
    else if (settings.customClass === true &&
        (0, isClass_1.default)(value) &&
        value.name !== undefined) {
        type = (0, upperFirst_1.default)(value.name);
    }
    else if (settings.customClass === true &&
        value.constructor !== undefined &&
        value.constructor.name !== undefined) {
        type = (0, upperFirst_1.default)(value.constructor.name);
    }
    else if (settings.customClass === false && (0, isClass_1.default)(value)) {
        type = 'Class';
    }
    else if (typeof value === 'function')
        type = 'Function';
    else if (typeof value === 'object')
        type = 'Object';
    else
        type = 'Unknown';
    // check if need to get the "child" types
    const avoidTypes = [
        'Null',
        'Undefined',
        'String',
        'Integer',
        'Number',
        'Boolean',
        'Unknown',
    ];
    if (settings.of === true && !avoidTypes.includes(type)) {
        const loopOn = Array.isArray(value)
            ? [...value.keys()]
            : Object.keys(value);
        const receivedTypes = [];
        loopOn.forEach((valueIndex) => {
            const valueToCheck = value[valueIndex];
            const childType = __typeOf(valueToCheck, {
                of: false,
                customClass: settings.customClass,
            });
            if (!receivedTypes.includes(childType)) {
                receivedTypes.push(childType);
            }
        });
        // save the "of" types in the result obj
        type += `<${receivedTypes.join('|')}>`;
    }
    return type;
}
exports.default = __typeof;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFxQztBQUNyQyxnRUFBcUM7QUFDckMsb0VBQTZDO0FBQzdDLHNFQUErQztBQU8vQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0gsU0FBd0IsUUFBUSxDQUM1QixLQUFVLEVBQ1YsV0FBNEIsRUFBRTtJQUU5QixRQUFRLEdBQUcsSUFBQSxtQkFBVSxFQUNqQjtRQUNJLEVBQUUsRUFBRSxLQUFLO1FBQ1QsV0FBVyxFQUFFLElBQUk7S0FDcEIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixJQUFJLElBQVksQ0FBQztJQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNwQyxJQUFJLEtBQUssWUFBWSxHQUFHO1FBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTO1FBQUUsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUM1QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQy9DLElBQUksSUFBQSxtQkFBTSxFQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxTQUFTLENBQUM7U0FDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUMvQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ2pELElBQUksS0FBSyxZQUFZLE1BQU07UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQzdDLElBQ0QsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1FBQzdCLElBQUEsaUJBQVEsRUFBQyxLQUFLLENBQUM7UUFDZixLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDMUI7UUFDRSxJQUFJLEdBQUcsSUFBQSxvQkFBVyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQ0gsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1FBQzdCLEtBQUssQ0FBQyxXQUFXLEtBQUssU0FBUztRQUMvQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3RDO1FBQ0UsSUFBSSxHQUFHLElBQUEsb0JBQVcsRUFBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxJQUFBLGlCQUFRLEVBQUMsS0FBSyxDQUFDLEVBQUU7UUFDMUQsSUFBSSxHQUFHLE9BQU8sQ0FBQztLQUNsQjtTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVTtRQUFFLElBQUksR0FBRyxVQUFVLENBQUM7U0FDckQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQzs7UUFDL0MsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUV0Qix5Q0FBeUM7SUFDekMsTUFBTSxVQUFVLEdBQUc7UUFDZixNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixTQUFTO1FBQ1QsUUFBUTtRQUNSLFNBQVM7UUFDVCxTQUFTO0tBQ1osQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7WUFDL0IsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sU0FBUyxHQUFXLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQzdDLEVBQUUsRUFBRSxLQUFLO2dCQUNULFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVzthQUNwQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDcEMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztLQUMxQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF2RUQsMkJBdUVDIn0=