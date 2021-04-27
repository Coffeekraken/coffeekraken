// @ts-nocheck
import __isGlob from 'is-glob';
/**
 * @name                                      isGlob
 * @namespace            js.is
 * @type                                      Function
 * @stable
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
 * import isGlob from '@coffeekraken/sugar/js/is/js';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (string) => {
    return __isGlob(string);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvaXMvZ2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sU0FBUyxDQUFDO0FBRS9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsZUFBZSxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3hCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQyJ9