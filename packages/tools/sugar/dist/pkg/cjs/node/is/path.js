"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPath_1 = __importDefault(require("../fs/isPath"));
/**
 * @name                            path
 * @namespace            node.is
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/is/path';
 * isPath('hello/world'); // => true
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function path(path, checkExistence = false) {
    return (0, isPath_1.default)(path, checkExistence);
}
exports.default = path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxHQUFHLEtBQUs7SUFDdEMsT0FBTyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFDRCxrQkFBZSxJQUFJLENBQUMifQ==