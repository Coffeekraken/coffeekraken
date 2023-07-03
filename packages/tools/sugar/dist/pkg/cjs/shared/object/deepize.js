"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const set_1 = __importDefault(require("./set"));
/**
 * @name          deepize
 * @namespace            shared.object
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
 * @snippet         __deepize($1)
 *
 * @example       js
 * import { __deepize } from '@coffeekraken/sugar/object';
 * __deepize ({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __deepize(object) {
    const finalObject = {};
    for (const key in object) {
        (0, set_1.default)(finalObject, key, object[key]);
    }
    return finalObject;
}
exports.default = __deepize;
// console.log(
//   deepize({
//     'someting.cool': 'hello',
//     'you.coco[0]': 'hello',
//     'coco[1]': 'world',
//     'world."coco.plop".yep': 'dsojiofj'
//   })
// );
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQXdCLFNBQVMsQ0FBQyxNQUFNO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN0QixJQUFBLGFBQUssRUFBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQU5ELDRCQU1DO0FBRUQsZUFBZTtBQUNmLGNBQWM7QUFDZCxnQ0FBZ0M7QUFDaEMsOEJBQThCO0FBQzlCLDBCQUEwQjtBQUMxQiwwQ0FBMEM7QUFDMUMsT0FBTztBQUNQLEtBQUsifQ==