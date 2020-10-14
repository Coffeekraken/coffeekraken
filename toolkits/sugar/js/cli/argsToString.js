"use strict";

var _toString = _interopRequireDefault(require("../string/toString"));

var _parseArgs = _interopRequireDefault(require("./parseArgs"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 *
 * This function take a simple object, a definitionObj object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definitionObj object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to use the aliases or not in the generated command
 * - definitionObj (null) {Object}: Specify a definition object to use
 * @todo            check documentation
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
 *    definitionObj: {
 *      arg1: {
 *        type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO: support deep object structure
// TODO: support required args
module.exports = function argsToString(args, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = (0, _deepMerge.default)({
    definitionObj: null,
    includeAllArgs: true,
    alias: true
  }, settings);

  if (typeof args === 'string') {
    args = (0, _parseArgs.default)(args, {
      definitionObj: settings.definitionObj
    });
  }

  if (!settings.definitionObj) {
    var string = '';
    Object.keys(args).forEach(key => {
      string += " --".concat(key, " ").concat((0, _toString.default)(args[key]));
    });
    return string;
  }

  var cliArray = []; // loop on passed args

  Object.keys(settings.definitionObj).forEach(argName => {
    var defObj = settings.definitionObj[argName];
    if (!defObj) return;
    if (!settings.includeAllArgs && args[argName] === undefined) return;
    var prefix = defObj.alias && settings.alias ? "-".concat(defObj.alias) : "--".concat(argName);
    var value;
    if (args && args[argName] !== undefined) value = args[argName];else if (settings.definitionObj[argName] && settings.definitionObj[argName].default) value = settings.definitionObj[argName].default;

    if (value === undefined || value === null // || (defObj.type.toLowerCase() === 'boolean' && value === false)
    ) {
        return;
      }

    value = (0, _toString.default)(value);
    if (defObj.type.toLowerCase() === 'string') value = "\"".concat(value, "\""); // if (defObj.type.toLowerCase() === 'boolean') value = '';

    if (defObj.type.toLowerCase().includes('object') || defObj.type.toLowerCase().includes('array')) {
      value = "\"".concat(value.split('"').join("'"), "\"");
    }

    cliArray.push("".concat(prefix, " ").concat(value));
  });
  return cliArray.join(' ');
};