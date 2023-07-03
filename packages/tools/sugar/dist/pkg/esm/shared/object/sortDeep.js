// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';
import __sort from './sort';
/**
 * @name                                sortDeep
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __sortDeep($1, $2)
 * __sortDeep($1, (a, b) => {
 *      $2
 * })
 *
 * @example               js
 * import { __sortDeep } from '@coffeekraken/sugar/object';
 * __sortDeep({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __sortDeep(object, sort) {
    // sort passed object
    const sortedObject = __sort(object, sort);
    // go deep to sort lower levels
    for (let [key, value] of Object.entries(sortedObject)) {
        if (__isPlainObject(value)) {
            sortedObject[key] = __sortDeep(sortedObject[key], sort);
        }
    }
    return sortedObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJO0lBQzNDLHFCQUFxQjtJQUNyQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLCtCQUErQjtJQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuRCxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzRDtLQUNKO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQyJ9