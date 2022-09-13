"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
/**
 * @name              classTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUVULCtDQUFtRDtBQUduRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxPQUFPO0lBQ2IsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLElBQUEsY0FBUyxFQUFDLEtBQUssQ0FBQztJQUNwQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixPQUFPLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7SUFDakUsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxVQUFVLENBQUMifQ==