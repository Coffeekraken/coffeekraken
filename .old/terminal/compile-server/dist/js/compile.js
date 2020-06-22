"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _js = _interopRequireDefault(require("./compile/js"));

var _sass = _interopRequireDefault(require("./compile/sass"));

var _stylus = _interopRequireDefault(require("./compile/stylus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      compile
 * @namespace       compile-server
 * @type        Function
 *
 * Compile some code
 *
 * @param 		{String} 			code 			The code to compile
 * @param 		{String} 			language 		The language of the code to compile like. (sass,scss,js,javascript,coffee,coffeescript,typescript,ts,stylus,styl)
 * @param 		{Object} 			[options={}] 	Some option to pass to the according compilation package bellow. (sass,scss = node-sass / js,coffee,ts = webpack with loaders / stylus = stylus)
 *
 * @example 		js
 * const compileServer = require('@coffeekraken/compile-server');
 * compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 *  	// do something here...
 * });
 *
 * @author  	Olivier Bossel <olivier.bossel@gmail.com>
 */
function compile(code, language, options = {}) {
  return new Promise((resolve, reject) => {
    switch (language) {
      case 'sass':
      case 'scss':
        resolve((0, _sass.default)(code, language, options));
        break;

      case 'js':
      case 'javascript':
      case 'coffee':
      case 'coffeescript':
      case 'typescript':
      case 'ts':
        resolve((0, _js.default)(code, language, options));
        break;

      case 'stylus':
      case 'styl':
        resolve((0, _stylus.default)(code, language, options));
        break;

      default:
        resolve(code);
        break;
    }
  });
}

module.exports = exports.default;