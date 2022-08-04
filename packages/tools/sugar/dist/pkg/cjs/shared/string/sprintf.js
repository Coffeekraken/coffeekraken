"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const sprintf_js_1 = require("sprintf-js");
/**
 * @name        sprintf
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Javascript implementation of the sprintf php function.
 * >For more infos, check [this github repository](https://github.com/alexei/sprintf.js)
 *
 * @param    {String}    format    The format of the string wanted as output
 * @param    {Mixed}    ...replacements    The replacement tokens to apply to the string
 * @return    {String}    The processed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import sprintf from '@coffeekraken/sugar/js/string/sprintf'
 * sprintf('Hello %s', 'world') // Hello World
 * const user = { name: 'Dolly' }
 * sprintf('Hello %(name)s', user) // Hello Dolly
 *
 * @see    https://github.com/alexei/sprintf.js
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sprintf() {
    return sprintf_js_1.sprintf.apply(this, arguments);
}
exports.default = sprintf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLDJDQUFpRDtBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsT0FBTztJQUNaLE9BQU8sb0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFDRCxrQkFBZSxPQUFPLENBQUMifQ==