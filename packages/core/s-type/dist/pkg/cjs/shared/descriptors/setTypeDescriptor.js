"use strict";
// shared
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTOztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDakMsSUFBSSxFQUFFLEtBQUs7SUFDWCxFQUFFLEVBQUUsS0FBSztJQUNULEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLEdBQUc7SUFDeEMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsSUFBSSxLQUFLLFlBQVksR0FBRztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3ZDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxVQUFVLENBQUMifQ==