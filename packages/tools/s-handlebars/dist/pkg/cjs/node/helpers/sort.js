"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const sort_1 = __importDefault(require("@coffeekraken/sugar/shared/object/sort"));
/**
 * @name            sort
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to sort either an array directly, of an object that will be sorted by his keys
 *
 * @param       {Any|Array}        value            The value to sort
 * @return      {Number}                           The sorted value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function sort(value) {
    if (Array.isArray(value)) {
        return value.sort((a, b) => a.localeCompare(b));
    }
    if ((0, plainObject_1.default)(value)) {
        return (0, sort_1.default)(value, (a, b) => a.key.localeCompare(b.key));
    }
    return value;
}
exports.default = sort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXdFO0FBQ3hFLGtGQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUF3QixJQUFJLENBQUMsS0FBVTtJQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsSUFBSSxJQUFBLHFCQUFlLEVBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxJQUFBLGNBQVksRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNwRTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFSRCx1QkFRQyJ9