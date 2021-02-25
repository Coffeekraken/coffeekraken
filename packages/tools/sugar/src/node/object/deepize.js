// @ts-nocheck
// @shared
import __set from './set';
/**
 * @name          deepize
 * @namespace     sugar.js.object
 * @type          Function
 * @stable
 *
 * This function simply take an object like this one:
 * {
 *    'something.cool': 'hello'
 * }
 * and convert it to something like this:
 * {
 *    something: {
 *      cool: 'hello'
 *    }
 * }
 *
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepize from '@coffeekraken/sugar/js/object/deepize';
 * deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepize(object) {
    const finalObject = {};
    for (const key in object) {
        __set(finalObject, key, object[key]);
    }
    return finalObject;
}
// console.log(
//   deepize({
//     'someting.cool': 'hello',
//     'you.coco[0]': 'hello',
//     'coco[1]': 'world',
//     'world."coco.plop".yep': 'dsojiofj'
//   })
// );
export default deepize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU07SUFDckIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3hCLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELGVBQWU7QUFDZixjQUFjO0FBQ2QsZ0NBQWdDO0FBQ2hDLDhCQUE4QjtBQUM5QiwwQkFBMEI7QUFDMUIsMENBQTBDO0FBQzFDLE9BQU87QUFDUCxLQUFLO0FBRUwsZUFBZSxPQUFPLENBQUMifQ==