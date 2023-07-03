"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlCompliant_1 = __importDefault(require("../string/urlCompliant"));
/**
 * @name            isUrlCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string is url compliant.
 * This mean that it has no spaces, and no special characters
 *
 * @param       {String}        string         The string to process
 * @return      {Boolean}                       true if compliant, false if not
 *
 * @snippet         __isUrlCompliant($1)
 *
 * @example         php
 * import { __isUrlCompliant } from '@coffeekraken/sugar/string';
 * __isUrlCompliant('Hello world'); // false
 * __isUrlCompliant('/something/cool'); // true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isUrlCompliant(str) {
    return str === (0, urlCompliant_1.default)(str);
}
exports.default = __isUrlCompliant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQW9EO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGdCQUFnQixDQUFDLEdBQVc7SUFDaEQsT0FBTyxHQUFHLEtBQUssSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFGRCxtQ0FFQyJ9