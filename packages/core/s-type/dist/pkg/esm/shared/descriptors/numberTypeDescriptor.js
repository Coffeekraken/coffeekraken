// shared
/**
 * @name              numberTypeDescriptor
 * @namespace         sugar.js.type.descriptor
 * @type              ISTypeDescriptor
 *
 * Describe the type "number" with some utilities methods like "is", "cast", etc...
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
    name: 'Number',
    id: 'number',
    is: (value) => typeof value === 'number',
    cast: (value) => {
        if (typeof value !== 'string') {
            console.log('vv', value, typeof value);
            return new Error(`Sorry but only strings can be casted to numbers...`);
        }
        const res = parseFloat(value);
        if (isNaN(res))
            return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
        return res;
    },
};
export default descriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVM7QUFNVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLElBQUksRUFBRSxRQUFRO0lBQ2QsRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7SUFDN0MsSUFBSSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sS0FBSyxDQUFDLENBQUM7WUFFdkMsT0FBTyxJQUFJLEtBQUssQ0FDWixvREFBb0QsQ0FDdkQsQ0FBQztTQUNMO1FBQ0QsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNWLE9BQU8sSUFBSSxLQUFLLENBQ1osd0NBQXdDLEtBQUssd0RBQXdELENBQ3hHLENBQUM7UUFDTixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxVQUFVLENBQUMifQ==