"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            commonProgrammingFileExtensions
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
 * import { __commonProgrammingFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonProgrammingFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __commonProgrammingFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return [
        'asp',
        'c',
        'cgi',
        'cfm',
        'pl',
        'class',
        'cpp',
        'cs',
        'h',
        'java',
        'php',
        'py',
        'sh',
        'swift',
        'vb',
        'js',
        'jsp',
        'jsx',
        'css',
        'ts',
        'tsx',
        'rs',
        'dart',
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonProgrammingFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxTQUF3QixpQ0FBaUMsQ0FDckQsV0FBbUQsRUFBRTtJQUVyRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLEtBQUssRUFDVixPQUFPLEVBQUUsRUFBRSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsT0FBTztRQUNILEtBQUs7UUFDTCxHQUFHO1FBQ0gsS0FBSztRQUNMLEtBQUs7UUFDTCxJQUFJO1FBQ0osT0FBTztRQUNQLEtBQUs7UUFDTCxJQUFJO1FBQ0osR0FBRztRQUNILE1BQU07UUFDTixLQUFLO1FBQ0wsSUFBSTtRQUNKLElBQUk7UUFDSixPQUFPO1FBQ1AsSUFBSTtRQUNKLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxJQUFJO1FBQ0osS0FBSztRQUNMLElBQUk7UUFDSixNQUFNO0tBQ1Q7U0FDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQW5DRCxvREFtQ0MifQ==