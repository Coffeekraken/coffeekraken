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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC92YWx1ZS90eXBlb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLGVBQWUsQ0FBQztBQUNuQyxPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxXQUFXLE1BQU0sc0JBQXNCLENBQUM7QUFPL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFDSCxTQUFTLE1BQU0sQ0FBQyxLQUFVLEVBQUUsV0FBNEIsRUFBRTtJQUN4RCxRQUFRLEdBQUcsVUFBVSxDQUNuQjtRQUNFLEVBQUUsRUFBRSxLQUFLO1FBQ1QsV0FBVyxFQUFFLElBQUk7S0FDbEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixJQUFJLElBQVksQ0FBQztJQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNwQyxJQUFJLEtBQUssWUFBWSxHQUFHO1FBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTO1FBQUUsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUM1QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQy9DLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQztRQUFFLElBQUksR0FBRyxTQUFTLENBQUM7U0FDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsSUFBSSxHQUFH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