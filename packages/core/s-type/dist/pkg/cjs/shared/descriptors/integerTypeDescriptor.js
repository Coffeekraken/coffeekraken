"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name              integerTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
 *
 * Describe the type "integer" with some utilities methods like "is", "cast", etc...
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
    name: 'Integer',
    id: 'integer',
    is: (value) => Number.isInteger(value),
    cast: (value) => {
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`);
        }
        // @ts-ignore
        const res = parseInt(value);
        if (isNaN(res))
            return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
        return res;
    },
};
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxTQUFTO0lBQ2YsRUFBRSxFQUFFLFNBQVM7SUFDYixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzNDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUN4RCxPQUFPLElBQUksS0FBSyxDQUNaLGlGQUFpRixLQUFLLEVBQUUsQ0FDM0YsQ0FBQztTQUNMO1FBQ0QsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDVixPQUFPLElBQUksS0FBSyxDQUNaLHdDQUF3QyxLQUFLLHlEQUF5RCxDQUN6RyxDQUFDO1FBQ04sT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9