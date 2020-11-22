"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sprintf_js_1 = require("sprintf-js");
/**
 * @name        printf
 * @namespace           sugar.js.string
 * @type      Function
 *
 * printf php equavalent
 *
 * @param 		{String} 						source 			The source in which to replace the tokens
 * @param 		{Miyed} 			values... 			  Any number of arguments to replace the placeholders in the string
 * @return 	{String} 										The resulting string
 *
 * @example     js
 * import printf from '@coffeekraken/sugar/js/string/printf';
 * printf('Hello %s', 'world'); // => Hello world
 * printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _printf(...args) {
    return sprintf_js_1.default.sprintf.apply(null, args);
}
exports.default = _printf;
