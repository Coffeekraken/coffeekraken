"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const integer_1 = __importDefault(require("../is/integer"));
const class_1 = __importDefault(require("../is/class"));
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function typeOf(value, settings = {}) {
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
    else if ((0, integer_1.default)(value))
        type = 'Integer';
    else if (typeof value === 'number')
        type = 'Number';
    else if (typeof value === 'boolean')
        type = 'Boolean';
    else if (value instanceof RegExp)
        type = 'RegExp';
    else if (settings.customClass === true &&
        (0, class_1.default)(value) &&
        value.name !== undefined) {
        type = (0, upperFirst_1.default)(value.name);
    }
    else if (settings.customClass === true &&
        value.constructor !== undefined &&
        value.constructor.name !== undefined) {
        type = (0, upperFirst_1.default)(value.constructor.name);
    }
    else if (settings.customClass === false && (0, class_1.default)(value)) {
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
            const childType = typeOf(valueToCheck, {
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
exports.default = typeOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE2QztBQUM3Qyw0REFBbUM7QUFDbkMsd0RBQW1DO0FBQ25DLHNFQUErQztBQU8vQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0RHO0FBQ0gsU0FBUyxNQUFNLENBQUMsS0FBVSxFQUFFLFdBQTRCLEVBQUU7SUFDdEQsUUFBUSxHQUFHLElBQUEsbUJBQVUsRUFDakI7UUFDSSxFQUFFLEVBQUUsS0FBSztRQUNULFdBQVcsRUFBRSxJQUFJO0tBQ3BCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixvQkFBb0I7SUFDcEIsSUFBSSxJQUFZLENBQUM7SUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxPQUFPLENBQUM7U0FDcEMsSUFBSSxLQUFLLFlBQVksR0FBRztRQUFFLElBQUksR0FBRyxLQUFLLENBQUM7U0FDdkMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLElBQUksR0FBRyxNQUFNLENBQUM7U0FDbEMsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxXQUFXLENBQUM7U0FDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUMvQyxJQUFJLElBQUEsaUJBQU0sRUFBQyxLQUFLLENBQUM7UUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDL0MsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO1FBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNqRCxJQUFJLEtBQUssWUFBWSxNQUFNO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUM3QyxJQUNELFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtRQUM3QixJQUFBLGVBQVEsRUFBQyxLQUFLLENBQUM7UUFDZixLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDMUI7UUFDRSxJQUFJLEdBQUcsSUFBQSxvQkFBVyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztTQUFNLElBQ0gsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1FBQzdCLEtBQUssQ0FBQyxXQUFXLEtBQUssU0FBUztRQUMvQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3RDO1FBQ0UsSUFBSSxHQUFHLElBQUEsb0JBQVcsRUFBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxJQUFBLGVBQVEsRUFBQyxLQUFLLENBQUMsRUFBRTtRQUMxRCxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVO1FBQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUNyRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDOztRQUMvQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBRXRCLHlDQUF5QztJQUN6QyxNQUFNLFVBQVUsR0FBRztRQUNmLE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLFNBQVM7UUFDVCxRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtZQUMvQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDM0MsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2FBQ3BDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNwQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQzFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9