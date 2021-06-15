import __copy from 'clipboard-copy';
/**
 * @name                copy
 * @namespace           js.clipboard
 * @type                Function
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQyxJQUFZO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLENBQUMifQ==