"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
/**
 * @name                        ensureExists
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
 * @example           js
 * import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
 * const myObj = { hello: 'world' }«
 * ensureExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
exports.default = (obj, path, value = {}) => {
    const v = (0, get_1.default)(obj, path);
    if (v === undefined) {
        (0, set_1.default)(obj, path, value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQixnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxJQUFBLGFBQUssRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQ2pCLElBQUEsYUFBSyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0I7QUFDTCxDQUFDLENBQUMifQ==