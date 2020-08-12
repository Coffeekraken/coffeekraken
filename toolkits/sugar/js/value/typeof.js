"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeOf;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _integer = _interopRequireDefault(require("../is/integer"));

var _class = _interopRequireDefault(require("../is/class"));

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function typeOf(value, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    of: false,
    format: 'String',
    customClass: true
  }, settings); // get the real type

  var type,
      resultObj = {};
  if (Array.isArray(value)) type = 'Array';else if (value === null) type = 'Null';else if (value === undefined) type = 'Undefined';else if (typeof value === 'string') type = 'String';else if ((0, _integer.default)(value)) type = 'Integer';else if (typeof value === 'number') type = 'Number';else if (typeof value === 'boolean') type = 'Boolean';else if (value instanceof RegExp) type = 'RegExp';else if (settings.customClass && (0, _class.default)(value) && value.name) {
    type = (0, _upperFirst.default)(value.name);
  } else if (settings.customClass && value.constructor && value.constructor.name) {
    type = (0, _upperFirst.default)(value.constructor.name);
  } else if (typeof value === 'function') type = 'Function';else if (typeof value === 'object') type = 'Object';else type = 'Unknown'; // save the type in the resultObj

  resultObj.type = type; // check if need to get the "child" types

  var avoidTypes = ['Null', 'Undefined', 'String', 'Integer', 'Number', 'Boolean', 'Unknown'];

  if (settings.of && avoidTypes.indexOf(type) === -1) {
    var loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
    var receivedTypes = [];
    loopOn.forEach(valueIndex => {
      var valueToCheck = value[valueIndex];
      var typeObj = typeOf(valueToCheck, {
        format: 'Object',
        of: false,
        customClass: settings.customClass
      });

      if (receivedTypes.indexOf(typeObj.type) === -1) {
        receivedTypes.push(typeObj.type);
      }
    }); // save the "of" types in the result obj

    resultObj.of = receivedTypes;
  } // return the result in the asked format


  switch (settings.format.toLowerCase()) {
    case 'object':
      return resultObj;
      break;

    case 'string':
    default:
      if (settings.of && resultObj.of && resultObj.of.length) {
        return "".concat(resultObj.type).concat(resultObj.of ? "<".concat(resultObj.of.join('|'), ">") : '');
      } else {
        return "".concat(resultObj.type);
      }

      break;
  }
}

module.exports = exports.default;