"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTypeDefinitionString;

var _upperFirst = _interopRequireDefault(require("../../string/upperFirst"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              parseTypeDefinitionString
 * @namespace           js.validation.utils
 * @type              Function
 *
 * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
 *
 * @param       {String}        argTypeString         The argument type definition string
 * @return      {Object}                              The argument type definition string in object format
 *
 * @example       js
 * import parseTypeDefinitionString from '@coffeekraken/sugar/js/parse/parseTypeDefinitionString';
 * parseTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
 * parseTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseTypeDefinitionString(argTypeString) {
  // split the string by |
  var inDepth = 0;
  var currentPart = '',
      typesArray = [];
  argTypeString.split('').forEach(character => {
    if (character === '>') {
      if (inDepth <= 0) {
        throw new Error("It seems that your argument type definition string \"".concat(argTypeString, "\" is invalid..."));
      }

      inDepth--;
      currentPart += character;
      return;
    }

    if (character === '<') {
      inDepth++;
      currentPart += character;
      return;
    }

    if (character === '|') {
      if (inDepth > 0) {
        currentPart += character;
        return;
      }

      typesArray.push(currentPart);
      currentPart = '';
      return;
    }

    currentPart += character;
  });
  typesArray.push(currentPart); // init the return array

  var returnArray = []; // loop on each types array

  typesArray.forEach(typeDefinitionString => {
    // split the string by <
    var parts = typeDefinitionString.split('<'); // get the "type"

    var type = (0, _upperFirst.default)(parts[0]); // process the "of" part if exist

    var ofArray = null;

    if (parts[1]) {
      var ofPart = parts[1].slice(0, -1);
      ofArray = parseTypeDefinitionString(ofPart);
    } // build the type object and add it the the returnArray


    returnArray.push({
      type,
      of: ofArray
    });
  });
  return returnArray;
}

module.exports = exports.default;