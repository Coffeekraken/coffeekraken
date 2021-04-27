// shared
/**
 * @name              bigintTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "bigint" with some utilities methods like "is", "cast", etc...
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
    name: 'Bigint',
    id: 'bigint',
    is: (value) => typeof value === 'bigint',
    cast: (value) => {
        if (typeof value === 'bigint')
            return value;
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
        }
        let res;
        try {
            res = BigInt(value);
        }
        catch (e) {
            res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
        }
        return res;
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnaW50VHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL2Rlc2NyaXB0b3JzL2JpZ2ludFR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxRQUFRO0lBQ2QsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7SUFDN0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDNUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzFELE9BQU8sSUFBSSxLQUFLLENBQ2QsMkdBQTJHLENBQzVHLENBQUM7U0FDSDtRQUNELElBQUksR0FBUSxDQUFDO1FBQ2IsSUFBSTtZQUNGLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FDYiw0Q0FBNEMsS0FBSyx5REFBeUQsQ0FDM0csQ0FBQztTQUNIO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsVUFBVSxDQUFDIn0=