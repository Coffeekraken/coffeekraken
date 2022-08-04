// shared
/**
 * @name              mapTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "set" with some utilities methods like "is", "cast", etc...
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
    name: 'Set',
    id: 'set',
    is: (value) => value instanceof Set,
    cast: (value) => {
        if (value instanceof Set)
            return value;
        const set = new Set();
        set.add(value);
        return set;
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxLQUFLO0lBQ1gsRUFBRSxFQUFFLEtBQUs7SUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxHQUFHO0lBQ3hDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2pCLElBQUksS0FBSyxZQUFZLEdBQUc7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN2QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==