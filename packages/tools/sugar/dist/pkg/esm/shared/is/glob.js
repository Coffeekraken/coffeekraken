// @ts-nocheck
import __isGlob from 'is-glob';
/**
 * @name                                      isGlob
 * @namespace            shared.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isGlob from '@coffeekraken/sugar/shared/is/js';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default (string) => {
    return __isGlob(string);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILGVBQWUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtJQUN0QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMifQ==