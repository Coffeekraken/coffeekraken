"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = env;

var _node = _interopRequireDefault(require("../is/node"));

var _get = _interopRequireDefault(require("../object/get"));

var _set = _interopRequireDefault(require("../object/set"));

var _delete = _interopRequireDefault(require("../object/delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                    env
 * @namespace               sugar.js.dev
 * @type                    Function
 * 
 * This function allows you to access environment variables through the same method in node and javascript
 * 
 * @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
 * @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
 * @return          {Mixed}                           The variable value
 * 
 * @example         js
 * import env from '@coffeekraken/sugar/js/dev/env';
 * console.log(env('node_env')); // => production
 * env('something.cool', { hello: 'world' });
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function env(dotPath, value) {
  if (!(0, _node.default)()) {
    if (!window.process) window.process = {};
    if (!window.process.env) window.process.env = {};
  }

  const targetObj = (0, _node.default)() ? global.process.env : window.process.env;

  if (value === null) {
    // delete the variable
    (0, _delete.default)(targetObj, dotPath.toUpperCase());
  } else if (value !== undefined) {
    (0, _set.default)(targetObj, dotPath.toUpperCase(), value);
  } // return the variable value


  return (0, _get.default)(targetObj, dotPath.toUpperCase());
}

module.exports = exports.default;