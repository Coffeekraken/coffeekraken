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
 * @snippet         __toJson($1)
 *
 * @example         js
 * import { __toJson } from '@coffeekraken/sugar/object';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * __toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __toJson(object) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixTQUFTLENBQ0wsTUFBTSxFQUNOLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNoQixLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLEVBQ0Q7UUFDSSxZQUFZLEVBQUUsS0FBSztRQUNuQixjQUFjLEVBQUUsSUFBSTtLQUN2QixDQUNKLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDIn0=