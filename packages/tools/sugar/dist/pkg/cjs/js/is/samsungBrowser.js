"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isSamsumgBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return      {Boolean}                                       true if is a samsung browser, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isSamsumgBrowser from '@coffeekraken/sugar/js/is/samsungBrowser'
 * if (isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isSamsumgBrowser(ua = navigator.userAgent) {
    return ua.match(/SamsungBrowser/i) !== null;
}
exports.default = isSamsumgBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLEtBQWEsU0FBUyxDQUFDLFNBQVM7SUFDdEQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ2hELENBQUM7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9