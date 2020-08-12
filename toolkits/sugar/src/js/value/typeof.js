import __deepMerge from '../object/deepMerge';
import __isInt from '../is/integer';
import __isClass from '../is/class';
import __upperFirst from '../string/upperFirst';

/**
 * @name          typeof
 * @namespace          js.value
 * @type          Function
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function typeOf(value, settings = {}) {
  settings = __deepMerge(
    {
      of: false,
      format: 'String',
      customClass: true
    },
    settings
  );

  // get the real type
  let type,
    resultObj = {};
  if (Array.isArray(value)) type = 'Array';
  else if (value === null) type = 'Null';
  else if (value === undefined) type = 'Undefined';
  else if (typeof value === 'string') type = 'String';
  else if (__isInt(value)) type = 'Integer';
  else if (typeof value === 'number') type = 'Number';
  else if (typeof value === 'boolean') type = 'Boolean';
  else if (value instanceof RegExp) type = 'RegExp';
  else if (settings.customClass && __isClass(value) && value.name) {
    type = __upperFirst(value.name);
  } else if (
    settings.customClass &&
    value.constructor &&
    value.constructor.name
  ) {
    type = __upperFirst(value.constructor.name);
  } else if (typeof value === 'function') type = 'Function';
  else if (typeof value === 'object') type = 'Object';
  else type = 'Unknown';

  // save the type in the resultObj
  resultObj.type = type;

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
  if (settings.of && avoidTypes.indexOf(type) === -1) {
    const loopOn = Array.isArray(value)
      ? [...value.keys()]
      : Object.keys(value);
    const receivedTypes = [];
    loopOn.forEach((valueIndex) => {
      const valueToCheck = value[valueIndex];
      const typeObj = typeOf(valueToCheck, {
        format: 'Object',
        of: false,
        customClass: settings.customClass
      });
      if (receivedTypes.indexOf(typeObj.type) === -1) {
        receivedTypes.push(typeObj.type);
      }
    });
    // save the "of" types in the result obj
    resultObj.of = receivedTypes;
  }

  // return the result in the asked format
  switch (settings.format.toLowerCase()) {
    case 'object':
      return resultObj;
      break;
    case 'string':
    default:
      if (settings.of && resultObj.of && resultObj.of.length) {
        return `${resultObj.type}${
          resultObj.of ? `<${resultObj.of.join('|')}>` : ''
        }`;
      } else {
        return `${resultObj.type}`;
      }
      break;
  }
}
