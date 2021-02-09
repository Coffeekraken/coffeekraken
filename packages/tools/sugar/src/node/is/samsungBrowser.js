"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isSamsumgBrowser
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSamsumgBrowser(ua = navigator.userAgent) {
    return ua.match(/SamsungBrowser/i) !== null;
}
exports.default = isSamsumgBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Ftc3VuZ0Jyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYW1zdW5nQnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUztJQUNoRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDOUMsQ0FBQztBQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=