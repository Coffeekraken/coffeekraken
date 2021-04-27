// @ts-nocheck
import __md5 from '../crypt/md5';
/**
 * @name            gravatarUrl
 * @namespace            js.url
 * @type            Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhdmF0YXJVcmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL3VybC9ncmF2YXRhclVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxLQUFLLE1BQU0sY0FBYyxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRztJQUNwQyxPQUFPLG1DQUFtQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQzdFLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9