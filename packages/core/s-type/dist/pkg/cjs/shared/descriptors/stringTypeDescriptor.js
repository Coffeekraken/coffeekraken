"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name              stringTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
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
    is: (value) => (0, is_1.__isString)(value),
    cast: (value) => (0, string_1.__toString)(value, {
        beautify: true,
    }),
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUVULCtDQUFvRDtBQUNwRCx1REFBd0Q7QUFHeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsUUFBUTtJQUNkLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFBLGVBQVUsRUFBQyxLQUFLLENBQUM7SUFDckMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDakIsSUFBQSxtQkFBVSxFQUFDLEtBQUssRUFBRTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCLENBQUM7Q0FDVCxDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=