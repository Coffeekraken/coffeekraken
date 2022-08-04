"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                cyclic
 * @namespace            shared.is
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function check if the passed object has circular dependencies and if so, returns where it has been found in the object
 *
 * @param           {Object}            object              The object to check
 * @return          {String|false}                              false if all is ok, a string that tells where the circular dep has been found if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import __isCyclic from '@coffeekraken/sugar/shared/is/cyclic';
 * const obj = { hello: 'world' };
 * obj.cyclic = obj;
 * __isCyclic(obj);
 *
 * @see            https://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function cyclic(obj) {
    var keys = [];
    var stack = [];
    var stackSet = new Set();
    var detected = false;
    function detect(obj, key) {
        if (obj && typeof obj != 'object') {
            return;
        }
        if (stackSet.has(obj)) {
            // it's cyclic! Print the object and its locations.
            var oldindex = stack.indexOf(obj);
            var l1 = keys.join('.') + '.' + key;
            var l2 = keys.slice(0, oldindex + 1).join('.');
            detected = true;
            return ['CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj, obj].join('\n');
        }
        keys.push(key);
        stack.push(obj);
        stackSet.add(obj);
        for (var k in obj) {
            //dive on the object's children
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
                detect(obj[k], k);
            }
        }
        keys.pop();
        stack.pop();
        stackSet.delete(obj);
        return;
    }
    detect(obj, 'obj');
    return detected;
}
exports.default = cyclic;
// export default function cyclic(obj) {
//     var seenObjects = [];
//     function detect(obj) {
//         if (obj && typeof obj === 'object') {
//             if (seenObjects.indexOf(obj) !== -1) {
//                 return true;
//             }
//             seenObjects.push(obj);
//             for (var key in obj) {
//                 if (obj.hasOwnProperty(key) && detect(obj[key])) {
//                     return [
//                         JSON.stringify(obj, null, 4),
//                         'cycle at ' + key,
//                     ].join('\n\n');
//                 }
//             }
//         }
//         return false;
//     }
//     return detect(obj);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILFNBQXdCLE1BQU0sQ0FBQyxHQUFHO0lBQzlCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDekIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBRXJCLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQ3BCLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUMvQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkIsbURBQW1EO1lBQ25ELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3BDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFL0MsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixPQUFPLENBQUMsWUFBWSxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUMzRCxJQUFJLENBQ1AsQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNmLCtCQUErQjtZQUMvQixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDSjtRQUVELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNaLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsT0FBTztJQUNYLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25CLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUF6Q0QseUJBeUNDO0FBRUQsd0NBQXdDO0FBQ3hDLDRCQUE0QjtBQUU1Qiw2QkFBNkI7QUFDN0IsZ0RBQWdEO0FBQ2hELHFEQUFxRDtBQUNyRCwrQkFBK0I7QUFDL0IsZ0JBQWdCO0FBQ2hCLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMscUVBQXFFO0FBQ3JFLCtCQUErQjtBQUMvQix3REFBd0Q7QUFDeEQsNkNBQTZDO0FBQzdDLHNDQUFzQztBQUN0QyxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWix3QkFBd0I7QUFDeEIsUUFBUTtBQUVSLDBCQUEwQjtBQUMxQixJQUFJIn0=