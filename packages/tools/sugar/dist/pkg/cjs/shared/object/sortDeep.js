"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
const sort_1 = __importDefault(require("./sort"));
/**
 * @name                                sortDeep
 * @namespace            shared.object
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Sort an object properties the same way as the Array.sort do it but will do it recusrively to sort the object deeply.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import sortObject from '@coffeekraken/sugar/js/object/sort';
 * sortObject({
 *    lolo: { weight: 2 },
 *    coco: { weight: 10 },
 *    plop: { weight: 5 },
 *    aha: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * }, (a, b) => {
 *    return a.key.localeCompare(b.key);
 * });
 * // {
 * //   aha: {
 * //      coco: 'plop',
 * //      hello: 'world'
 * //   }
 * //   coco: { weight: 10 }
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sortDeep(object, sort) {
    // sort passed object
    const sortedObject = (0, sort_1.default)(object, sort);
    // go deep to sort lower levels
    for (let [key, value] of Object.entries(sortedObject)) {
        if ((0, plainObject_1.default)(value)) {
            sortedObject[key] = sortDeep(sortedObject[key], sort);
        }
    }
    return sortedObject;
}
exports.default = sortDeep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUFnRDtBQUNoRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSTtJQUMxQixxQkFBcUI7SUFDckIsTUFBTSxZQUFZLEdBQUcsSUFBQSxjQUFNLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLCtCQUErQjtJQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuRCxJQUFJLElBQUEscUJBQWUsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RDtLQUNKO0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9