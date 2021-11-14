// @ts-nocheck
import __set from './set';
/**
 * @name          deepize
 * @namespace            js.object
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @param       {Object}        object        The object to convert
 * @return      {Object}                      The converted object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNO0lBQ25CLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN0QixLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN4QztJQUNELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxlQUFlO0FBQ2YsY0FBYztBQUNkLGdDQUFnQztBQUNoQyw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCLDBDQUEwQztBQUMxQyxPQUFPO0FBQ1AsS0FBSztBQUVMLGVBQWUsT0FBTyxDQUFDIn0=