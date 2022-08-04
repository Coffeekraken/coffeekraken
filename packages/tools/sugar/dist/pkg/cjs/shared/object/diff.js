"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_equal_1 = __importDefault(require("is-equal"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
/**
 * @name                      diff
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function diff(object1, object2, settings = {}) {
    settings = Object.assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
    const finalObj = {};
    const keys = Array.from(new Set([...Object.keys(object1), ...Object.keys(object2)]));
    for (let i = 0; i < keys.length; i++) {
        const _prop = keys[i];
        if (settings.deep) {
            if ((0, plainObject_1.default)(object1[_prop]) &&
                (0, plainObject_1.default)(object2[_prop])) {
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
            if ((0, is_equal_1.default)(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
        if (settings.emptyObject) {
            if ((0, plainObject_1.default)(object1[_prop]) &&
                Object.keys(object1[_prop]).length === 0) {
                finalObj[_prop] = {};
                continue;
            }
        }
        if (settings.updated) {
            if (object1[_prop] === undefined || object2[_prop] === undefined) {
                continue;
            }
            if (!(0, is_equal_1.default)(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
    }
    return finalObj;
}
exports.default = diff;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFpQztBQUNqQyxvRUFBZ0Q7QUFFaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFDSCxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3pDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsSUFBSSxFQUNYLE9BQU8sRUFBRSxLQUFLLEVBQ2QsTUFBTSxFQUFFLEtBQUssRUFDYixXQUFXLEVBQUUsS0FBSyxFQUNsQixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDZCxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBRXBCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ25CLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQzlELENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ2YsSUFDSSxJQUFBLHFCQUFlLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixJQUFBLHFCQUFlLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ2pDO2dCQUNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ2QsUUFBUSxDQUNYLENBQUM7Z0JBQ0YsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO29CQUN6QyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsU0FBUzthQUNaO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzlELFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLFNBQVM7YUFDWjtTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUM5RCx5QkFBeUI7Z0JBQ3pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pDLFNBQVM7YUFDWjtTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksSUFBQSxrQkFBUyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDM0MsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsU0FBUzthQUNaO1NBQ0o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFDSSxJQUFBLHFCQUFlLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQzFDO2dCQUNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3JCLFNBQVM7YUFDWjtTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUM5RCxTQUFTO2FBQ1o7WUFDRCxJQUFJLENBQUMsSUFBQSxrQkFBUyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDNUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsU0FBUzthQUNaO1NBQ0o7S0FDSjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxrQkFBZSxJQUFJLENBQUMifQ==