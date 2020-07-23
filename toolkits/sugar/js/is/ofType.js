"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ofType;

var _argumentTypeDefinitionString = _interopRequireDefault(require("../parse/argumentTypeDefinitionString"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _class = _interopRequireDefault(require("./class"));

var _integer = _interopRequireDefault(require("./integer"));

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              ofType
 * @namespace           js.is
 * @type              Function
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @param       {Boolean}       [returnError=false]       Specify if you want the error string to be returned  in place of the simply false boolean
 * @return      {Boolean}                     true if the value pass the test, false if not
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => false
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition, returnError = false) {
  let definitionArray = argTypeDefinition; // parsing the argument definition string

  if (typeof argTypeDefinition === 'string') {
    definitionArray = (0, _argumentTypeDefinitionString.default)(argTypeDefinition);
  }

  let error = '';

  for (let i = 0; i < definitionArray.length; i++) {
    const definitionObj = definitionArray[i]; // check array

    if (definitionObj.type === 'array') {
      // make sure the value is an array
      if (Array.isArray(value) && !definitionObj.of) return true;else if (Array.isArray(value) && definitionObj.of) {} else error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be an <green>Array</green>...`;
    } // check object


    if (definitionObj.type === 'object') {
      if (typeof value === 'object' && !definitionObj.of) return true;else if (typeof value === 'object' && definitionObj.of) {} else error = `Regarding to theargument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be an <green>Object</green>...`;
    } // check if need to check the childs


    if (definitionObj.of && definitionObj.of.length) {
      if (definitionObj.type === 'array' || definitionObj.type === 'object') {
        const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
        let checkValuesResult = true;
        loopOn.forEach(valueIndex => {
          if (!checkValuesResult) return;
          const valueToCheck = value[valueIndex];

          if (!ofType(valueToCheck, definitionObj.of, false)) {
            checkValuesResult = false;
            let ofTypesArray = [];
            definitionObj.of.forEach(o => {
              ofTypesArray.push(o.type);
            });
            error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<yellow>${(0, _toString.default)(value)}</yellow>" of type "<magenta>${typeof value}</magenta>" has to contain only "<green>${ofTypesArray.join(',')}</green>"...`;
          }
        }); // if one of the values does not correspond to the definition object, return false

        if (!checkValuesResult) {
          return returnError ? error || false : false;
        }
      }
    } // check "class"


    if (definitionObj.type === 'class') {
      if ((0, _class.default)(value)) return true;else error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be a <green>Class</green>...`;
    } // check if is an integer


    if (definitionObj.type === 'int' || definitionObj.type === 'integer') {
      if ((0, _integer.default)(value)) return true;
      error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be a <green>Integer</green>...`;
    } // check default types


    if (['boolean', 'number', 'string', 'bigint', 'symbol', 'function'].indexOf(definitionObj.type) !== -1 && typeof value === definitionObj.type) {
      return true;
    } else {
      error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be a <green>${(0, _upperFirst.default)(definitionObj.type)}</green>...`;
    } // check for "custom" types


    if ((0, _class.default)(value) && value.name) {
      if (definitionObj.type === value.name.toLowerCase()) return true;else error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be a <green>${(0, _upperFirst.default)(definitionObj.type)}</green>...`;
    } else if (value && value.constructor && value.constructor.name) {
      if (definitionObj.type === value.constructor.name.toLowerCase()) return true;else error = `Regarding to the argument definition "<yellow>${argTypeDefinition}</yellow>", the passed value "<cyan>${(0, _toString.default)(value)}</cyan>" of type "<magenta>${typeof value}</magenta>" has to be a <green>${(0, _upperFirst.default)(definitionObj.type)}</green>...`;
    }
  }

  return returnError ? error || false : false;
}

module.exports = exports.default;