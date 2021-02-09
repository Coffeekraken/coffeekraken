"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
/**
 * @name                        ensureExists
 * @namespace           sugar.js.object
 * @type                        Function
 * @stable
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
 * const myObj = { hello: 'world' }«
 * ensureExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.default = (obj, path, value = {}) => {
    const v = get_1.default(obj, path);
    if (v === undefined) {
        set_1.default(obj, path, value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLGFBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ25CLGFBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFDIn0=