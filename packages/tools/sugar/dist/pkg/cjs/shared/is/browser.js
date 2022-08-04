"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isBrowser
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the script is running inside a browser or not
 *
 * @return   {Boolean}   true if it's in a browser, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isBrowser from '@coffeekraken/sugar/shared/is/browser'
 * if (isBrowser() {
 *   // do something
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isBrowser(value) {
    return typeof window !== 'undefined';
}
exports.default = isBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxLQUFLO0lBQ3BCLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDO0FBQ3pDLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==