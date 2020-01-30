"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parse = _interopRequireDefault(require("./parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.string
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    arguments                   The arguments object description
 * @return            {Object}                                                The object of funded arguments
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 --help coco', {
 *    action: 'String -a --action',
 *    world: 'Integer -w --world',
 *    help: 'String -h --help'
 * });
 * // {
 * //   action: 'hello',
 * //   world: 10,
 * //   help: 'coco'
 * // }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (string, args) => {
  // split the string without the quotes
  const parts = string.match(/(('|").*?('|")|[^('|")\s]+)+(?=\s*|\s*$)/g); // init the resulting object

  const resultObject = {};
  let argsSettings = {};
  Object.keys(args).forEach(key => {
    const arg = args[key];
    let smallName, bigName, type; // parse the argument definition

    const argParts = arg.split(' '); // loop on the args parts

    for (let i = 0; i < argParts.length; i++) {
      const p = argParts[i];

      if (p.slice(0, 2) === '--') {
        bigName = p.slice(2);
      } else if (p.slice(0, 1) === '-' && p.length === 2) {
        smallName = p.slice(1);
      } else {
        type = p;
      }
    }

    argsSettings[key] = {
      smallName,
      bigName,
      type
    };
  }); // loop on the parts

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    let smallName, bigName;

    if (p.slice(0, 2) === '--') {
      bigName = p.slice(2);
    } else if (p.slice(0, 1) === '-' && p.length === 2) {
      smallName = p.slice(1);
    }

    for (let j = 0; j < Object.keys(argsSettings).length; j++) {
      const k = Object.keys(argsSettings)[j];

      if (resultObject[k] !== undefined) {
        delete argsSettings[k]; // console.log(argsSettings);

        break;
      }

      const set = argsSettings[k];

      if (smallName && set.smallName === smallName) {
        resultObject[k] = parts[i + 1];
        i++;
        delete argsSettings[k]; // console.log(argsSettings);

        break;
      }

      if (bigName && set.bigName === bigName) {
        resultObject[k] = parts[i + 1];
        i++;
        delete argsSettings[k]; // console.log(argsSettings);

        break;
      }

      const type = typeof (0, _parse.default)(p); // console.log(p, type.charAt(0).toUpperCase() + type.slice(1));

      if (type.charAt(0).toUpperCase() + type.slice(1) === set.type) {
        delete argsSettings[k]; // console.log(argsSettings);

        resultObject[k] = p;
        break;
      }
    }
  }

  return resultObject;
};

exports.default = _default;
module.exports = exports.default;