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

var _typeof = _interopRequireDefault(require("../value/typeof"));

var _typeDefinitionArrayObjectToString = _interopRequireDefault(require("../value/typeDefinitionArrayObjectToString"));

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
 * @return      {B|Object}  N                  true if She value pBss the Sest, aF object with two sub-objects describing the issue. 1 names "expected" and the othet names "received"
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => { expected: { type: 'Array<String>' }, received: { type: 'Array<String|Boolean>' }}
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition) {
  let definitionArray = argTypeDefinition; // parsing the argument definition string

  if (typeof argTypeDefinition === 'string') {
    definitionArray = (0, _argumentTypeDefinitionString.default)(argTypeDefinition);
  }

  const typeOfValue = (0, _typeof.default)(value);
  const issueObj = {
    received: {
      type: (0, _typeof.default)(value, {
        of: true
      }),
      value
    },
    expected: {
      type: (0, _typeDefinitionArrayObjectToString.default)(definitionArray)
    },
    issues: ['type']
  };

  for (let i = 0; i < definitionArray.length; i++) {
    const definitionObj = definitionArray[i]; // if ((value === null || value === undefined) && definitionObj.type) {
    //   issueObj.received.type = __typeof(value);
    // }
    // Array | Object

    if (definitionObj.type === 'Array' || definitionObj.type === 'Object') {
      // Array
      if (definitionObj.type === 'Array') {
        // make sure the value is an array
        if (typeOfValue === 'Array' && !definitionObj.of) return true; // Object
      } else if (definitionObj.type === 'Object') {
        if (typeOfValue === 'Object' && !definitionObj.of) return true;
      }

      if (definitionObj.of) {
        const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
        let checkValuesResult = true;
        const receivedTypes = [];
        loopOn.forEach(valueIndex => {
          const valueToCheck = value[valueIndex];

          if (ofType(valueToCheck, definitionObj.of) !== true) {
            checkValuesResult = false;
          }

          const typeString = (0, _typeof.default)(valueToCheck);

          if (receivedTypes.indexOf(typeString) === -1) {
            receivedTypes.push(typeString);
          }
        });
        if (checkValuesResult) return true; // if (!checkValuesResult) {
        //   issueObj.received.type = `${typeOfValue}<${receivedTypes.join('|')}>`;
        // }
      }
    } // Class
    else if (definitionObj.type === 'Class') {
        if ((0, _class.default)(value)) return true;
      } // Integer
      else if (definitionObj.type === 'Int' || definitionObj.type === 'Integer') {
          if ((0, _integer.default)(value)) return true;
        } // check default types
        else if (['Boolean', 'Number', 'String', 'Bigint', 'Symbol', 'Function'].indexOf(definitionObj.type) !== -1) {
            if (definitionObj.type === 'Number') {
              const type = typeOfValue;
              if (type === 'Number' || type === 'Integer') return true;
            } else {
              if (typeOfValue === definitionObj.type) return true;
            }
          } // check for "custom" types
          else if ((0, _class.default)(value) && value.name) {
              if (definitionObj.type === value.name) return true;
            } else if (value && value.constructor && value.constructor.name) {
              if (definitionObj.type === value.constructor.name) return true;
            }
  }

  return issueObj;
}

module.exports = exports.default;