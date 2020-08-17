"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = completeArgsObject;

var _deepize = _interopRequireDefault(require("../object/deepize"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _validateCliObject = _interopRequireDefault(require("../validation/cli/validateCliObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                completeArgsObject
 * @namespace           js.cli
 * @type                Function
 *
 * This function take an arguments object and complete it with the definition object default values
 * for missing args
 *
 * @param             {Object}            argsObj         The arguments object to complete
 * @param             {Object}            definitionObj     The definition object to use
 * @param             {Object}            [settings={}]       An object of settings to configure your process:
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
function completeArgsObject(argsObj, definitionObj, settings) {
  if (settings === void 0) {
    settings = {};
  }

  argsObj = Object.assign({}, argsObj);
  settings = (0, _deepMerge.default)({
    throw: true
  }, settings); // loop on all the arguments

  Object.keys(definitionObj).forEach(argString => {
    var argDefinitionObj = definitionObj[argString]; // check if we have an argument passed in the properties

    if (argsObj[argString] === undefined && argDefinitionObj.default !== undefined) {
      argsObj[argString] = argDefinitionObj.default;
    }
  }); // make sure all is ok

  var argsValidationResult = (0, _validateCliObject.default)(argsObj, definitionObj, settings);
  if (argsValidationResult !== true && settings.throw) throw new Error((0, _toString.default)(argsValidationResult));else if (argsValidationResult !== true) return argsValidationResult; // return the argsObj

  return (0, _deepize.default)(argsObj);
}

module.exports = exports.default;