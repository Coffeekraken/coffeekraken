// shared
import __isMap from '@coffeekraken/sugar/shared/is/map';
/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "map" with some utilities methods like "is", "cast", etc...
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
    name: 'Map',
    id: 'map',
    is: (value) => __isMap(value),
    cast: (value) => {
        if (__isMap(value))
            return value;
        const map = new Map();
        map.set('value', value);
        return map;
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLE9BQU8sTUFBTSxtQ0FBbUMsQ0FBQztBQUl4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxLQUFLO0lBQ1gsRUFBRSxFQUFFLEtBQUs7SUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDbEMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==