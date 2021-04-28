import __deepMap from './deepMap';
import __set from './set';
/**
 * @name                toJson
 * @namespace            shared.object
 * @type                Function
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function toJson(object) {
    const newObj = {};
    __deepMap(object, ({ value, path }) => {
        __set(newObj, path, value);
        return value;
    }, {
        privateProps: false,
        classInstances: true
    });
    return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Kc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9Kc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxNQUFNLENBQUMsTUFBVztJQUN4QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsU0FBUyxDQUNQLE1BQU0sRUFDTixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDbEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLEVBQ0Q7UUFDRSxZQUFZLEVBQUUsS0FBSztRQUNuQixjQUFjLEVBQUUsSUFBSTtLQUNyQixDQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIn0=