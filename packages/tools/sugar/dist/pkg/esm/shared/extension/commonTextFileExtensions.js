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
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import { __commonTextFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonTextFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonTextFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return [
        'txt',
        'htm',
        'html',
        'md',
        'json',
        'csv',
        'rss',
        'xhtml',
        ...__commonProgrammingFileExtensions(finalSettings),
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8saUNBQWlDLE1BQU0sbUNBQW1DLENBQUM7QUFFbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxVQUFVLDBCQUEwQixDQUM5QyxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixPQUFPO1FBQ0gsS0FBSztRQUNMLEtBQUs7UUFDTCxNQUFNO1FBQ04sSUFBSTtRQUNKLE1BQU07UUFDTixLQUFLO1FBQ0wsS0FBSztRQUNMLE9BQU87UUFDUCxHQUFHLGlDQUFpQyxDQUFDLGFBQWEsQ0FBQztLQUN0RDtTQUNJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDIn0=