// @ts-nocheck
// @shared
import __set from './set';
/**
 * @name                      delete
 * @namespace           sugar.js.object
 * @type                      Function
 * @stable
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/js/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function del(object, dotPath) {
    const parentDotPath = dotPath.split('.').slice(0, -1).join('.');
    if (!dotPath || dotPath === '' || dotPath === '.')
        return object;
    dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
    dotPath = dotPath.replace(/^\./, '');
    const a = dotPath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const valueToDelete = o[n];
                o = o.filter((v) => {
                    return v !== valueToDelete;
                });
            }
            else {
                delete o[n];
            }
            __set(object, parentDotPath, o);
        }
        else {
            o = o[n];
        }
    }
    return object;
}
export default del;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU87SUFDMUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhFLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxPQUFPLEtBQUssR0FBRztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBQ2pFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDZixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDakIsT0FBTyxDQUFDLEtBQUssYUFBYSxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFDRCxLQUFLLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNWO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxHQUFHLENBQUMifQ==