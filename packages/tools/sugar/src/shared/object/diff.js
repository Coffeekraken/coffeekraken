// @ts-nocheck
import __isPlainObject from '../is/plainObject';
import __isEqual from 'is-equal';
/**
 * @name                      diff
 * @namespace            js.object
 * @type                      Function
 * @status              beta
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
 * @example         js
 * import diff from '@coffeekraken/sugar/js/object/diff';
 * const myObject1 = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 *
 * @see       https://www.npmjs.com/package/is-equal
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function diff(object1, object2, settings = {}) {
    settings = Object.assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
    const finalObj = {};
    const keys = Array.from(new Set([...Object.keys(object1), ...Object.keys(object2)]));
    for (let i = 0; i < keys.length; i++) {
        const _prop = keys[i];
        if (settings.deep) {
            if (__isPlainObject(object1[_prop]) && __isPlainObject(object2[_prop])) {
                finalObj[_prop] = diff(object1[_prop], object2[_prop], settings);
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
export default diff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sU0FBUyxNQUFNLFVBQVUsQ0FBQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzNDLFFBQVEsbUJBQ04sSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsSUFBSSxFQUNYLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLEtBQUssRUFDYixXQUFXLEVBQUUsS0FBSyxFQUNsQixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDWixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3JCLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQzVELENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2pCLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RFLFNBQVM7YUFDVjtTQUNGO1FBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUNoRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxTQUFTO2FBQ1Y7U0FDRjtRQUVELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDaEUseUJBQXlCO2dCQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxTQUFTO2FBQ1Y7U0FDRjtRQUVELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLFNBQVM7YUFDVjtTQUNGO1FBRUQsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hCLElBQ0UsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUN4QztnQkFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixTQUFTO2FBQ1Y7U0FDRjtRQUVELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDaEUsU0FBUzthQUNWO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLFNBQVM7YUFDVjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==