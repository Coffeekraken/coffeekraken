import __deepMap from './deepMap';
import __set from './set';
/**
 * @name                toJson
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert class instances to plain JSON object
 *
 * @param       {Any}           object      The object to convert
 * @return      {Any}                       The converted object
 *
 * @example         js
 * import toJson from '@coffeekraken/sugar/shared/object/toJson';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function toJson(object) {
    const newObj = {};
    __deepMap(object, ({ value, path }) => {
        __set(newObj, path, value);
        return value;
    }, {
        privateProps: false,
        classInstances: true,
    });
    return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Kc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9Kc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsTUFBVztJQUN0QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsU0FBUyxDQUNMLE1BQU0sRUFDTixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDaEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxFQUNEO1FBQ0ksWUFBWSxFQUFFLEtBQUs7UUFDbkIsY0FBYyxFQUFFLElBQUk7S0FDdkIsQ0FDSixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9