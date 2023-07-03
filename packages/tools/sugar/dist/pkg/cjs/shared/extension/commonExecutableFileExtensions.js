"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            commonExecutableFileExtensions
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
 * @snippet         __commonExecutableFileExtensions()
 *
 * @example         js
 * import { __commonExecutableFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonExecutableFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __commonExecutableFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return [
        'apk',
        'bat',
        'bin',
        'cgi',
        'pi',
        'com',
        'exe',
        'gadget',
        'jsr',
        'msi',
        'py',
        'wsf',
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonExecutableFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQXdCLGdDQUFnQyxDQUNwRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixPQUFPO1FBQ0gsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO1FBQ0wsS0FBSztRQUNMLFFBQVE7UUFDUixLQUFLO1FBQ0wsS0FBSztRQUNMLElBQUk7UUFDSixLQUFLO0tBQ1I7U0FDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQXhCRCxtREF3QkMifQ==