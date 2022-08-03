// @ts-nocheck

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

export default function cyclic(obj) {
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
            return ['CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj, obj].join(
                '\n',
            );
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
