// @ts-nocheck
import __isEqual from 'is-equal';
import __isPlainObject from '../is/isPlainObject.js';
/**
 * @name                      diff
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function take two objects and return an object that contains only what has been changed between the two.
 * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
 *
 * @param         {Object}          object1            The first object used for the diff process
 * @param         {Object}          object2            The second object used for the diff process
 * @param         {Object}          [settings={}]      An object of settings to configure the diff process:
 * - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
 * - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
 * - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
 * - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
 * - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
 * - updated (true) {Boolean}: Specify if you want to include the updated values
 * @return        {Object}                             The object that contains only the differences between the two
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __diff($1, $2)
 *
 * @example         js
 * import { __diff } from '@coffeekraken/sugar/object';
 * const myObject1 = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * __diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 *
 * @see       https://www.npmjs.com/package/is-equal
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __diff(object1, object2, settings = {}) {
    settings = Object.assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
    const finalObj = {};
    const keys = Array.from(new Set([...Object.keys(object1), ...Object.keys(object2)]));
    for (let i = 0; i < keys.length; i++) {
        const _prop = keys[i];
        if (settings.deep) {
            if (__isPlainObject(object1[_prop]) &&
                __isPlainObject(object2[_prop])) {
                finalObj[_prop] = __diff(object1[_prop], object2[_prop], settings);
                if (Object.keys(finalObj[_prop]).length === 0)
                    delete finalObj[_prop];
                continue;
            }
        }
        if (settings.added) {
            if (object1[_prop] === undefined && object2[_prop] !== undefined) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
        if (settings.deleted) {
            if (object1[_prop] !== undefined && object2[_prop] === undefined) {
                // delete object1[_prop];
                finalObj[_prop] = object1[_prop];
                continue;
            }
        }
        if (settings.equals) {
            if (__isEqual(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
        if (settings.emptyObject) {
            if (__isPlainObject(object1[_prop]) &&
                Object.keys(object1[_prop]).length === 0) {
                finalObj[_prop] = {};
                continue;
            }
        }
        if (settings.updated) {
            if (object1[_prop] === undefined || object2[_prop] === undefined) {
                continue;
            }
            if (!__isEqual(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
    }
    return finalObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFDakMsT0FBTyxlQUFlLE1BQU0sd0JBQXdCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDMUQsUUFBUSxtQkFDSixJQUFJLEVBQUUsSUFBSSxFQUNWLEtBQUssRUFBRSxJQUFJLEVBQ1gsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsS0FBSyxFQUNiLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNkLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDbkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDOUQsQ0FBQztJQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QixJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDZixJQUNJLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDakM7Z0JBQ0UsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZCxRQUFRLENBQ1gsQ0FBQztnQkFDRixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQ3pDLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixTQUFTO2FBQ1o7U0FDSjtRQUVELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNoQixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDOUQsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsU0FBUzthQUNaO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlELHlCQUF5QjtnQkFDekIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsU0FBUzthQUNaO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxTQUFTO2FBQ1o7U0FDSjtRQUVELElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUN0QixJQUNJLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDMUM7Z0JBQ0UsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckIsU0FBUzthQUNaO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlELFNBQVM7YUFDWjtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUM1QyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxTQUFTO2FBQ1o7U0FDSjtLQUNKO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyJ9