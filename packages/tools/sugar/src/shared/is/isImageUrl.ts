import __commonImageFileExtensions from '../extension/commonImageFileExtensions.js';

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
export default function (string) {
    const imagesExtensions = __commonImageFileExtensions(),
        passedUrlExtension = string.split('.').slice(-1)[0];

    const pathParts = passedUrlExtension.split('/');
    if (!pathParts.slice(-1)[0].includes('.')) {
        // we cannot tell cause no extension in the path.
        // in this case, we return true
        return true;
    }

    // return if the passed extension exists in the common imagex extensions
    return imagesExtensions.includes(passedUrlExtension);
}
