"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
/**
 * @name                        ensurePropertyExists
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __ensurePropertyExists($1, $2)
 *
 * @example           js
 * import { __ensureProperyExists } from '@coffeekraken/sugar/object';
 * const myObj = { hello: 'world' }«
 * __ensureProperyExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __ensureProperyExists(obj, path, value = {}) {
    const v = (0, get_1.default)(obj, path);
    if (v === undefined) {
        (0, set_1.default)(obj, path, value);
    }
}
exports.default = __ensureProperyExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQixnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxTQUF3QixxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQy9ELE1BQU0sQ0FBQyxHQUFHLElBQUEsYUFBSyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDakIsSUFBQSxhQUFLLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzQjtBQUNMLENBQUM7QUFMRCx3Q0FLQyJ9