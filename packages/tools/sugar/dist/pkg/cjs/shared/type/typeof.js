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
 * @snippet         __typeof($1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFxQztBQUNyQyxnRUFBcUM7QUFDckMsb0VBQTZDO0FBQzdDLHNFQUErQztBQU8vQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrREc7QUFDSCxTQUF3QixRQUFRLENBQzVCLEtBQVUsRUFDVixXQUE0QixFQUFFO0lBRTlCLFFBQVEsR0FBRyxJQUFBLG1CQUFVLEVBQ2pCO1FBQ0ksRUFBRSxFQUFFLEtBQUs7UUFDVCxXQUFXLEVBQUUsSUFBSTtLQUNwQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsb0JBQW9CO0lBQ3BCLElBQUksSUFBWSxDQUFDO0lBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3BDLElBQUksS0FBSyxZQUFZLEdBQUc7UUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDO1NBQzVDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDL0MsSUFBSSxJQUFBLG1CQUFNLEVBQUMsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNwQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQy9DLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxTQUFTLENBQUM7U0FDakQsSUFBSSxLQUFLLFlBQVksTUFBTTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDN0MsSUFDRCxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUk7UUFDN0IsSUFBQSxpQkFBUSxFQUFDLEtBQUssQ0FBQztRQUNmLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUMxQjtRQUNFLElBQUksR0FBRyxJQUFBLG9CQUFXLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDO1NBQU0sSUFDSCxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUk7UUFDN0IsS0FBSyxDQUFDLFdBQVcsS0FBSyxTQUFTO1FBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDdEM7UUFDRSxJQUFJLEdBQUcsSUFBQSxvQkFBVyxFQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLElBQUEsaUJBQVEsRUFBQyxLQUFLLENBQUMsRUFBRTtRQUMxRCxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVO1FBQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUNyRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDOztRQUMvQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBRXRCLHlDQUF5QztJQUN6QyxNQUFNLFVBQVUsR0FBRztRQUNmLE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLFNBQVM7UUFDVCxRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtZQUMvQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsTUFBTSxTQUFTLEdBQVcsUUFBUSxDQUFDLFlBQVksRUFBRTtnQkFDN0MsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2FBQ3BDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQzFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXZFRCwyQkF1RUMifQ==