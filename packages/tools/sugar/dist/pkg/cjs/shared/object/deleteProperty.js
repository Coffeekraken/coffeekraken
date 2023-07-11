"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const set_js_1 = __importDefault(require("./set.js"));
/**
 * @name                      deleteProperty
 * @namespace            shared.object
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __deleteProperty($1, $2)
 *
 * @example         js
 * import { __deleteProperty } from '@coffeekraken/sugar/object';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * __deleteProperty(myObject, 'plop');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __deleteProperty(object, dotPath) {
    const parentDotPath = dotPath.split('.').slice(0, -1).join('.');
    if (!dotPath || dotPath === '' || dotPath === '.')
        return object;
    dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
    dotPath = dotPath.replace(/^\./, '');
    const a = dotPath.split('.');
    let o = object;
    while (a.length) {
        const n = a.shift();
        if (a.length < 1) {
            if (Array.isArray(o)) {
                const valueToDelete = o[n];
                o = o.filter((v) => {
                    return v !== valueToDelete;
                });
            }
            else {
                delete o[n];
            }
            (0, set_js_1.default)(object, parentDotPath, o);
        }
        else {
            o = o[n];
        }
    }
    return object;
}
exports.default = __deleteProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNEQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsT0FBTztJQUNwRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEUsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLE9BQU8sS0FBSyxHQUFHO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDakUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNmLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtRQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLEtBQUssYUFBYSxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7WUFDRCxJQUFBLGdCQUFLLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNaO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBekJELG1DQXlCQyJ9