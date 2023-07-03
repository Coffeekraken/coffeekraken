// @ts-nocheck
/**
 * @name                                sort
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLE1BQVcsRUFBRSxJQUFlO0lBQ3ZELHNCQUFzQjtJQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNaO1FBRUQsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUMsQ0FBQyxDQUFDO0lBRUgsK0JBQStCO0lBQy9CLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQiwyQkFBMkI7SUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JCLDZDQUE2QztRQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsa0NBQWtDO0lBQ2xDLE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUMifQ==