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
 * @snippet         __commonProgrammingFileExtensions()
 *
 * @example         js
 * import { __commonProgrammingFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonProgrammingFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonProgrammingFileExtensions(settings = {}) {
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
        'twig',
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGlDQUFpQyxDQUNyRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixPQUFPO1FBQ0gsS0FBSztRQUNMLEdBQUc7UUFDSCxLQUFLO1FBQ0wsS0FBSztRQUNMLElBQUk7UUFDSixPQUFPO1FBQ1AsS0FBSztRQUNMLElBQUk7UUFDSixHQUFHO1FBQ0gsTUFBTTtRQUNOLEtBQUs7UUFDTCxJQUFJO1FBQ0osSUFBSTtRQUNKLE9BQU87UUFDUCxJQUFJO1FBQ0osSUFBSTtRQUNKLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO1FBQ0wsSUFBSTtRQUNKLE1BQU07UUFDTixNQUFNO0tBQ1Q7U0FDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQyJ9