// shared
import __isObject from '@coffeekraken/sugar/shared/is/object';
/**
 * @name              objectTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "object" with some utilities methods like "is", "cast", etc...
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
    name: 'Object',
    id: 'object',
    is: (value) => __isObject(value),
    cast: (value) => {
        if (__isObject(value))
            return value;
        return {
            value,
        };
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUs5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxRQUFRO0lBQ2QsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDckMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDcEMsT0FBTztZQUNILEtBQUs7U0FDUixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9