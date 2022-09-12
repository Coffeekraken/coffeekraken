"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sprintf_js_1 = __importDefault(require("sprintf-js"));
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
function __printf(...args) {
    return sprintf_js_1.default.sprintf.apply(null, args);
}
exports.default = __printf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEdBQUcsSUFBSTtJQUNwQyxPQUFPLG9CQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUZELDJCQUVDIn0=