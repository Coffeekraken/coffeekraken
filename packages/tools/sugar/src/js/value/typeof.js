"use strict";
// @ts-nocheck
// @shared
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
function typeOf(value, settings = {}) {
    settings = deepMerge_1.default({
        of: false,
        customClass: true
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
    const avoidTypes = [
        'Null',
        'Undefined',
        'String',
        'Integer',
        'Number',
        'Boolean',
        'Unknown'
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
                customClass: settings.customClass
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZW9mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixvRUFBNkM7QUFDN0MsNERBQW1DO0FBQ25DLHdEQUFtQztBQUNuQyxzRUFBK0M7QUFPL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFDSCxTQUFTLE1BQU0sQ0FBQyxLQUFVLEVBQUUsV0FBNEIsRUFBRTtJQUN4RCxRQUFRLEdBQUcsbUJBQVUsQ0FDbkI7UUFDRSxFQUFFLEVBQUUsS0FBSztRQUNULFdBQVcsRUFBRSxJQUFJO0tBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixvQkFBb0I7SUFDcEIsSUFBSSxJQUFZLENBQUM7SUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxPQUFPLENBQUM7U0FDcEMsSUFBSSxLQUFLLFlBQVksR0FBRztRQUFFLElBQUksR0FBRyxLQUFLLENBQUM7U0FDdkMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLElBQUksR0FBRyxNQUFNLENBQUM7U0FDbEMsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxXQUFXLENBQUM7U0FDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUMvQyxJQUFJLGlCQUFNLENBQUMsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNwQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQy9DLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxTQUFTLENBQUM7U0FDakQsSUFBSSxLQUFLLFlBQVksTUFBTTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDN0MsSUFDSCxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUk7UUFDN0IsZUFBUSxDQUFDLEtBQUssQ0FBQztRQUNmLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUN4QjtRQUNBLElBQUksR0FBRyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQztTQUFNLElBQ0wsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1FBQzdCLEtBQUssQ0FBQyxXQUFXLEtBQUssU0FBUztRQUMvQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3BDO1FBQ0EsSUFBSSxHQUFHLG9CQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QztTQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksZUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzVELElBQUksR0FBRyxPQUFPLENBQUM7S0FDaEI7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVU7UUFBRSxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQ3JELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7O1FBQy9DLElBQUksR0FBRyxTQUFTLENBQUM7SUFFdEIseUNBQXlDO0lBQ3pDLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLFNBQVM7UUFDVCxRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVM7S0FDVixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtZQUNqQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDN0MsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2FBQ2xDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN0QyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQ3hDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=