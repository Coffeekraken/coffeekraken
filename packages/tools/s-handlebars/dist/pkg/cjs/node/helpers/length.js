"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
/**
 * @name            length
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get back either an array length, an object keys length or a string length
 *
 * @param       {Any}        value            The value to count
 * @return      {Number}                           The passed value length
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function length(value) {
    if (typeof value === 'string')
        return value.length;
    if (Array.isArray(value))
        return value.length;
    if ((0, plainObject_1.default)(value))
        return Object.keys(value).length;
    return 0;
}
exports.default = length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXdFO0FBRXhFOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLE1BQU0sQ0FBQyxLQUFVO0lBQ3JDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzlDLElBQUksSUFBQSxxQkFBZSxFQUFDLEtBQUssQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBTEQseUJBS0MifQ==