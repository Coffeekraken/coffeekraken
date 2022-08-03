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
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import sortObject from '@coffeekraken/sugar/js/object/sort';
 * sortObject({
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
function sort(object, sort) {
    // get the object keys
    const keys = Object.keys(object);
    // sort the keys
    const sortedKeys = keys.sort((a, b) => {
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
export default sort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSTtJQUN0QixzQkFBc0I7SUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxnQkFBZ0I7SUFDaEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyw2Q0FBNkM7UUFDN0MsT0FBTyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFFSCwrQkFBK0I7SUFDL0IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLDJCQUEyQjtJQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckIsNkNBQTZDO1FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxrQ0FBa0M7SUFDbEMsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=