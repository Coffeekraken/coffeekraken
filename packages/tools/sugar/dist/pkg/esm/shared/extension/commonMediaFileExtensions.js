import __commonAudioFileExtensions from './commonAudioFileExtensions.js';
import __commonImageFileExtensions from './commonImageFileExtensions.js';
import __commonVideoFileExtensions from './commonVideoFileExtensions.js';
import __unique from '../array/unique.js';
/**
 * @name            commonMediaFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common media file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonMediaFileExtensions()
 *
 * @example         js
 * import { __commonMediaFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return __unique([
        ...__commonImageFileExtensions(finalSettings),
        ...__commonVideoFileExtensions(finalSettings),
        ...__commonAudioFileExtensions(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sMkJBQTJCLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTywyQkFBMkIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLDJCQUEyQixNQUFNLGdDQUFnQyxDQUFDO0FBRXpFLE9BQU8sUUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLDJCQUEyQixDQUMvQyxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFDRixPQUFPLFFBQVEsQ0FBQztRQUNaLEdBQUcsMkJBQTJCLENBQUMsYUFBYSxDQUFDO1FBQzdDLEdBQUcsMkJBQTJCLENBQUMsYUFBYSxDQUFDO1FBQzdDLEdBQUcsMkJBQTJCLENBQUMsYUFBYSxDQUFDO0tBQ2hELENBQUM7U0FDRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQyJ9