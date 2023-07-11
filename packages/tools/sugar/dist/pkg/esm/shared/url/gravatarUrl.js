// @ts-nocheck
import __md5 from '../crypto/md5.js';
/**
 * @name            gravatarUrl
 * @namespace            shared.url
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move into "gravatar" folder
 *
 * @snippet         __gravatarUrl($1)
 *
 * @example       js
 * import { __gravatarUrl } from '@coffeekraken/sugar/url';
 * __gravatarUrl('olivier.bossel@gmail.com'); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __gravatarUrl(email, size = 200) {
    return `https://www.gravatar.com/avatar/${__md5.encrypt(email)}?s=${size}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxHQUFHO0lBQ25ELE9BQU8sbUNBQW1DLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDL0UsQ0FBQyJ9