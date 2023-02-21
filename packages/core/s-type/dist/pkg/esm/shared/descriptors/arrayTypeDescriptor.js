// shared
/**
 * @name              arrayTypeDescriptor
 * @namespace         shared.descriptors
 * @type              ISTypeDescriptor
 * @platform            node
 * @platform            js
 * @status              beta
 * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sVUFBVSxHQUFxQjtJQUNqQyxJQUFJLEVBQUUsT0FBTztJQUNiLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDZixzREFBc0Q7UUFDdEQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQyxLQUFVLEVBQUUsU0FBYyxFQUFFLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXRCLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2RCxJQUFJLEtBQUssS0FBSyxJQUFJO2dCQUFFLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDL0IsS0FBSyxHQUFHLEtBQUs7aUJBQ1IsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDM0QsTUFBTSxDQUNILENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDRixDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUM3RCxDQUFDO1NBQ1Q7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==