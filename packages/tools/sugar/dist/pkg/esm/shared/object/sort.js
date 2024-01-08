// @ts-nocheck
/**
 * @name                                sort
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it.
 * The "a" and "b" argument passed to your sort function will have these properties:
 * - key: The key of the object
 * - value: The actual value of the object property
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                [sort=null]                  The sort function to use. If not specified, will sort the items by key alphabetically
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __sort($1, $2)
 * __sort($1, (a, b) => {
 *      // a.key - a.value | b.key - b.value
 *      $2
 * })
 *
 * @example               js
 * import { __sort } from '@coffeekraken/sugar/object';
 * __sort({
 *    coco: { weight: 10 },
 *    lolo: { weight: 2 },
 *    plop: { weight: 5 }
 * }, (a, b) => {
 *   return a.value.weight - b.value.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __sort(object, sort) {
    // get the object keys
    const keys = Object.keys(object);
    // sort the keys
    const sortedKeys = keys.sort((a, b) => {
        if (!sort) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        // call the sort function passed as parameter
        return sort({ key: a, value: object[a] }, { key: b, value: object[b] });
    });
    // create the new sorted object
    const resultObj = {};
    // loop on each sorted keys
    sortedKeys.forEach((k) => {
        // add the property key with the object value
        resultObj[k] = object[k];
    });
    // return the result sorted object
    return resultObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLE1BQU0sQ0FBQyxNQUFXLEVBQUUsSUFBZTtJQUN2RCxzQkFBc0I7SUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxPQUFPLENBQUMsQ0FBQzthQUNaO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUVELDZDQUE2QztRQUM3QyxPQUFPLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQztJQUVILCtCQUErQjtJQUMvQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDckIsMkJBQTJCO0lBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNyQiw2Q0FBNkM7UUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILGtDQUFrQztJQUNsQyxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=