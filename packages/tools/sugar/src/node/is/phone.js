"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_detect_1 = __importDefault(require("mobile-detect"));
/**
 * @name        isPhone
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone(ua = navigator.userAgent) {
    const md = new mobile_detect_1.default(ua);
    return md.phone() !== null;
}
exports.default = isPhone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRUFBeUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsT0FBTyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUztJQUN2QyxNQUFNLEVBQUUsR0FBRyxJQUFJLHVCQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssSUFBSSxDQUFDO0FBQzdCLENBQUM7QUFDRCxrQkFBZSxPQUFPLENBQUMifQ==