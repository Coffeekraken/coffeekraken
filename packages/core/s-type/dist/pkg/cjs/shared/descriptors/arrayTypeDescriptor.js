"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLE9BQU87SUFDYixFQUFFLEVBQUUsT0FBTztJQUNYLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1FBQ2Ysc0RBQXNEO1FBQ3RELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLFNBQWMsRUFBRSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUV0QixJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxLQUFLLEtBQUssSUFBSTtnQkFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQy9CLEtBQUssR0FBRyxLQUFLO2lCQUNSLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzNELE1BQU0sQ0FDSCxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ0YsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDN0QsQ0FBQztTQUNUO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9