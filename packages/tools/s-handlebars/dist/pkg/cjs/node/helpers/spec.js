"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
/**
 * @name            spec
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a json spec registered in the
 *
 * @param       {String}        dotPath            The spec dotpath to get
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function spec(dotPath) {
    const specs = new s_specs_1.default();
    const value = specs.read(dotPath);
    return value;
}
exports.default = spec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILFNBQXdCLElBQUksQ0FBQyxPQUFlO0lBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsRUFBRSxDQUFDO0lBQzdCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUpELHVCQUlDIn0=