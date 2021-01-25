"use strict";
// @ts-nocheck
// @shared
/**
 * @name                                sort
 * @namespace           sugar.js.object
 * @type                                Function
 * @stable
 *
 * Sort an object properties the same way as the Array.sort do it
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
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
 *   return a.weight - b.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function sort(object, sort) {
    // get the object keys
    const keys = Object.keys(object);
    // sort the keys
    const sortedKeys = keys.sort((a, b) => {
        // call the sort function passed as parameter
        return sort(object[a], object[b]);
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
module.exports = sort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJO0lBQ3hCLHNCQUFzQjtJQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpDLGdCQUFnQjtJQUNoQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLDZDQUE2QztRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCwrQkFBK0I7SUFDL0IsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLDJCQUEyQjtJQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsNkNBQTZDO1FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxrQ0FBa0M7SUFDbEMsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUNELGlCQUFTLElBQUksQ0FBQyJ9