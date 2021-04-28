// @ts-nocheck
import _deepMerge from '../object/deepMerge';
import _isInt from '../is/integer';
import _isClass from '../is/class';
import _upperFirst from '../string/upperFirst';
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
    settings = _deepMerge({
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
    else if (_isInt(value))
        type = 'Integer';
    else if (typeof value === 'number')
        type = 'Number';
    else if (typeof value === 'boolean')
        type = 'Boolean';
    else if (value instanceof RegExp)
        type = 'RegExp';
    else if (settings.customClass === true &&
        _isClass(value) &&
        value.name !== undefined) {
        type = _upperFirst(value.name);
    }
    else if (settings.customClass === true &&
        value.constructor !== undefined &&
        value.constructor.name !== undefined) {
        type = _upperFirst(value.constructor.name);
    }
    else if (settings.customClass === false && _isClass(value)) {
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
export default typeOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZW9mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLE1BQU0sTUFBTSxlQUFlLENBQUM7QUFDbkMsT0FBTyxRQUFRLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sV0FBVyxNQUFNLHNCQUFzQixDQUFDO0FBTy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOENHO0FBQ0gsU0FBUyxNQUFNLENBQUMsS0FBVSxFQUFFLFdBQTRCLEVBQUU7SUFDeEQsUUFBUSxHQUFHLFVBQVUsQ0FDbkI7UUFDRSxFQUFFLEVBQUUsS0FBSztRQUNULFdBQVcsRUFBRSxJQUFJO0tBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixvQkFBb0I7SUFDcEIsSUFBSSxJQUFZLENBQUM7SUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxPQUFPLENBQUM7U0FDcEMsSUFBSSxLQUFLLFlBQVksR0FBRztRQUFFLElBQUksR0FBRyxLQUFLLENBQUM7U0FDdkMsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLElBQUksR0FBRyxNQUFNLENBQUM7U0FDbEMsSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLElBQUksR0FBRyxXQUFXLENBQUM7U0FDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUMvQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7U0FDL0MsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO1FBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNqRCxJQUFJLEtBQUssWUFBWSxNQUFNO1FBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUM3QyxJQUNILFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtRQUM3QixRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2YsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3hCO1FBQ0EsSUFBSSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDaEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtRQUM3QixLQUFLLENBQUMsV0FBVyxLQUFLLFNBQVM7UUFDL0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUNwQztRQUNBLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QztTQUFNLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzVELElBQUksR0FBRyxPQUFPLENBQUM7S0FDaEI7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVU7UUFBRSxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQ3JELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLElBQUksR0FBRyxRQUFRLENBQUM7O1FBQy9DLElBQUksR0FBRyxTQUFTLENBQUM7SUFFdEIseUNBQXlDO0lBQ3pDLE1BQU0sVUFBVSxHQUFHO1FBQ2pCLE1BQU07UUFDTixXQUFXO1FBQ1gsUUFBUTtRQUNSLFNBQVM7UUFDVCxRQUFRO1FBQ1IsU0FBUztRQUNULFNBQVM7S0FDVixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsTUFBTSxhQUFhLEdBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtZQUNqQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDN0MsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2FBQ2xDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN0QyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCx3Q0FBd0M7UUFDeEMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQ3hDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBQ0QsZUFBZSxNQUFNLENBQUMifQ==