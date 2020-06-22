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
	apiUrl : 'http://localhost:4000',
	queryString : ''
}
export default settings;
