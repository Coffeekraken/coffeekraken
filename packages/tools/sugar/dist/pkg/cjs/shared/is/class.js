"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_class_1 = __importDefault(require("is-class"));
/**
 * @name                      class
 * @namespace            shared.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import isClass = from '@coffeekraken/sugar/shared/is/class';
 * isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function cls(cls) {
    if (!Array.isArray(cls))
        cls = [cls];
    for (let i = 0; i < cls.length; i++) {
        if (!(0, is_class_1.default)(cls[i]))
            return false;
    }
    return true;
}
exports.default = cls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLEdBQUcsQ0FBQyxHQUFHO0lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLElBQUEsa0JBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUN4QztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxrQkFBZSxHQUFHLENBQUMifQ==