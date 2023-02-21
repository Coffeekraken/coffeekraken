"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
/**
 * @name              classTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "class" with some utilities methods like "is", "cast", etc...
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
    name: 'Class',
    id: 'class',
    is: (value) => (0, is_1.__isClass)(value),
    cast: (value) => {
        return new Error(`Sorry but nothing is castable to a Class`);
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUVULCtDQUFtRDtBQUduRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsT0FBTztJQUNiLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFBLGNBQVMsRUFBQyxLQUFLLENBQUM7SUFDcEMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsT0FBTyxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=