import __commonProgrammingFileExtensions from './commonProgrammingFileExtensions';
/**
 * @name            commonTextFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import __commonTextFileExtensions from '@coffeekraken/sugar/shared/extension/commonTextFileExtensions';
 * const extensions = __commonTextFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonTextFileExtensions(withDot = false) {
    return ['txt', 'htm', 'html', 'md', 'json', 'csv', 'rss', 'xhtml', ...__commonProgrammingFileExtensions(withDot)].map(ext => withDot ? `.${ext}` : ext);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uVGV4dEZpbGVFeHRlbnNpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uVGV4dEZpbGVFeHRlbnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8saUNBQWlDLE1BQU0sbUNBQW1DLENBQUM7QUFFbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUFDLE9BQU8sR0FBRyxLQUFLO0lBQzVELE9BQU8sQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEdBQUcsaUNBQWlDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BKLENBQUMifQ==