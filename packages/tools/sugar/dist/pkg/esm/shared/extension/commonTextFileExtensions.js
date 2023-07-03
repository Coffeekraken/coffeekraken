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
 * @snippet         __commonTextFileExtensions()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8saUNBQWlDLE1BQU0sbUNBQW1DLENBQUM7QUFFbEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFVBQVUsMEJBQTBCLENBQzlDLFdBQW1ELEVBQUU7SUFFckQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxLQUFLLEVBQ1YsT0FBTyxFQUFFLEVBQUUsSUFDUixRQUFRLENBQ2QsQ0FBQztJQUNGLE9BQU87UUFDSCxLQUFLO1FBQ0wsS0FBSztRQUNMLE1BQU07UUFDTixJQUFJO1FBQ0osTUFBTTtRQUNOLEtBQUs7UUFDTCxLQUFLO1FBQ0wsT0FBTztRQUNQLEdBQUcsaUNBQWlDLENBQUMsYUFBYSxDQUFDO0tBQ3REO1NBQ0ksTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMifQ==