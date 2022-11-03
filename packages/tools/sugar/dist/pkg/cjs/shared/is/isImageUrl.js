"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = require("@coffeekraken/sugar/extension");
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
 * @example               js
 * import { __isImageUrl } from '@coffeekraken/sugar/is';
 * __isImageUrl('something.jpg); // => true
 * __isImageUrl('other.pdf); // => false
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1(string) {
    const imagesExtensions = (0, extension_1.__commonImageFileExtensions)(), passedUrlExtension = string.split('.').slice(-1)[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTRFO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxtQkFBeUIsTUFBTTtJQUMzQixNQUFNLGdCQUFnQixHQUFHLElBQUEsdUNBQTJCLEdBQUUsRUFDbEQsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RCxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkMsaURBQWlEO1FBQ2pELCtCQUErQjtRQUMvQixPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsd0VBQXdFO0lBQ3hFLE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDekQsQ0FBQztBQWJELDRCQWFDIn0=