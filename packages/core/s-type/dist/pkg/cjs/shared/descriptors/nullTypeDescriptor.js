"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              nullTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "null" with some utilities methods like "is", "cast", etc...
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
    name: 'Null',
    id: 'null',
    is: (value) => value === null,
    cast: (value) => {
        return null;
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJO0lBQ2xDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsVUFBVSxDQUFDIn0=