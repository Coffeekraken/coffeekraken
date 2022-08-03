import __copy from 'clipboard-copy';
/**
 * @name                copy
 * @namespace           js.clipboard
 * @type                Function
 * @platform          js
 * @async
 * @status              stable
 *
 * This function allows you to copy to the clipboard the passed text
 *
 * @param       {String}            text            The text to copy
 * @return      {Promise}                          A promise fullfilled when the copy has been made correctly
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function copy(text) {
    return __copy(text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLGdCQUFnQixDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsSUFBSSxDQUFDLElBQVk7SUFDckMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsQ0FBQyJ9