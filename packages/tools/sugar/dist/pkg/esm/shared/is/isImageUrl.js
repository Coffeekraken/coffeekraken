import { __commonImageFileExtensions } from '@coffeekraken/sugar/extension';
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
export default function (string) {
    const imagesExtensions = __commonImageFileExtensions(), passedUrlExtension = string.split('.').slice(-1)[0];
    const pathParts = passedUrlExtension.split('/');
    if (!pathParts.slice(-1)[0].includes('.')) {
        // we cannot tell cause no extension in the path.
        // in this case, we return true
        return true;
    }
    // return if the passed extension exists in the common imagex extensions
    return imagesExtensions.includes(passedUrlExtension);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLE1BQU07SUFDM0IsTUFBTSxnQkFBZ0IsR0FBRywyQkFBMkIsRUFBRSxFQUNsRCxrQkFBa0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhELE1BQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN2QyxpREFBaUQ7UUFDakQsK0JBQStCO1FBQy9CLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx3RUFBd0U7SUFDeEUsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN6RCxDQUFDIn0=