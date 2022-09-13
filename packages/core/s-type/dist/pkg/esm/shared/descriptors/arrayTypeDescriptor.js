// shared
/**
 * @name              arrayTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "array" with some utilities methods like "is", "cast", etc...
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
    name: 'Array',
    id: 'array',
    is: (value) => {
        // _console.log('CHeck', value, Array.isArray(value));
        return Array.isArray(value);
    },
    cast: (value, params = {}) => {
        if (!value)
            return [];
        if (params.splitChars && Array.isArray(params.splitChars)) {
            if (value === true)
                value = '';
            value = value
                .split(new RegExp(`(${params.splitChars.join('|')})`, 'gm'))
                .filter((l) => l.trim() !== '' && params.splitChars.indexOf(l) === -1);
        }
        if (Array.isArray(value))
            return value;
        return [value];
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxPQUFPO0lBQ2IsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNmLHNEQUFzRDtRQUN0RCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxTQUFjLEVBQUUsRUFBRSxFQUFFO1FBQ25DLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFdEIsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZELElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUMvQixLQUFLLEdBQUcsS0FBSztpQkFDUixLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMzRCxNQUFNLENBQ0gsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzdELENBQUM7U0FDVDtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9