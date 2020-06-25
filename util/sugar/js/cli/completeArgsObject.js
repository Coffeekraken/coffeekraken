"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = completeArgsObject;

var _get = _interopRequireDefault(require("../object/get"));

var _set = _interopRequireDefault(require("../object/set"));

var _deepMap = _interopRequireDefault(require("../object/deepMap"));

var _validateWithDefinitionObject = _interopRequireDefault(require("./validateWithDefinitionObject"));

var _deepize = _interopRequireDefault(require("../object/deepize"));

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
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
function completeArgsObject(argsObj, definitionObj) {
  argsObj = Object.assign({}, argsObj); // loop on all the arguments

  Object.keys(definitionObj).forEach(argString => {
    const argDefinitionObj = definitionObj[argString]; // check if we have an argument passed in the properties

    if (argsObj[argString] === undefined && argDefinitionObj.default !== undefined) {
      argsObj[argString] = argDefinitionObj.default;
    }
  }); // make sure all is ok

  const argsValidationResult = (0, _validateWithDefinitionObject.default)(argsObj, definitionObj);
  if (argsValidationResult !== true) throw new Error(argsValidationResult); // return the argsObj

  return (0, _deepize.default)(argsObj);
}

module.exports = exports.default;