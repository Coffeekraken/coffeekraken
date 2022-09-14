"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_cyclic_1 = require("json-cyclic");
/**
 * @name          decycle
 * @namespace            shared.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This method simply remove the circular references in the passed object
 *
 * @param     {Object}      obj         The object to process
 * @return    {Object}                  The new object circular references free
 *
 * @example     js
 * import { __decycle } from '@coffeekraken/sugar/object';
 * __decycle({
 *    something: 'cool',
 *    with: 'circular references',
 *    //..
 * });
 *
 * @see         https://www.npmjs.com/package/json-cyclic
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function decycle(obj) {
    return (0, json_cyclic_1.decycle)(obj);
}
exports.default = decycle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixPQUFPLENBQUMsR0FBRztJQUMvQixPQUFPLElBQUEscUJBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRkQsMEJBRUMifQ==