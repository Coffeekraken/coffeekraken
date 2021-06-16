import __copy from 'clipboard-copy';
/**
 * @name                copy
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed text
 *
 * @param       {String}            text            The text to copy
 * @return      {Promise}                          A promise fullfilled when the copy has been made correctly
 *
 * @todo        doc
 * @todo        tests
 *
 * @example         js
 * import __copy from '@coffeekraken/sugar/js/clipboard/copy';
 * __copy('Hello world');
 *
 * @see             https://www.npmjs.com/package/clipboard-copy
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function copy(text) {
    return __copy(text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxJQUFJLENBQUMsSUFBWTtJQUNyQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDIn0=