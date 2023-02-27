// @ts-nocheck

import __sprintf from 'sprintf-js';

/**
 * @name        printf
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @snippet         __printf($1)
 * 
 * @example     js
 * import { __printf } from '@coffeekraken/sugar/string';
 * __printf('Hello %s', 'world'); // => Hello world
 * __printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * __printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __printf(...args) {
    return __sprintf.sprintf.apply(null, args);
}
