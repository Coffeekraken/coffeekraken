"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compile = _interopRequireDefault(require("./compile"));

var _setup = _interopRequireDefault(require("./setup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name  	compileServer
 * @namespace       compile-server
 * @type      Object
 *
 * Expose the compile server API
 * ### Available functions
 * - ```setup``` : Setup the compile server JS api
 * - ```compile``` : Send some code to the compile server and get the response easily
 *
 * @example 		js
 * compileServer.setup({
 *  	// some options here...
 * });
 * compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 *  	// do something here...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
const api = {
  setup: _setup.default,
  compile: _compile.default
};
var _default = api;
exports.default = _default;
module.exports = exports.default;