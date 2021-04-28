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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC92YWx1ZS90eXBlb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQTZDO0FBQzdDLDREQUFtQztBQUNuQyx3REFBbUM7QUFDbkMsc0VBQStDO0FBTy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsU0FBUyxNQUFNLENBQUMsS0FBVSxFQUFFLFdBQTRCLEVBQUU7SUFDeEQsUUFBUSxHQUFHLG1CQUFVLENBQ25CO1FBQ0UsRUFBRSxFQUFFLEtBQUs7UUFDVCxXQUFXLEVBQUUsSUFBSTtLQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsb0JBQW9CO0lBQ3BCLElBQUksSUFBWSxDQUFDO0lBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQ3BDLElBQUksS0FBSyxZQUFZLEdBQUc7UUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxJQUFJLEdBQUcsV0FBVyxDQUFDO1NBQzVDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDL0MsSUFBSSxpQkFBTSxDQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxTQUFTLENBQUM7U0FDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUMvQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ2pELElBQUksS0FBSyxZQUFZLE1BQU07UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQzdDLElBQ0gsUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJO1FBQzdCLGVBQVEsQ0FBQyxLQUFLLENBQUM7UUFDZixLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDeEI7UUFDQSxJQUFJLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtRQUM3QixLQUFLLENBQUMsV0FBVyxLQUFLLFNBQVM7UUFDL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUNwQztRQUNBLElBQUksR0FBRyxvQkFBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLGVBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM1RCxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVO1FBQUUsSUFBSSxHQUFHLFVBQVUsQ0FBQztTQUNyRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDOztRQUMvQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0lBRXRCLHlDQUF5QztJQUN6QyxNQUFNLFVBQVUsR0FBRztRQUNqQixNQUFNO1FBQ04sV0FBVztRQUNYLFFBQVE7UUFDUixTQUFTO1FBQ1QsUUFBUTtRQUNSLFNBQVM7UUFDVCxTQUFTO0tBQ1YsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3RELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7WUFDakMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sU0FBUyxHQUFXLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzdDLEVBQUUsRUFBRSxLQUFLO2dCQUNULFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVzthQUNsQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdEMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsd0NBQXdDO1FBQ3hDLElBQUksSUFBSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztLQUN4QztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELGtCQUFlLE1BQU0sQ0FBQyJ9