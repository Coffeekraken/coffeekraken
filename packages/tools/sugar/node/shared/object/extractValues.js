"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            extractValues
 * @namespace       sugar.js.object
 * @type            Function
 * @stable
 *
 * This function take an array of objects and a key name as parameters and return an array containing
 * only the specified object key value.
 *
 * @param       {Array<Object>}         arrayOfObjects            An array of objects as source
 * @param       {String}                keyName                   The key name you want to extract of the objects
 * @return      {Array}                                           An array containing only the values of the property specified
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import extractValues from '@coffeekraken/sugar/js/object/extractValues';
 * extractValues([{
 *    hello: 'world',
 *    plop: 'Yes'
 * }, {
 *    hello: 'king',
 *    plop: 'something'
 * }], 'hello'); // => ['world', 'king']
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function extractValues(arrayOfObjects, keyName) {
    const finalArray = [];
    arrayOfObjects.forEach((object) => {
        if (object[keyName] === undefined)
            return;
        finalArray.push(object[keyName]);
    });
    return finalArray;
}
exports.default = extractValues;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdFZhbHVlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2V4dHJhY3RWYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOztBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsYUFBYSxDQUFDLGNBQWMsRUFBRSxPQUFPO0lBQzVDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU87UUFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxrQkFBZSxhQUFhLENBQUMifQ==