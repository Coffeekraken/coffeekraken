"use strict";

var _toString = _interopRequireDefault(require("../string/toString"));

var _parseArgs = _interopRequireDefault(require("./parseArgs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  argsToString
 * @namespace           js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}        [definitionObj=null]    The definitionObj object that has to be formated like so:
 * - argName: The argument name to describe
 *    - type: The type of the value supported
 *    - alias: The alias of the full name like "t", "l", etc...
 *    - default: The default value if nothing is specified
 *    - regexp: A regexp that is used to validate the passed value
 *    - validator: A function to validate the passed value. Has to return true or false
 * @param       {Boolean}     [includeAllArgs = true]       Specify if you want all the arguments in the definitionObj object in your command line string, or if you just want the one passed in your argsObj argument
 *
 * @todo            check documentation
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
 *    arg1: {
 *      type: 'String',
 *      alias: 'a',
 *      default: 'Plop'
 *    },
 *    myOtherArg: {
 *      type: 'String'
 *    },
 *    lastArg: {
 *      type: 'String',
 *      alias: 'l',
 *      default: 'Nelson'
 *    }
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO: support deep object structure
// TODO: support required args
module.exports = function argsToString(args, definitionObj, includeAllArgs) {
  if (definitionObj === void 0) {
    definitionObj = null;
  }

  if (includeAllArgs === void 0) {
    includeAllArgs = true;
  }

  if (typeof args === 'string') {
    args = (0, _parseArgs.default)(args, definitionObj);
  }

  if (!definitionObj) {
    var string = '';
    Object.keys(args).forEach(key => {
      string += " --".concat(key, " ").concat((0, _toString.default)(args[key]));
    });
    return string;
  }

  var cliArray = []; // loop on passed args

  Object.keys(definitionObj).forEach(argName => {
    var defObj = definitionObj[argName];
    if (!defObj) return;
    if (!includeAllArgs && args[argName] === undefined) return;
    var prefix = defObj.alias ? "-".concat(defObj.alias) : "--".concat(argName);
    var value;
    if (args && args[argName] !== undefined) value = args[argName];else if (definitionObj[argName] && definitionObj[argName].default) value = definitionObj[argName].default;

    if (value === undefined || value === null || defObj.type.toLowerCase() === 'boolean' && value === false) {
      return;
    }

    value = (0, _toString.default)(value);
    if (defObj.type.toLowerCase() === 'string') value = "\"".concat(value, "\"");
    if (defObj.type.toLowerCase() === 'boolean') value = '';

    if (defObj.type.toLowerCase().includes('object') || defObj.type.toLowerCase().includes('array')) {
      value = "\"".concat(value.split('"').join("'"), "\"");
    }

    cliArray.push("".concat(prefix, " ").concat(value));
  });
  return cliArray.join(' ');
};