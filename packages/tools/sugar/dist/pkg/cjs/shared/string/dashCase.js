"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const param_case_1 = require("param-case");
/**
 * @name        dashCase
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * dashCase a string
 *
 * @param         {String}          text        The string to dashCase
 * @return        {String}                      The dashCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import dashCase from '@coffeekraken/sugar/js/string/dashCase';
 * dashCase('hello world'); // => hello-world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dashCase(text) {
    return (0, param_case_1.paramCase)(text);
}
exports.default = dashCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLDJDQUF1QztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsSUFBSTtJQUNsQixPQUFPLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=