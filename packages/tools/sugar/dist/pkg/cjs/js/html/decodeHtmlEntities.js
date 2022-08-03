"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        decodeHtmlEntities
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Decode an htmlentities encoded string
 *
 * @param 			{String} 			string 			The string to decode
 * @return 			{String} 							The decoded string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import decodeHtmlEntities from '@coffeekraken/sugar/js/string/decodeHtmlEntities';
 * decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;');
 * // return => olivier.bossel@gmail.com
 *
 * @since           1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function decodeHtmlEntities(string) {
    const txt = document.createElement('textarea');
    txt.innerHTML = string;
    return txt.value;
}
exports.default = decodeHtmlEntities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsa0JBQWtCLENBQUMsTUFBYztJQUN0QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDO0FBQ0Qsa0JBQWUsa0JBQWtCLENBQUMifQ==