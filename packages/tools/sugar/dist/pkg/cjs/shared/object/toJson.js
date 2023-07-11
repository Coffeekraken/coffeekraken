"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMap_js_1 = __importDefault(require("./deepMap.js"));
const set_js_1 = __importDefault(require("./set.js"));
/**
 * @name                toJson
 * @namespace            shared.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Convert class instances to plain JSON object
 *
 * @param       {Any}           object      The object to convert
 * @return      {Any}                       The converted object
 *
 * @snippet         __toJson($1)
 *
 * @example         js
 * import { __toJson } from '@coffeekraken/sugar/object';
 * class MyClass {
 *      hello = 'world';
 *      something() {}
 * }
 * __toJson(new MyClass()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __toJson(object) {
    const newObj = {};
    (0, deepMap_js_1.default)(object, ({ value, path }) => {
        (0, set_js_1.default)(newObj, path, value);
        return value;
    }, {
        privateProps: false,
        classInstances: true,
    });
    return newObj;
}
exports.default = __toJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLHNEQUE2QjtBQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQXdCLFFBQVEsQ0FBQyxNQUFXO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFBLG9CQUFTLEVBQ0wsTUFBTSxFQUNOLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNoQixJQUFBLGdCQUFLLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLEVBQ0Q7UUFDSSxZQUFZLEVBQUUsS0FBSztRQUNuQixjQUFjLEVBQUUsSUFBSTtLQUN2QixDQUNKLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBZEQsMkJBY0MifQ==