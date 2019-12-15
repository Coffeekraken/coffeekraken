"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setup;

var _settings = _interopRequireDefault(require("./settings"));

var _extend = _interopRequireDefault(require("lodash/extend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        setup
 * @namespace       compile-server
 * @type      Function
 *
 * Setup the compiler
 * @param 		{Object} 		[settings={}] 			The new settings
 *
 * @example 	js
 * // possible settings
 * compileServer.setup({
 * 		// the api base url
 * 		apiUrl : 'http://localhost:4000',
 * 		// a queryString to append to each request
 * 		queryString : 'myVar=hello&myOtherVar=world'
 * });
 *
 * @author  	Olivier Bossel <olivier.bossel@gmail.com>
 */
function setup(settings = {}) {
  (0, _extend.default)(_settings.default, settings);
}

module.exports = exports.default;