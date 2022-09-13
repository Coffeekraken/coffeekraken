// shared
import { __isString } from '@coffeekraken/sugar/is';
import { __toString } from '@coffeekraken/sugar/string';
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
    is: (value) => __isString(value),
    cast: (value) => __toString(value, {
        beautify: true,
    }),
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLFFBQVE7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNyQyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUNqQixVQUFVLENBQUMsS0FBSyxFQUFFO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakIsQ0FBQztDQUNULENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9