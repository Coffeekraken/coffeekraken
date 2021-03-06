import __settings from './settings';
import __extend from 'lodash/extend';

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
export default function setup(settings = {}) {
	__extend(__settings, settings);
}
