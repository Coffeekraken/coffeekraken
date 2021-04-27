// shared
/**
 * @name              symbolTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "symbol" with some utilities methods like "is", "cast", etc...
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
    name: 'Symbol',
    id: 'symbol',
    is: (value) => typeof value === 'symbol',
    cast: (value) => {
        if (typeof value === 'symbol')
            return value;
        return Symbol(value);
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9sVHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL2Rlc2NyaXB0b3JzL3N5bWJvbFR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxRQUFRO0lBQ2QsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7SUFDN0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUMsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9