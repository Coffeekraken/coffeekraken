// shared
/**
 * @name              integerTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "integer" with some utilities methods like "is", "cast", etc...
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
    name: 'Integer',
    id: 'integer',
    is: (value) => Number.isInteger(value),
    cast: (value) => {
        if (typeof value !== 'string' && typeof value !== 'number') {
            return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`);
        }
        // @ts-ignore
        const res = parseInt(value);
        if (isNaN(res))
            return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
        return res;
    }
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdlclR5cGVEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9kZXNjcmlwdG9ycy9pbnRlZ2VyVHlwZURlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUztBQUlUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLFVBQVUsR0FBcUI7SUFDbkMsSUFBSSxFQUFFLFNBQVM7SUFDZixFQUFFLEVBQUUsU0FBUztJQUNiLEVBQUUsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDM0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzFELE9BQU8sSUFBSSxLQUFLLENBQ2QsaUZBQWlGLEtBQUssRUFBRSxDQUN6RixDQUFDO1NBQ0g7UUFDRCxhQUFhO1FBQ2IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNaLE9BQU8sSUFBSSxLQUFLLENBQ2Qsd0NBQXdDLEtBQUsseURBQXlELENBQ3ZHLENBQUM7UUFDSixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Q0FDRixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==