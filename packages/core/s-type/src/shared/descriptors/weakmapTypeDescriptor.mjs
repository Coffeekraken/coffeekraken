// shared
/**
 * @name              weakmapTypeDescriptor
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const descriptor = {
    name: 'WeakMap',
    id: 'weakmap',
    is: (value) => value instanceof WeakMap,
    cast: (value) => {
        return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vha21hcFR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9kZXNjcmlwdG9ycy93ZWFrbWFwVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLFNBQVM7SUFDZixFQUFFLEVBQUUsU0FBUztJQUNiLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLE9BQU87SUFDNUMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsT0FBTyxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0lBQzNFLENBQUM7Q0FDRixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==