// @ts-nocheck
import __md5 from '../crypt/md5';
/**
 * @name            gravatarUrl
 * @namespace            js.url
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
 * @example       js
 * import gravatarUrl from '@coffeekraken/sugar/js/util/gravatarUrl';
 * console.log(gravatarUrl('olivier.bossel@gmail.com')); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function gravatarUrl(email, size = 200) {
    return `https://www.gravatar.com/avatar/${__md5.encrypt(email)}?s=${size}`;
}
export default gravatarUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXJVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmF2YXRhclVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxHQUFHO0lBQ2xDLE9BQU8sbUNBQW1DLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDL0UsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=