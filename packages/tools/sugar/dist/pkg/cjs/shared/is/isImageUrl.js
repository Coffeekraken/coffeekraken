"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonImageFileExtensions_js_1 = __importDefault(require("../extension/commonImageFileExtensions.js"));
/**
 * @name                                      isImageUrl
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed string path is an image url
 *
 * @param                 {String}        string             The string to check
 * @return              {Boolean}           true if is an image url/path, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isImageUrl($1)
 *
 * @example               js
 * import { __isImageUrl } from '@coffeekraken/sugar/is';
 * __isImageUrl('something.jpg); // => true
 * __isImageUrl('other.pdf); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1(string) {
    const imagesExtensions = (0, commonImageFileExtensions_js_1.default)(), passedUrlExtension = string.split('.').slice(-1)[0];
    const pathParts = passedUrlExtension.split('/');
    if (!pathParts.slice(-1)[0].includes('.')) {
        // we cannot tell cause no extension in the path.
        // in this case, we return true
        return true;
    }
    // return if the passed extension exists in the common imagex extensions
    return imagesExtensions.includes(passedUrlExtension);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkdBQW9GO0FBRXBGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILG1CQUF5QixNQUFNO0lBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxzQ0FBMkIsR0FBRSxFQUNsRCxrQkFBa0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhELE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN2QyxpREFBaUQ7UUFDakQsK0JBQStCO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx3RUFBd0U7SUFDeEUsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBYkQsNEJBYUMifQ==