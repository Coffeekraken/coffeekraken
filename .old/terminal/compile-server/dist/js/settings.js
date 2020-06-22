"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name  	settings
 * @namespace       compile-server
 * @type        Object
 *
 * Describe the available settings
 *
 * @example 	js
 * // available settings
 * {
 * 	// the api base url
 * 	apiUrl : 'http://localhost:4000',
 * 	// a queryString to append to each request
 * 	queryString : 'myVar=hello&myOtherVar=world'
 * }
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
let settings = {
  apiUrl: 'http://localhost:4000',
  queryString: ''
};
var _default = settings;
exports.default = _default;
module.exports = exports.default;