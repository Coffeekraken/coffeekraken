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
 * @snippet         __isCyclic($1)
 *
 * @example           js
 * import { __isCyclic } from '@coffeekraken/sugar/is';
 * const obj = { hello: 'world' };
 * obj.cyclic = obj;
 * __isCyclic(obj);
 *
 * @see            https://stackoverflow.com/questions/14962018/detecting-and-fixing-circular-references-in-javascript
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isCyclic(obj) {
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
exports.default = __isCyclic;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsU0FBd0IsVUFBVSxDQUFDLEdBQUc7SUFDbEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUN6QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFFckIsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUc7UUFDcEIsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO1lBQy9CLE9BQU87U0FDVjtRQUVELElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuQixtREFBbUQ7WUFDbkQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUvQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxZQUFZLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzNELElBQUksQ0FDUCxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2YsK0JBQStCO1lBQy9CLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNyQjtTQUNKO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1osUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixPQUFPO0lBQ1gsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkIsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQXpDRCw2QkF5Q0M7QUFFRCx3Q0FBd0M7QUFDeEMsNEJBQTRCO0FBRTVCLDZCQUE2QjtBQUM3QixnREFBZ0Q7QUFDaEQscURBQXFEO0FBQ3JELCtCQUErQjtBQUMvQixnQkFBZ0I7QUFDaEIscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxxRUFBcUU7QUFDckUsK0JBQStCO0FBQy9CLHdEQUF3RDtBQUN4RCw2Q0FBNkM7QUFDN0Msc0NBQXNDO0FBQ3RDLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsWUFBWTtBQUNaLHdCQUF3QjtBQUN4QixRQUFRO0FBRVIsMEJBQTBCO0FBQzFCLElBQUkifQ==