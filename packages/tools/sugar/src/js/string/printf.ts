// @ts-nocheck
// @shared

import __sprintf from 'sprintf-js';

/**
 * @name        printf
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * printf php equavalent
 *
 * @param 		{String} 						source 			The source in which to replace the tokens
 * @param 		{Miyed} 			values... 			  Any number of arguments to replace the placeholders in the string
 * @return 	{String} 										The resulting string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import printf from '@coffeekraken/sugar/js/string/printf';
 * printf('Hello %s', 'world'); // => Hello world
 * printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _printf(...args) {
  return __sprintf.sprintf.apply(null, args);
}
export default _printf;
