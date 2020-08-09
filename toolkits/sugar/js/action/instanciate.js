"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = instanciate;

var _typeMap = _interopRequireDefault(require("./typeMap"));

var _get = _interopRequireDefault(require("../object/get"));

var _flatten = _interopRequireDefault(require("../object/flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            instanciate
 * @type            Function
 * @static
 *
 * This static method simply take an action descriptor object, instanciate
 * an action object from the corresponding class and return this instance.
 *
 * @param       {Object}      actionObj         The action object that MUST have at least an ```type``` property, an ```descriptor``` one and optionaly a ```settings``` one.
 * @return      {SAction}                       The instanciated SAction object
 *
 * @example       js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * const myInstance = instanciate({
 *    type: 'url',
 *    descriptor: {
 *      url: 'https://google.com',
 *      target: '_popup'
 *    },
 *    settings: {}
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function instanciate(actionObj) {
  if (!actionObj.type) {
    throw new Error("instanciate: The actionObj parameter MUST have a <cyan>type</cyan> property...");
  }

  if (!actionObj.descriptorObj) {
    throw new Error("instanciate: The actionObj parameter MUST have a <cyan>descriptorObj</cyan> property of type Object...");
  }

  var cls = (0, _get.default)(_typeMap.default, actionObj.type);

  if (!cls) {
    throw new Error("instanciate: Your passed \"type\" is not valid and must be one of those: ".concat(Object.keys((0, _flatten.default)(_typeMap.default)).join(', '), "..."));
  } // instanciate the object


  var instance = new cls(actionObj.descriptorObj, actionObj.settings || {});
  return instance;
}

module.exports = exports.default;