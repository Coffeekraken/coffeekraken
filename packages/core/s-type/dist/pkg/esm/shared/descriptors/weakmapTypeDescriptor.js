// shared
/**
 * @name              weakmapTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
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
    name: 'WeakMap',
    id: 'weakmap',
    is: (value) => value instanceof WeakMap,
    cast: (value) => {
        return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsU0FBUztJQUNmLEVBQUUsRUFBRSxTQUFTO0lBQ2IsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksT0FBTztJQUM1QyxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRTtRQUNqQixPQUFPLElBQUksS0FBSyxDQUNaLHNEQUFzRCxDQUN6RCxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9