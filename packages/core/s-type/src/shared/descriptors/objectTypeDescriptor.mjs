// shared
import __isObject from '@coffeekraken/sugar/shared/is/object';
/**
 * @name              objectTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "object" with some utilities methods like "is", "cast", etc...
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
    name: 'Object',
    id: 'object',
    is: (value) => __isObject(value),
    cast: (value) => {
        if (__isObject(value))
            return value;
        return {
            value
        };
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0VHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtdHlwZS9zcmMvc2hhcmVkL2Rlc2NyaXB0b3JzL29iamVjdFR5cGVEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFFVCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUs5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ25DLElBQUksRUFBRSxRQUFRO0lBQ2QsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDckMsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDcEMsT0FBTztZQUNMLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLFVBQVUsQ0FBQyJ9