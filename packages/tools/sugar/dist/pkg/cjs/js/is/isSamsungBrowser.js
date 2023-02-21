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
 * import { __isSamsumgBrowser } from '@coffeekraken/sugar/is'
 * if (__isSamsumgBrowser()) {
 *   // do something
 * }
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isSamsumgBrowser(ua = navigator.userAgent) {
    return ua.match(/SamsungBrowser/i) !== null;
}
exports.default = __isSamsumgBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixrQkFBa0IsQ0FDdEMsS0FBYSxTQUFTLENBQUMsU0FBUztJQUVoQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDaEQsQ0FBQztBQUpELHFDQUlDIn0=