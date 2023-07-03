"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name              stringTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "string" with some utilities methods like "is", "cast", etc...
 *
 * @example         js
 * export default {
 *    name: 'String',
 *    id: 'string',
 *    is: (value) => typeof value === 'string',
 *    cast: (value) => '' + value,
 *    // etc...
 * };
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const descriptor = {
    name: 'String',
    id: 'string',
    is: (value) => {
        return (0, is_1.__isString)(value);
    },
    cast: (value) => (0, string_1.__toString)(value, {
        beautify: true,
    }),
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUVULCtDQUFvRDtBQUNwRCx1REFBd0Q7QUFHeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2YsT0FBTyxJQUFBLGVBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDakIsSUFBQSxtQkFBVSxFQUFDLEtBQUssRUFBRTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCLENBQUM7Q0FDVCxDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=